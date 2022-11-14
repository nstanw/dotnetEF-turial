import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import "../custom.css";
import { noteActions, CreateNote, GetNote ,checkURL } from "../feature/NoteSlice";
import ModalShow from "./ModalShow";

function Note() {

  const [query, setQuery] = useState("");
  const [afterInput, setAfterInput] = useState("")

  const dispatch = useDispatch();
  const STORE = useSelector(state => state)

  //Check URL random is used ?
  useEffect(() => {
    dispatch(checkURL())
  }, []);


  useEffect(() => {
    setAfterInput(query);
    const createContent = {
      Url: STORE.note.url,
      Note: afterInput
    }
    if (afterInput) {
      return dispatch(CreateNote(createContent));
    }
    return
  });

  return (
    <div className="noteOnline">
      <div className="">
        <div className=" main-link">
          <span>
            <p>{afterInput}</p>
            {/* <a>http://localhost:44863/{STORE.checkURL.url}</a> */}
          </span>
        </div>
        <div className="options">

          <ModalShow
            changeUrl={true}
            setPassword={false}
            share={false} />
          <span className="divider">|</span>

          <ModalShow
            changUrl={false}
            setPassword={true}
            share={false} />
          <span className="divider">|</span>

          <ModalShow
            changUrl={false}
            setPassword={false}
            share={true} />

        </div>
        <div className="col-12 body-container">
          <div className="document-container">
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Type something, it will autosave as you type..."
              className="inputControl  col-12" name="" id="inputControl" cols="30" rows="10"></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Note;
