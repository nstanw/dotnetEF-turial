import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { UpdatePassword, UpdateUrl, resetPassword, GetNote } from '../feature/NoteSlice';

function ModalShow(props) {

  let dataModal;
  const GetNoteFromRedux = useSelector((state) => state.note.GetNote);
  const Note = useSelector((state) => state.note.note);
  const dispatch = useDispatch();
  const origin = window.location.origin + '/';

  const [show, setShow] = useState(false);
  const [valueInput, setValueInput] = useState();
  const [passUser, setPasswordUser] = useState();
  const [errorChangeUrl, setErrorChangeUrl] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (GetNoteFromRedux) {
      setValueInput(GetNoteFromRedux.url)
    }
  }, [GetNoteFromRedux === null])

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
          if (res.payload == undefined) {
            setErrorChangeUrl(true)
          }
        })


      setShow(false);
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
                className='big '
                onChange={e => setPasswordUser(e.target.value)}
                autoFocus={true}
              />
            }
            {props.changeUrl &&
              <input
                className={`${props.share ? 'inputShare big' : 'big'}`}
                defaultValue={valueInput}
                onChange={e => setValueInput(e.target.value)}
                autoFocus
              />
            }
            {props.share &&
              <input
                className={`${props.share ? 'inputShare big' : 'big'}`}
                defaultValue={origin + 'share/' + Note.url}
                onChange={e => setValueInput(e.target.value)}
                autoFocus
              />
            }


            {errorChangeUrl && <div>This path is already in use. Please choose again</div>}
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={toggle}>Close</Button>
            {!dataModal.share && <Button type='submit' color="primary">Save</Button>}
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}

export default ModalShow;