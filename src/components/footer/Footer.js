import React from "react";
import { useSelector } from 'react-redux';

import "./style.css"

function Footer() {
    const STORE = useSelector(state => state)
    return (
        <>
            <div id="footerKeeper" className={`${STORE.form.isShowHeader ? null : "d-none d-sm-block"}`}></div>
            <footer id="footdog" className="textAlignCenter">
                <a >&copy;</a> SMTPer v0.410 (2010 - 2022), Online SMTP test tool to send and check your email server
            </footer>
        </>
    );
}

export default Footer;