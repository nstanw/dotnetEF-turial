import React from 'react';
import './StyleHeader.css';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from './../../features/formSlice';
import ModalHeaderAbout from './ModalHeaderAbout';

function Header() {
  const dispatch = useDispatch();
  const STORE = useSelector((state) => state);

  const props ={
    Disclaimer:{
      content: ''
    }
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
              <span className='dr-down'>
                <iconify-icon icon='ei:chevron-right'></iconify-icon>Dark mode
              </span>
              <span className='dr-down'>
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
             
             <ModalHeaderAbout/>
              <span className='dr-down'>
                <iconify-icon icon='lucide:alert-octagon'></iconify-icon>
                &nbsp; Disclaimer
              </span>
              <span className='dr-down'>
                <iconify-icon
                  className='icon-navb'
                  icon='feather:info'
                ></iconify-icon>
                &nbsp; About SMTPer
              </span>
            </div>
          </span>
        </div>
      </header>
    );
  };
  return <>{STORE.form.headerPC && <HeaderPage />}</>;
}
export default Header;
