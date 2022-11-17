import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetNote } from '../feature/NoteSlice';
import './share.style.css'
function Share() {

    const dispatch = useDispatch();
    const NoteFromStore = useSelector(state => state.note.note);
    const urlNote = window.location.pathname.split('/')[2];

    console.log(urlNote);
    useEffect(() => {
      dispatch(GetNote(urlNote))
    }, [])

    return (
        <div className='share'>
            <pre id="displayControl" className="displayControl">{NoteFromStore.note}</pre>
        </div>);
}

export default Share;