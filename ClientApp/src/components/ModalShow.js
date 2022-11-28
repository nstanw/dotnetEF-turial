import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UpdatePassword, UpdateUrl, resetPassword, GetNote, GetAuth, GetEditNoteStatus } from '../feature/NoteSlice';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'

let count = 0;
let countReset = 0;
function ModalShow(props) {

  let dataModal;
  const Note = useSelector((state) => state.note.note);
  const STORE = useSelector((state) => state.note);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const origin = window.location.origin + '/';

  const [show, setShow] = useState(false);

  const [valueInput, setValueInput] = useState();
  const [passUser, setPasswordUser] = useState();
  const [errorChangeUrl, setErrorChangeUrl] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (Note) {
      setValueInput(Note.url)
    }
  }, [Note.url])

  const [connection, setConnection] = useState(null);

  useEffect(() => {
    let connection = new HubConnectionBuilder()
      .withUrl('/note-hub')
      .withAutomaticReconnect()
      .build();

    //start connection
    connection.start()
      .then(() => {
        console.log("successfully connected to hub");

        connection.on("SendLogout", (SendLogout) => {
          count++;
          console.log("SendLogout, count: ", count);
          if (count >= 3) {
            count = 0;
            console.log("SendLogout, count > 3: ", count);
            dispatch(GetNote(Note.url))
              .then((res) => {
                console.log(res);
                navigate("/" + res.payload.url)
              })
          }
        })

        connection.on("SendReset", (SendReset) => {
          countReset++;
          if (countReset >= 3) {
            console.log("sau khi bam SendReset, countReset: " + countReset);
            countReset = 0;
            dispatch(GetNote(Note.url))
              .then(() => {
                navigate("/" + Note.url)
              });
          }
        })


      }).catch(err => console.log(err));

    setConnection(connection);
  }, [])


  // người dùng setpassword
  const UpdatePasswordReadTime = async (SendLogout) => {
    try {
      await connection.invoke("SendLogout", SendLogout)
        .catch(function (err) {
          return console.error(err.toString());
        });
    } catch (err) {
      console.error(err);
    }
  };

  const SendReset = async (SendReset) => {
    try {
      await connection.invoke("SendReset", SendReset)
        .catch(function (err) {
          return console.error(err.toString());
        });
    } catch (err) {
      console.error(err);
    }
  };

  //#region check open modal
  if (props.changeUrl) {
    dataModal = props.changeUrl;
  }

  if (props.setPassword) {
    let title;
    if (Note) {
      Note.setPassword
        ? title = 'remove password'
        : title = ' Set Password ';
    }

    const setPassword = {
      title: title,
      header: 'Enter the password',
    }
    dataModal = setPassword;

  }

  if (props.share) {
    const share = {
      title: 'Share',
      header: 'Share this page',
      link: null,
      // value: "https://wordpad.cc/" + valueInput,
      share: true,
    }

    dataModal = share;
  }
  //#endregion
  //#region  function handle
  const handleSubmit = (e) => {
    e.preventDefault();

    if (props.changeUrl) {

      setValueInput(valueInput);
      //convert " " to "-" on url contain space
      const newUrl = valueInput.split(' ').join("-");

      const payloadUpdateUrl = {
        url: Note.url,
        newUrl: newUrl,
      }
      // delete payload.id;

      console.log("payloadUpdateUrl", payloadUpdateUrl);

      dispatch(UpdateUrl(payloadUpdateUrl))
        .then(res => {
          console.log(res);
           navigate("/" + Note.url)

          if (res.payload.use) {
            setErrorChangeUrl(true)
            return setShow(true);
          }

          if (res.payload.id) {
            return setShow(false);
          }
        })
      STORE.UpdateUrl.loading ? setShow(true) : null;
    }

    if (props.setPassword) {

      // if password != "" then setpassword = true, if else setpassword = false
      let SetPassword;
      if (passUser === "") {
        SetPassword = false;
      } else { SetPassword = true }

      const payloadUpdatePassword = {
        url: Note.url,
        password: passUser,
        setPassword: SetPassword,
      }

      dispatch(UpdatePassword(payloadUpdatePassword))
        .then((res) => {
          UpdatePasswordReadTime(true)
          setShow(!show);
          dispatch(GetAuth(Note.url))
        })
    }
  }

  const toggle = () => {
    if (dataModal.title === 'remove password') {
      setShow(false);
      const payloadRemovePassword = {
        url: Note.url,
        password: null,
        setPassword: false,
      }
      const Url = window.location.pathname.split('/')[1];
      dispatch(resetPassword(Url))
        .then(res => {
          SendReset(true)
          console.log(res)
          // dispatch(GetNote(Note.url))
        })

      return;
    }

    if (dataModal.title === 'Change Url') {
      setShow(true);
      return;
    }

    setShow(!show);

  }
  //#endregion

  return (
    <div>

      <span onClick={toggle}>{dataModal.title}</span>
      <Modal isOpen={show} toggle={toggle}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>{dataModal.header}</ModalHeader>
          <ModalBody>
            {!props.setPassword && !props.share && <p className='urlFrefix'>{origin + Note.url}</p>}
            {props.setPassword &&
              <input
                required
                type="password"
                className='big form-control input-lg'
                onChange={e => setPasswordUser(e.target.value)}
                autoFocus={true}
              />
            }
            {props.changeUrl &&
              <input
                className='form-control big input-lg'
                defaultValue={valueInput}
                onChange={e => setValueInput(e.target.value)}
                autoFocus
              />
            }
            {props.share &&
              <input
                className="form-control inputShare big input-lg"
                defaultValue={origin + 'share/' + Note.url}
                onChange={e => setValueInput(e.target.value)}
                ref={inputRef}
                onFocus={() => inputRef.current.select()} align-middle

              />
            }


            {STORE.UpdateUrl.use && props.changeUrl && <div className='text-danger align-middle'>
              <iconify-icon icon="ic:baseline-warning" width="30" height="30" ></iconify-icon>
              That one is already in use, please try a different one.
            </div>}
          </ModalBody>
          <ModalFooter>

            {STORE.pending && props.setPassword &&
              <div className="">
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              </div>
            }

            <div className="">
              {STORE.UpdateUrl.loading && props.changeUrl &&
                <svg xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="feather feather-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><polyline points="7 3 7 8 15 8"></polyline></svg>
              }
            </div>
            <div>
              <Button color="light" onClick={toggle}>Close</Button>
              {!dataModal.share && <Button type='submit' color="primary">Save</Button>}
            </div>
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}

export default ModalShow;