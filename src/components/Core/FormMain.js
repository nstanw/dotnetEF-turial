import React from 'react';
import './style.css';
function FormMain() {
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
    <div className='form-main'>
      <div className='form-wrapper '>
        {/* header form */}
        <div className='form-header '>
          <div className='header-title'>
            <iconify-icon
              className='icon-navb'
              icon='akar-icons:grid'
            ></iconify-icon>{' '}
            SMTPer
          </div>
          <div id='header-item-x'>
            <iconify-icon icon='bi:x-lg'></iconify-icon>
          </div>
        </div>

        {/* left */}
        <div className='form-body'>
          <div className='form-body-left '>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#201e1e'
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
           
            <div id='svgSend'>
            <iconify-icon icon="bi:send" ></iconify-icon>
            </div>
          </div>
          <div className='form-body-right '>
            <form onSubmit={hanldSubmit}>
              <div className='element-margin'>
                <div className='col-lg-6'>
                  <label className='label'>SMTPhost</label>
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

              <div className='element-margin'>
                <div className='col-lg-6'>
                  <label className='label'>Port</label>
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

              <div className='element-margin'>
                <div className='col-lg-6'>
                  <input
                    value={true}
                    id='UseSsl'
                    name='UseSsl'
                    type='checkbox'
                  ></input>
                  <label htmlFor='UseSsl' className='alabel'>Use Secured Connection</label>
                </div>
                <div className='col-lg-6 d-none d-sm-block'>
                  <p>
                    checked it only if the smtp server needs a secured
                    connection (ssl, tsl)
                  </p>
                </div>
              </div>

              <div className='element-margin'>
                <div className='col-lg-6'>
                  <input
                    value={true}
                    id='UseDefaultCredentials'
                    name='UseDefaultCredentials'
                    type='checkbox'
                  ></input>
                  <label htmlFor='UseDefaultCredentials' className='alabel'>
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

              <div className='element-margin'>
                <div className='col-lg-6 '>
                  <label className='label'>Login</label>
                  <input
                    name='Email'
                    type='text'
                    placeholder='not required'
                  ></input>
                </div>
                <div className='col-lg-6 d-none d-sm-block'>
                  <p>
                    required if 'Use authentication' is checked (ex: account or
                    account@foo.com)
                  </p>
                </div>
              </div>

              <div className='element-margin'>
                <div className='col-lg-6'>
                  <label className='label'>Password</label> 
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

              <div className='element-margin'>
                <div className='col-lg-6'>
                  <label className=' orange'>Email from</label>
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

              <div className='element-margin'>
                <div className='col-lg-6'>
                  <label className=' orange'>Email to</label>
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

              <div className='submit-btn'>
                <div id='test-server'>
                  <label>Test your mail server</label>
                </div>

                <div id='Send-server'>
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormMain;
