import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import '../custom.css';
import {
  UpdateNote,
  noteActions,
  CreateNote,
  GetNote,
  checkURL,
} from '../feature/NoteSlice';
import ModalShow from './ModalShow';
import { useNavigate } from 'react-router-dom'

function Note() {

  const navigate = useNavigate()
  const dispatch = useDispatch();


  //get path thanh andress
  const pathname = window.location.pathname.split('/')[1];
  const origin = window.location.origin + '/';
  console.log(window.location);

  //get Note in Store
  const [afterInput, setAfterInput] = useState('');
  const NOTE = useSelector((state) => state.note.note);
  const getNOTE = useSelector((state) => state.note.GetNote);
  const editNote = useSelector((state) => state.note.editNote);

  //Check URL random is used ?
  useEffect(() => {
    //GET '/'
    if (pathname === "") {
      dispatch(checkURL())
        .then(res => {
          navigate(res.payload.url);
        });

    } else {
      //GET '/:url'
      dispatch(GetNote(pathname))
        //check onfulfilled and isSetpassword. if setPassword = true then navigate to login page
        .then((respose) => {
          if (respose.payload.setPassword && !editNote) {
            // navigate to login page
            navigate('/' + respose.meta.arg + '/login');
          }
        })
    }
  }, []);

  //if get link exists
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
        delete payload.id;
        console.log(payload);
        dispatch(UpdateNote(payload))
      }, 1000);

      return () => clearTimeout(newTimer);
    }
  }, [afterInput])

  return (
    <div className='noteOnline'>
      <div className=''>
        <div className=' main-link'>
          <span>
            {NOTE.setPassword &&
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="20" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>}
            {NOTE == null ? (
              <a href={origin} >{origin}</a>
            ) : (
              <a href={origin + NOTE.url} >{origin + NOTE.url}</a>
            )}
          </span>
        </div>
        <div className='options'>
          <ModalShow
            changeUrl={
              {
                title: 'Change Url ',
                header: 'Enter the new url',
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
