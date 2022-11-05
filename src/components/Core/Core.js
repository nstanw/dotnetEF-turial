import React from 'react';
import FormMain from './FormMain';

import './style.css';
export default function Core() {
  console.log(window.innerWidt);
  const hanldSubmit = (e, value) => {
    e.preventDefault();
    // vì ứng dụng nhỏ nên em dùng form thuần để xử lí
    // tạo ojb để lưu dữ liệu từ form
    let values = {};
    alert('ok');

    //set values to ojb
    for (let index = 0; index <= 7; index++) {
      let value;

      //filter checkbox to get values boolean
      const filterCheckbox = e.target[index].type === 'checkbox';
      if (filterCheckbox) {
        value = e.target[index].checked;
      } else {
        //set value
        value = e.target[index].value;
      }

      let name = e.target[index].name;
      values[name] = value;
    }

    //fetch to BE
    const url = 'https://localhost:44381/sendmail';
    const data = values;
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(data),
    };

    async function callAPI() {
      try {
        const res = await fetch(url, options);
        console.log(res);
        return res;
      } catch (error) {
        return console.log(error);
      }
    }
    callAPI();
  };
  return (
    <>
        <FormMain/>
     

      {/* <div id='wCore'>
        <div className='aWindow row'>
          <div className='aWindow-header col-lg-12 col-sm-12 row'>
            <div className='col-lg-11 col-sm-11  SMTPer-aligt'>
              <span className='aWindow-header-title '>
                <iconify-icon
                  className='icon-navb'
                  icon='akar-icons:grid'
                ></iconify-icon>{' '}
                SMTPer
              </span>
            </div>

            <div className='floatRight col-lg-1 col-sm-1 row'>
              <div className='d-none d-sm-block'>
                <iconify-icon icon='carbon:maximize'></iconify-icon>&nbsp;
              </div>
              <div className='col-sm-1'>
                <iconify-icon icon='bi:x-lg'></iconify-icon>
              </div>
            </div>
          </div>

          <div className='aWindow-flex col-lg-12 col-sm-12 container row'>
            
            <div
              id='test-check'
              className='aWindow-menu col-lg-4 col-sm-2'
            >
              <div className='aWindow-menu-item on d-none d-sm-block'>
                Test &amp; Check
              </div>
              <div className=''>
                <iconify-icon
                  className='floatRight'
                  icon='bi:send'
                ></iconify-icon>
              </div>
            </div>
            <div className='aWin-right-core aWindow-core loo col-lg-8 col-sm-8 row'>
              <form onSubmit={hanldSubmit}>
                <div className='row'>
                  <div className='col-lg-6'>
                    <label>SMTPhost</label> <br />
                    <input
                      name='SMTPhost'
                      type='text'
                      placeholder='required'
                    ></input>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block '>
                    <p>
                      host or ip address of your smtp server (example:
                      smtp.company.com)
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <label>Port</label> <br />
                    <input
                      name='Port'
                      type='number'
                      placeholder='required'
                    ></input>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block'>
                    <p>
                      the default port is 25, but some smtp servers use a custom
                      port (example: 587)
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <input
                      value={true}
                      id='UseSsl'
                      name='UseSsl'
                      type='checkbox'
                    ></input>
                    <label htmlFor='UseSsl'>Use Secured Connection</label>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block'>
                    <p>
                      checked it only if the smtp server needs a secured
                      connection (ssl, tsl)
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <input
                      value={true}
                      id='UseDefaultCredentials'
                      name='UseDefaultCredentials'
                      type='checkbox'
                    ></input>
                    <label htmlFor='UseDefaultCredentials'>
                      Use authentication
                    </label>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block'>
                    <p>
                      most of smtp servers need an authentication
                      (login/password). Check it if required
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6 '>
                    <label>Login</label> <br />
                    <input
                      name='Email'
                      type='text'
                      placeholder='not required'
                    ></input>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block'>
                    <p>
                      required if 'Use authentication' is checked (ex: account
                      or account@foo.com)
                    </p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <label>Password</label> <br />
                    <input
                      name='Password'
                      type='text'
                      placeholder='not required'
                    ></input>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block'>
                    <p>required if 'Use authentication' is checked</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <label>Email from</label> <br />
                    <input
                      name='From'
                      type='text'
                      placeholder='required'
                    ></input>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block'>
                    <p>the sender's email address (example: account@foo.com)</p>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-lg-6'>
                    <label>Email to</label> <br />
                    <input
                      name='To'
                      type='text'
                      placeholder='required'
                    ></input>
                  </div>
                  <div className='col-lg-6 d-none d-sm-block'>
                    very important : the test mail will be sent to this address
                    (ex: account@foo.com)
                  </div>
                </div>

                <label>Test your mail server</label>

                <button
                  type='submit'
                  className='floatRight aWindow-button '
                >
                  <iconify-icon
                    className='floatRight'
                    icon='bi:send'
                  ></iconify-icon>
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div> */}

      
    </>
  );
}
