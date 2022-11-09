import React from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../features/formSlice';

function ModalError() {

    const dispatch = useDispatch();
    
    const SendMail = useSelector(state => state.form.SendMail);
    const Form = useSelector(state => state.form);

    function toggle() {
       dispatch(actions.hideModalError())
    }
    return (
        <>
            <div>
                <Modal
                    size="lg" style={{ width: '85vw !important', height: "400px" }}
                    isOpen={Form.showModalError}
                    toggle={toggle}
                    className=""
                >
                    <ModalBody>
                        {SendMail.isError && SendMail.body.message &&
                            <>{console.log(Object.keys(SendMail.body))}
                                <p> Mail Sent Falled!</p>
                                <p>  {SendMail.body.name}</p>
                                <p>
                                    {SendMail.body.message}
                                </p>
                            </>
                        }
                        {!SendMail.isError 
                        && Object.keys(SendMail.body).includes("message") 
                        &&    <>{console.log(Object.keys(SendMail.body).includes("message"))}
                                <p> Sent Falled!</p>
                                <p>  {SendMail.body.name || null}</p>
                                <p>
                                    {SendMail.body.message}
                                </p>
                            </>
                        }
                        {SendMail.isSussces && SendMail.body.message === null &&
                            <>
                                <p> Mail Sent </p>
                            </>
                        }

                    </ModalBody>
                    <ModalFooter>

                        <div className="">
                            <button onClick={toggle} id='closeModal' >Close</button>
                        </div>

                    </ModalFooter>
                </Modal>
            </div>
        </>
    );
}

export default ModalError;
