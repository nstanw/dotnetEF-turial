import React, { useState } from 'react';
import './style.core.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './../../features/formSlice';

export default function Core() {
  const dispatch = useDispatch();
  const STORE = useSelector((state) => state);

  const formik = useFormik({
    initialValues: {
      SMTPhost: '',
      Port: 25,
      UseSsl: false,
      UseDefaultCredentials: false,
      Email: '',
      Password: '',
      From: '',
      To: '',
    },
    validationSchema: Yup.object({
      SMTPhost: Yup.string()
        .min(3, 'Please check your SMTP host')
        .required('SMTP host is Required!'),
      Port: Yup.number().required(' Port Required!'),
      From: Yup.string()
        .email('Invalid email format')
        .required('Email from address is required!'),
      To: Yup.string()
        .email('Invalid email format')
        .required('Email to address is required!'),
    }),
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className='form-wrapper'>

      <div className='form-header'>
        {/* form header titlte */}
        <div className='header-title'>
          <iconify-icon
            className='icon-navb'
            icon='akar-icons:grid'
          ></iconify-icon>
          SMTPer
        </div>

        <div className='contaier-icon'>
          <div
          className='d-none d-md-block d-lg-block d-sm-block'
            // onClick={() => dispatch(actions.hiddenForm())}
            id='header-item-max'
          >
            <iconify-icon icon='carbon:maximize'></iconify-icon> &nbsp;
          </div>
          <div
            onClick={() => dispatch(actions.hiddenForm())}
            id='header-item-x'
          >
            <iconify-icon icon='bi:x-lg'></iconify-icon>
          </div>
        </div>
      </div>

      {/* bodyForm */}
      <div className='form-body row'>
        {/* left */}
        <div className='form-body-left col-md-4 col-lg-4  col-1 col-sm-1'>
          <div className=' d-xs-block d-sm-block d-md-none d-md-none'>
            <svg
              id='sendMenu'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              class='feather feather-menu'
            >
              <line
                x1='3'
                y1='12'
                x2='21'
                y2='12'
              ></line>
              <line
                x1='3'
                y1='6'
                x2='21'
                y2='6'
              ></line>
              <line
                x1='3'
                y1='18'
                x2='21'
                y2='18'
              ></line>
            </svg>
          </div>

          <div id='test-check'>
            <div className='d-none d-md-block d-lg-block d-sm-none'>Test & Check</div>
            <div id='svgSend '>
              <svg
                id='sendIcon'
                xmlns='http://www.w3.org/2000/svg'
                width='15'
                height='15'
                viewBox='0 0 24 24'
                fill='none'
                stroke='white'
                stroke-width='2'
                stroke-linecap='round'
                stroke-linejoin='round'
                class='feather feather-send'
              >
                <line
                  x1='22'
                  y1='2'
                  x2='11'
                  y2='13'
                ></line>
                <polygon points='22 2 15 22 11 13 2 9 22 2'></polygon>
              </svg>
            </div>
          </div>
        </div>

        {/* right */}
        <div className='form-body-right loo col-md-8 col-lg-8  col-11 col-sm-11'>
          <form onSubmit={formik.handleSubmit}>
            <div className='row'>
              <div className='col-lg-6'>
                <label className=' lb-host'>SMTPhost</label>
                <div></div>
                <input
                  name='SMTPhost'
                  type='text'
                  placeholder='required'
                  value={formik.values.SMTPhost}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <div className=' d-none d-md-none d-lg-block d-sm-none col-lg-6'>
                <p>
                  host or ip address of your smtp server (example:
                  smtp.company.com)
                </p>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6'>
                <label className='label'>Port</label>
                <div></div>
                <input
                  id='Port'
                  name='Port'
                  type='number'
                  placeholder='required'
                  value={formik.values.Port}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <div className=' d-none d-md-none d-lg-block d-sm-none col-lg-6'>
                <p>
                  the default port is 25, but some smtp servers use a custom
                  port (example: 587)
                </p>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6'>
                <input
                  id='UseSsl'
                  name='UseSsl'
                  type='checkbox'
                  value={formik.values.UseSsl}
                  onChange={formik.handleChange}
                ></input>
                <label
                  htmlFor='UseSsl'
                  className='alabel'
                >
                  Use Secured Connection
                </label>
              </div>
              <div className=' d-none  d-md-none d-lg-block d-sm-none col-lg-6'>
                <p>
                  checked it only if the smtp server needs a secured connection
                  (ssl, tsl)
                </p>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6'>
                <input
                  id='UseDefaultCredentials'
                  name='UseDefaultCredentials'
                  type='checkbox'
                  value={formik.values.UseDefaultCredentials}
                  onChange={formik.handleChange}
                ></input>
                <label
                  htmlFor='UseDefaultCredentials'
                  className='alabel'
                >
                  Use authentication
                </label>
              </div>
              <div className=' d-none  d-md-none d-lg-block d-sm-none col-lg-6'>
                <p>
                  most of smtp servers need an authentication (login/password).
                  Check it if required
                </p>
              </div>
            </div>

            <div className='authentication row'>
              <div className='col-lg-6'>
                <label className='label'>Login</label>
                <div></div>
                <input
                  name='Email'
                  type='text'
                  placeholder='not required'
                  value={formik.values.Email}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <div className=' d-none  d-md-none d-lg-block d-sm-none col-lg-6'>
                <p>
                  required if 'Use authentication' is checked (ex: account or
                  account@foo.com)
                </p>
              </div>
            </div>

            <div className='authentication row'>
              <div className='col-lg-6'>
                <label className='label'>Password</label>
                <div></div>
                <input
                  name='Password'
                  type='text'
                  placeholder='not required'
                  value={formik.values.Password}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <div className=' d-none  d-md-none d-lg-block d-sm-none col-lg-6'>
                <p>required if 'Use authentication' is checked</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6'>
                <label className=' orange'>Email from</label>
                <div></div>
                <input
                  name='From'
                  type='text'
                  placeholder='required'
                  value={formik.values.From}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <div className=' d-none  d-md-none d-lg-block d-sm-none col-lg-6'>
                <p>the sender's email address (example: account@foo.com)</p>
              </div>
            </div>

            <div className='row'>
              <div className='col-lg-6'>
                <label className=' orange'>Email to</label>
                <div></div>
                <input
                  name='To'
                  type='text'
                  placeholder='required'
                  value={formik.values.To}
                  onChange={formik.handleChange}
                ></input>
              </div>
              <div className=' d-none  d-md-none d-lg-block d-sm-none col-lg-6'>
                very important : the test mail will be sent to this address (ex:
                account@foo.com)
              </div>
            </div>

            <div className='submit-btn'>
              <div id='test-server'>
                {/* get first error in errors */}
                {Object.values(formik.errors)[0] ? (
                  <label id='errorValidate'>
                    {Object.values(formik.errors)[0]}
                  </label>
                ) : (
                  <label>Test your mail server</label>
                )}
              </div>

              <div id='Send-server'>
                <button
                  id='btnSubmit-server'
                  type='submit'
                  className='floatRight aWindow-button '
                >
                  <iconify-icon
                    className='floatRight'
                    icon='bi:send'
                  ></iconify-icon>
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
