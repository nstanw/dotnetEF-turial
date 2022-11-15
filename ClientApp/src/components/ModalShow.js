import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { noteActions, UpdateNote, ThunkChangeUrl } from '../feature/NoteSlice';

function ModalShow(props) {

  console.log(props);

  let dataModal;
  const UrlFromStore = useSelector((state) => state.note.checkURL);
  const NoteFromRedux = useSelector((state) => state.note.note);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const [valueInput, setValueInput] = useState();

  useEffect(() => {
    if (UrlFromStore) {
      setValueInput(UrlFromStore.url)
    }
  }, [UrlFromStore === null])
  console.log(valueInput);

  //#region check open modal
  if (props.changeUrl) {
    dataModal = props.changeUrl;
  }

  if (props.setPassword) {
    const setPassword = {
      title: ' Set Password ',
      header: 'Enter the password',
      link: null,
      value: null,
      share: false,
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
    setValueInput(valueInput);
    console.log("valueInput", valueInput);

    //convert " " to "-" on url contain space
    const newUrl = valueInput.split(' ').join("-");


    const payload = {
      ...NoteFromRedux,
      newUrl: newUrl,
    }
    delete payload.id;
    console.log("payload", payload);
    dispatch(noteActions.setNote(payload))
    dispatch(UpdateNote(payload))
  }

  const toggle = () => {
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
            <p className='urlFrefix'>{'https://localhost:5001/' + valueInput}</p>

            {props.setPassword
              ? <input
                className='big '
                onChange={e => setValueInput(e.target.value)}
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