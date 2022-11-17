import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { resetPassword,updateLink, noteActions, UpdateNote, UpdatePassWord } from '../feature/NoteSlice';

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
      const payload = {
        ...GetNoteFromRedux,
        newUrl: newUrl,
      }
      delete payload.id;
      console.log("payload", payload);
      dispatch(UpdateNote(payload))
        .then(res => {
          navigate("/" + res.payload.url)
          console.log(res);
          if (res.payload.status === 400) {
            setErrorChangeUrl(true)
          }
        })
      setShow(false);
    }

    if (props.setPassword) {
      const payload = {
        ...Note,
        password: pass,
        setPassword: true,
      }
      console.log(payload);

      dispatch(UpdatePassWord(payload))
        .then((res) => {
          setShow(!show);
          console.log(res);
        })
    }
  }

  const toggle = () => {
    if (dataModal.title === 'remove password') {
      setShow(false);
      const payload = {
        password: passUser,
        setPassword: false,
      }
      console.log(payload);
      dispatch(resetPassword(payload))
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
            {!props.setPassword && <p className='urlFrefix'>{origin + '/' + valueInput}</p>}
            {props.setPassword
              ? <input
                required
                type="password"
                className='big '
                onChange={e => setPasswordUser(e.target.value)}
                autoFocus={true}
              />
              :
              <input
                className={`${props.share ? 'inputShare big' : 'big'}`}
                defaultValue={valueInput}
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