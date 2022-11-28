import React, { useEffect, useState } from "react";
import { GetEditNoteStatus, GetNote, noteActions, checkPassword } from '../feature/NoteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import './loginStyle.css';
import { Alert } from "reactstrap";

function Login() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const NOTE = useSelector((state) => state.note.note);
    const Store = useSelector((state) => state.note);
    const [error, setError] = useState(false);
    const [WrongPass, setWrongPass] = useState(false);

    //get url on address
    const origin = window.location.origin;
    const Url = window.location.pathname.split('/')[1];

    useEffect(() => {
        dispatch(GetNote( Url))
            .then(res => {
                console.log(res);
                console.log(res.payload === undefined);
                if (res.payload === undefined) {
                    navigate('/'+ Url)
                }
           
                if (!res.payload.setPassword) {
                    navigate('/'+ Url)
                }
            })
    },[]);

    const handleSubmit = (e) => {
        e.preventDefault();

        //Get value input
        const value = e.target[0].value;
        const payloadPassCheck = {
            url: Url,
            Password: value,
        }

        dispatch(checkPassword(payloadPassCheck))
            .then((res) => {
                console.log(res);
                if (res.payload == undefined) {
                    setError(true);
                } else {
                    if (res.payload.id) {

                        navigate('/' + res.payload.url);
                    }
                    if (!res.payload.matchPass) {
                        setWrongPass(true);
                    }
                }
            });
    }
    return (
        <div className="container">
            <form className="form-group" onSubmit={handleSubmit}>
                <label htmlFor="txtPassword">
                    Password required to edit this document
                </label>
                <input
                    id="txtPassword"
                    required="required"
                    placeholder="Password"
                    className="form-control input-lg"
                    type="password"
                />

                {error && <span id="spnChangePasswordError">Something Wrong!!!</span>}
                {WrongPass && <span id="spnChangePasswordError"> Wrong Password!!!</span>}
                <div></div>
                <button
                    className="btn btn-primary"
                    type="submit"
                    id="btnLogin">
                    Submit
                </button>
            </form>
        </div>
    );
}

export default Login;