import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { GetNote, noteActions, UpdateNote, ThunkChangeUrl } from '../feature/NoteSlice';

function ModalShow(props) {

  let dataModal;
  const GetNoteFromRedux = useSelector((state) => state.note.GetNote);
  const Note = useSelector((state) => state.note.note);
  const UpdateNoteRedux = useSelector((state) => state.note.UpdateNote);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [valueInput, setValueInput] = useState();
  const [pass, setPassword] = useState();

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
        ...UpdateNoteRedux,
        newUrl: newUrl,
      }
      delete payload.id;
      console.log("payload", payload);
      dispatch(noteActions.setNote(payload))
      dispatch(UpdateNote(payload))
    }

    if (props.setPassword) {
      const payload = {
        ...Note,
        password: pass,
        setPassword: true,
      }
      console.log(payload);
      dispatch(UpdateNote(payload))
    }
  }


  const toggle = () => {

    if (dataModal.title === 'remove password') {
      const payload = {
        ...Note,
        password: pass,
        setPassword: false,
      }
      console.log(payload);
      dispatch(UpdateNote(payload))
      return setShow(false);
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
                type="password"
                className='big '
                onChange={e => setPassword(e.target.value)}
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
          </ModalBody>
          <ModalFooter>
            <Button color="light" onClick={toggle}>Close</Button>
            {!dataModal.share && <Button type='submit' color="primary" onClick={toggle}>Save</Button>}
          </ModalFooter>
        </form>
      </Modal>
    </div>
  );
}

export default ModalShow;