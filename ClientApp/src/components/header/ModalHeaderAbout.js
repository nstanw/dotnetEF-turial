import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

//Reuses Modal components
function ModalHeaderAbout(props) {
  //Rename props
  const propData = props.props;

  //Set Show Modal
  const [show, setShow] = useState( propData.openModal || false );
  function toggle() {
    setShow(!show);
  }
  return (
    <div>
      <div className=""
        onClick={toggle}
      >
        <iconify-icon icon={propData.header.icon}></iconify-icon>
        &nbsp; {propData.header.content}
      </div>
      <Modal
      // set size Modal
        size="lg" style={{ width: '85vw !important', height: "400px" }} 
        isOpen={show}
        toggle={toggle}
        className=""
      >
        {/* align-center content */}
        <ModalHeader toggle={toggle} cssModule={{ 'modal-title': 'w-100 text-center' }}>
          <div className="d-flex justify-content-center">
            <iconify-icon icon="feather:alert-octagon"></iconify-icon>
            &nbsp; {propData.header.content}
          </div>
        </ModalHeader>
        <ModalBody>
          {propData.body}


        </ModalBody>
        <ModalFooter>
          <div className=''>
            {propData.footer}
          </div>
          <div className="">
            <button onClick={toggle} id='closeModal' >Close</button>
          </div>

        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalHeaderAbout;
