import React, { useEffect, useState } from "react";
import { GetEditNoteStatus, GetNote, noteActions, checkPassword } from '../feature/NoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const NOTE = useSelector((state) => state.note.note);
    const Store = useSelector((state) => state.note);
    const [error, setError] = useState(false);

    //get url on address
    const Url = window.location.pathname.split('/')[1];

    useEffect(() => {
       if (Store.GetEditNoteStatus) {
        navigate('/' + Url)
       }
    }, [Store.GetEditNoteStatus == null])

    const handleSubmit = (e) => {
        e.preventDefault();

        //Get value input
        const value = e.target[0].value;
        const payloadPassCheck = {
            url: Url,
            Password: value,
           
        }

        console.log(value);
        console.log(payloadPassCheck);

        dispatch(checkPassword(payloadPassCheck))
            .then((res) => {
                console.log("checkPassword-----",res);
                if (res.payload == undefined) {
                    setError(true);
                } else {
                    localStorage.setItem('token', res.payload.token);
                    navigate('/' + Url)
                    dispatch(noteActions.editNoteOn());
                }
            });
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="txtPassword">
                    Password required to edit this document
                </label>
                <input
                    required="required"
                    placeholder="Password"
                    className="form-control input-lg"
                    type="password"
                    id="txtPassword" />
                {error && <p>Wrong password</p>}
                <button
                    className="btn btn-primary"
                    type="submit"
                    id="btnLogin">
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;