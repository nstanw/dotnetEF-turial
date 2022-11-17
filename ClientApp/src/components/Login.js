import React, { useEffect, useState } from "react";
import { loginNote, noteActions, GetNote } from '../feature/NoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [error, setError] = useState(false);

    const Url = window.location.pathname.split('/')[1];

    const handleSubmit = (e) => {
        e.preventDefault();
        const value = e.target[0].value;
        console.log(value);
        const urlAndPass = {
            url: Url,
            Password: value
        }
        console.log(urlAndPass);
        dispatch(loginNote(urlAndPass))
            .then((res) => {
                console.log(res);
                if (res.payload == undefined) {
                    setError(true);
                } else {
                    dispatch(noteActions.editNoteOn());
                    navigate('/' + Url)
                }
            });
        //call api check passs. if match to run host/link 
        // else incorect


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