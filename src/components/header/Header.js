import React from 'react';
import './StyleHeader.css';
import './../../darkMode.css'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './../../features/formSlice';
import ModalHeaderAbout from './ModalHeaderAbout';

function Header() {
  //use Store
  const dispatch = useDispatch();
  const STORE = useSelector((state) => state);

  const handeChangeDarkModeTheme = () => {
    dispatch(actions.darkModeForm());
  }

  const handeChangeLightModeTheme = () => {
    dispatch(actions.lightModeForm());
  }

  //define Props send to component ModalHeaderAbout
  //Content
  const bodyDisclaimer = [
    <p> We made this tool for our personal use.
      If you need to test a smtp server, please feel free to use it at your own risks.</p>,
    <p>For your information, no data will be persistent or stored on our server.</p>,
    <p>If you still don't feel confident, we advise you to use a test account.
      You can also change your password after your test(s).
    </p>

  ];

  const footerDisclaimer = [
    <div className=''>
      For more information, contact us at <i class="lowlight">team (at) nanogenesis.xyz</i>
    </div>
  ];

  const bodyAbout = [
    <p>
      Author: Song LAN
      Generated at: 11/6/2022 12:40:17 PM (UTC)
    </p>,
    <p>Contact: team (at) nanogenesis.xyz</p>,
  ];

  const footerAbout = [
    <div className=''>
      © SMTPer v0.410 (2010 - 2022)
    </div>
  ];

  //ojb Props send
  const Disclaimer = {
    header: {
      icon: 'feather:alert-octagon',
      content: 'Disclaimer'
    },
    body: bodyDisclaimer,
    footer: footerDisclaimer,
  }

  const About = {
    header: {
      icon: 'feather:info',
      content: 'About'
    },
    body: bodyAbout,
    footer: footerAbout,
  }


  const HeaderPage = () => {
    return (
      <header className=' nanoMenu item'>

        <div className='header-item'>
          <span
            onClick={() => dispatch(actions.showForm())}
            className={`item ${STORE.form.isShowHeader ? null : 'on'}`}
          >
            <iconify-icon
              className='icon-navb'
              icon='akar-icons:grid'
            ></iconify-icon>
            &nbsp;SMTPer
          </span>
        </div>

        <div className='header-item'>
          <span className='dropdown item d-none d-sm-block'>
            <div className='navb-sub'>
              <span
                data-bs-toggle='dropdown'
                aria-expanded='false'
              >
                <iconify-icon
                  className='icon-navb'
                  icon='lucide:feather'
                ></iconify-icon>
                &nbsp;More Apps
                <iconify-icon
                  className='icon-navb'
                  icon='feather:chevron-down'
                ></iconify-icon>
              </span>

              <div className=' Submenu dropdown-menu nanoDropDownMenu w3-container w3-animate-left'>
                <span className='dr-down text-center'>
                  <iconify-icon icon='octicon:zap-24' />
                  <span>
                    <a
                      target='_blank'
                      rel="noreferrer"
                      href='https://www.postman.com/'
                    >
                      PostMan
                    </a>
                  </span>
                </span>
              </div>
            </div>
          </span>
        </div>

        <div className='header-item'>
          <span className='dropdown item d-none d-sm-block'>
            <span
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <iconify-icon
                className='icon-navb'
                icon='bx:layout'
              ></iconify-icon>
              &nbsp;Themes
              <iconify-icon
                className='icon-navb'
                icon='feather:chevron-down'
              ></iconify-icon>
            </span>

            <div className='Submenu dropdown-menu nanoDropDownMenu w3-container w3-animate-left'>
              <span className='dr-down'>
                <iconify-icon icon='ei:chevron-right'></iconify-icon>
                Auto
              </span>
              <span
                id='darkMode'
                onClick={handeChangeDarkModeTheme}
                className='dr-down'>
                <iconify-icon icon='ei:chevron-right'></iconify-icon>Dark mode
              </span>
              <span
                onClick={handeChangeLightModeTheme}
                className='dr-down'>
                <iconify-icon icon='ei:chevron-right'></iconify-icon>Light mode
              </span>
            </div>
          </span>
        </div>

        <div className='header-item'>
          <span className='dropdown item'>
            <span
              data-bs-toggle='dropdown'
              aria-expanded='false'
            >
              <iconify-icon
                className='icon-navb'
                icon='feather:info'
              ></iconify-icon>
              <span>&nbsp;About</span>
              <iconify-icon
                className='icon-navb'
                icon='feather:chevron-down'
              ></iconify-icon>
            </span>
            <div className='Submenu dropdown-menu nanoDropDownMenu w3-container w3-animate-left'>

              <span className='dr-down'>
                <ModalHeaderAbout props={Disclaimer} />
              </span>

              <span className='dr-down'>
                <ModalHeaderAbout props={About} />
              </span>
            </div>
          </span>
        </div>
      </header>
    );
  };
  return <>{STORE.form.show && !STORE.form.showMobile && <HeaderPage />}</>;
}
export default Header;
