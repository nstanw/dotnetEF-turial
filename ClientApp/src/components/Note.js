import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import '../custom.css';
import {
<<<<<<< HEAD
  UpdateNote,
=======
>>>>>>> 6ad36a673b2e2eafac552ebd1a07937dd8460633
  noteActions,
  CreateNote,
  GetNote,
  checkURL,
} from '../feature/NoteSlice';
import ModalShow from './ModalShow';

function Note() {
<<<<<<< HEAD

  const [afterInput, setAfterInput] = useState('');
  const [url, setURL] = useState('');
=======
  const [query, setQuery] = useState('');
  const [afterInput, setAfterInput] = useState('');
  const [timer, setTimer] = useState(null);
>>>>>>> 6ad36a673b2e2eafac552ebd1a07937dd8460633

  const dispatch = useDispatch();
  const UrlFromStore = useSelector((state) => state.note.checkURL);

  //Check URL random is used ?
  useEffect(() => {
    dispatch(checkURL());
  }, []);

<<<<<<< HEAD
  // send note post request
  useEffect(() => {
    if (UrlFromStore) {
      const newTimer = setTimeout(() => {
        console.log(afterInput);
        const payload = {
          url: UrlFromStore.url,
          note: afterInput,
          password: null,
          setPassword: false
        }
        dispatch(UpdateNote(payload))
      }, 1000);

      return () => clearTimeout(newTimer);
    }

=======
// send note post request
  useEffect(() => {

    const newTimer = setTimeout(() => {
      console.log(afterInput);
      dispatch()
    }, 1000);

   return ()=> clearTimeout(newTimer);
>>>>>>> 6ad36a673b2e2eafac552ebd1a07937dd8460633
  }, [afterInput]);

  return (
    <div className='noteOnline'>
      <div className=''>
        <div className=' main-link'>
          <span>
            <p>{afterInput}</p>
            {UrlFromStore == null ? (
              <a>http://localhost:44863/</a>
            ) : (
              <a>http://localhost:44863/{UrlFromStore.url}</a>
            )}
          </span>
        </div>
        <div className='options'>
          <ModalShow
            changeUrl={true}
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
              value={afterInput}
<<<<<<< HEAD
              onChange={e => setAfterInput(e.target.value)}
=======
              onChange={e =>  setAfterInput(e.target.value)}
>>>>>>> 6ad36a673b2e2eafac552ebd1a07937dd8460633
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
