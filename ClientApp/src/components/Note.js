import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import '../custom.css';
import {
  UpdateNote,
  noteActions,
  CreateNote,
  GetNote,
  checkURL,
} from '../feature/NoteSlice';
import ModalShow from './ModalShow';

function Note() {

  const pathname = window.location.pathname.split('/')[1];
  const origin = window.location.origin;

  //Check URL random is used ?
  useEffect(() => {
    if (pathname === "") {
      dispatch(checkURL());
    } else {
      dispatch(GetNote(pathname));
    }
  }, []);

  const [afterInput, setAfterInput] = useState('');

  const dispatch = useDispatch();
  const UrlFromStore = useSelector((state) => state.note.checkURL);
  const NOTE = useSelector((state) => state.note.note);

  //if get link exists
  useEffect(() => {
    setAfterInput(NOTE.note)
  }, [NOTE.note != null])

  // send note post request
  useEffect(() => {
    if (NOTE.note || NOTE.url) {
      const newTimer = setTimeout(() => {
        console.log(afterInput);
        const payload = {
          ...NOTE,
          note: afterInput,
        }
        dispatch(UpdateNote(payload))
      }, 1000);

      return () => clearTimeout(newTimer);
    }
  }, [afterInput])

  return (
    <div className='noteOnline'>
      <div className=''>
        <div className=' main-link'>
          <span>
            {NOTE == null ? (
              <a >{origin + '/' + afterInput}</a>
            ) : (
              <a>{origin + '/' + NOTE.url}</a>
            )}
          </span>
        </div>
        <div className='options'>
          <ModalShow
            changeUrl={
              {
                title: 'Change Url ',
                header: 'Enter the new url',
                link: "https://wordpad.cc/" + NOTE.url,
                value: NOTE.url,
              }
            }

            setPassword={false}
            share={false}

          />
          <span className='divider'>|</span>

          <ModalShow
            changUrl={false}
            setPassword={true}
            share={false}
          />
          <span className='divider'>|</span>

          <ModalShow
            changUrl={false}
            setPassword={false}
            share={true}
          />
        </div>
        <div className='col-12 body-container'>
          <div className='document-container'>
            <textarea
              defaultValue={afterInput}
              onChange={e => setAfterInput(e.target.value)}

              placeholder='Type something, it will autosave as you type...'
              className='inputControl  col-12'
              name=''
              id='inputControl'
              cols='30'
              rows='10'
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Note;
