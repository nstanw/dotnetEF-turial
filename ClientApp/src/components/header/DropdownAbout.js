import React, { useState } from 'react';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';


function DropdownAbout() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <span className="">
      <Dropdown isOpen={dropdownOpen} toggle={toggle} >
        <DropdownToggle >
          <span className="item fxNovak" >
            <iconify-icon className="icon-navb" icon="feather:info"></iconify-icon>
            &nbsp;About
            <iconify-icon className="icon-navb" icon="feather:chevron-down"></iconify-icon>
          </span>
        </DropdownToggle>
        <DropdownMenu >
          <DropdownItem >Header</DropdownItem>
          <DropdownItem>Some Action</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </span>
  );
}


export default DropdownAbout;