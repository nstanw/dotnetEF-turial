import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { noteActions, UpdateNote, ThunkChangeUrl } from '../feature/NoteSlice';

function ModalShow(props) {
  console.log("prop", props);

  let dataModal;

  const dispatch = useDispatch();
  const url = useSelector((state) => state.note.url);
  const [show, setShow] = useState(false);
  const [valueInput, setValueInput] = useState(url);

  const handleSubmit = (e) => {

    e.preventDefault();
    setValueInput(url);
    console.log("valueInput", valueInput);

    const payload = valueInput;
    dispatch(ThunkChangeUrl(payload))
  }

  const toggle = () => {
    setShow(!show);
  }


  if (props.changeUrl) {
    const changeUrl = {
      title: 'Change Url ',
      header: 'Enter the new url',
      link: "https://wordpad.cc/" + valueInput,
      value: valueInput,
      share: false,
    }
    dataModal = changeUrl;

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
      value: "https://wordpad.cc/" + valueInput,
      share: true,
    }

    dataModal = share;
  }

  return (
    <div>
      <span onClick={toggle}>{dataModal.title}</span>
      <Modal isOpen={show} toggle={toggle}>
        <form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>{dataModal.header}</ModalHeader>
          <ModalBody>
            <p>{dataModal.link}</p>

            <input
              value={dataModal.value}
              placeholder={url}
              onChange={e => setValueInput(e.target.value)}
            />

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