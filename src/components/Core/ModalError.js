import React, { useState } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from 'react-redux';

function ModalError(props) {
    const STORE = useSelector(state => state);

    const [show, setShow] = useState(true);
    function toggle() {
        setShow(!show);
    }
    return (
        <div>
            <div className=""
                onClick={toggle}
            >
            </div>
            <Modal
                size="lg" style={{ width: '85vw !important', height: "400px" }}
                isOpen={show}
                toggle={toggle}
                className=""
            >
                <ModalBody>
                    <p>
                        {STORE.form.SendMail.status === '400' ? 'SMTP send error' : 'SMTP send OK!'}
                    </p>
                    <p>
                        {STORE.form.SendMail.body.error.Message}
                    </p>
                    <p>
                        {STORE.form.SendMail.body.error.InnerException.Message}
                    </p>


                </ModalBody>
                <ModalFooter>

                    <div className="">
                        <button onClick={toggle} id='closeModal' >Close</button>
                    </div>

                </ModalFooter>
            </Modal>
        </div>
    );
}

export default ModalError;
