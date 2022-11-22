import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import '../custom.css';
import {
  UpdateNote,
  GetEditNoteStatus,
  GetNote,
  checkURL,
  noteActions,
} from '../feature/NoteSlice';
import ModalShow from './ModalShow';
import { useNavigate } from "react-router-dom";

function Note() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  //get path thanh andress
  const pathname = window.location.pathname.split('/')[1];
  const origin = window.location.origin;

  //get Note in Store
  const [afterInput, setAfterInput] = useState('');
  const STORE = useSelector((state) => state.note);
  const NOTE = useSelector((state) => state.note.note);


  //#region read time
  const [connection, setConnection] = useState(null);

  useEffect(() => {
    let connection = new HubConnectionBuilder()
      .withUrl('/note-hub')
      .withAutomaticReconnect()
      .build();

    // listen server
    connection.on("ReceiveMessage", (user, message) => {
      setAfterInput(message)
      console.log(`${user} says ${message}`);
    })

    //start connection
    connection.start()
      .then(() => {
        console.log("successfully connected to hub");
      }).catch(err => console.log(err));

    setConnection(connection);
  }, [])

  const sendMessage = async (url, note) => {
    try {
      await connection.invoke("SendMessage", url, note)
        .catch(function (err) {
          return console.error(err.toString());
        });
    } catch (err) {
      console.error(err);
    }
  };
  //#endregion

  //#region Check URL random is used ?
  useEffect(() => {
    //GET '/'
    if (pathname === "") {
      dispatch(checkURL())
        .then(res => {
          navigate(res.payload.url);
        });

    } else {
      //GET '/:url'
      dispatch(GetNote(NOTE.url))
        //check onfulfilled and isSetpassword. if setPassword = true then navigate to login page
        .then((respose) => {
          console.log(respose);

          if (!respose.payload) {
            return;
          }

          // if not login navigate to login page
          if (respose.payload.url && respose.payload.setPassword) {
            dispatch(GetEditNoteStatus(respose.payload.url))
              .then(resJwt => {
                console.log(resJwt);
                //if not login navigate to login page
                if (resJwt.pathname == undefined && STORE.GetEditNoteStatus == null) {
                  navigate("/" + NOTE.url + "/login")
                } else {
                  navigate("/" + respose.payload.url)
                }
              })
          }
        })
    }
  }, []);
  //#endregion

  //change location pathname
  useEffect(() => {
    // update address url 
    NOTE.url ? navigate('/' + NOTE.url) : null;
  }, [NOTE.url])

  //if link exists
  useEffect(() => {
    // save link to store use late
    setAfterInput(NOTE.note)
  }, [NOTE.note != null])

  // UPDATE NOTE CONTENT AFTER TYING NOTE 1 seconds
  useEffect(() => {

    if (NOTE.note || NOTE.url) {

      const newTimer = setTimeout(() => {

        const payload = {
          ...NOTE,
          note: afterInput,
        }

        sendMessage(NOTE.url, afterInput)


        // delete payload.id;
        console.log(payload);
        dispatch(UpdateNote(payload))
      }, 1000);
      //clear for performance
      return () => clearTimeout(newTimer);
    }
  }, [afterInput])

  return (
    <div className='noteOnline'>
      <div className=''>
        <div className=' main-link'>
          <span>
            {NOTE.setPassword &&
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>}
            {NOTE == null ? (
              <a href={origin} >{origin}</a>
            ) : (
              <a href={origin + '/' + NOTE.url} >{origin + '/' + NOTE.url}</a>
            )}
          </span>
        </div>
        <div className='options'>
          <ModalShow
            changeUrl={
              {
                title: 'Change Url ',
                header: 'Enter the new Url',
                link: origin + NOTE.url,
                value: NOTE.url,
              }
            }

            setPassword={false}
            share={false}
          />
          <span className='divider'>|</span>

          <ModalShow
            changUrl={false}
            setPassword={true}
            share={false}
          />
          <span className='divider'>|</span>

          <ModalShow
            changUrl={false}
            setPassword={false}
            share={true}
          />
        </div>
        <div className='col-12 body-container'>
          <div className='document-container'>
            <textarea
              defaultValue={afterInput}
              onChange={e => setAfterInput(e.target.value)}

              placeholder='Type something, it will autosave as you type...'
              className='inputControl  col-12'
              name=''
              id='inputControl'
              cols='30'
              rows='10'
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Note;
