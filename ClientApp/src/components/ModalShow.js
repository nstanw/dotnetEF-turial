import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { resetPassword, UpdateUrl, noteActions, UpdateNote, UpdatePassWord } from '../feature/NoteSlice';

function ModalShow(props) {

  let dataModal;
  const GetNoteFromRedux = useSelector((state) => state.note.GetNote);
  const Note = useSelector((state) => state.note.note);
  const UpdateNoteRedux = useSelector((state) => state.note.UpdateNote);
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
        ...Note,
        newUrl: newUrl,
      }
      // delete payload.id;

      console.log("payload", payloadUpdateUrl);

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
      const payload = {
        ...Note,
        Password: passUser,
        SetPassword: true,
      }
      console.log(payload);

      dispatch(UpdateNote(payload))
        .then((res) => {
          setShow(!show);
          console.log(res);
        })
    }
  }

  const toggle = () => {
    if (dataModal.title === 'remove password') {
      setShow(false);
      const payloadRemovePassword = {
        ...Note,
        Password: passUser,
        SetPassword: false,
      }
      console.log(payloadRemovePassword);
      dispatch(UpdateNote(payloadRemovePassword))
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
            {!props.setPassword && !props.share && <p className='urlFrefix'>{origin + valueInput}</p>}
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
                defaultValue={origin +'share/' + Note.url}
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