import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UpdatePassword, UpdateUrl, resetPassword, GetNote } from '../feature/NoteSlice';

function ModalShow(props) {

  let dataModal;
  const GetNoteFromRedux = useSelector((state) => state.note.GetNote);
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
      console.log(payloadUpdatePassword);

      dispatch(UpdatePassword(payloadUpdatePassword))
        .then((res) => {
          setShow(!show);
          console.log("res-----UpdatePassword", res);
          dispatch(GetNote(Note.url))
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
      console.log(payloadRemovePassword);
      dispatch(resetPassword(Note.url))
      dispatch(GetNote(Note.url))
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