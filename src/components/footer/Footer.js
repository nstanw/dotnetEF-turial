import React from "react";
import "./style.css"

function Footer() {
    return (
        <>
            <div id="footerKeeper" className="d-none d-sm-block"></div>
            <footer id="footdog" className="textAlignCenter d-none d-sm-block">
                <a >&copy;</a> SMTPer v0.410 (2010 - 2022), Online SMTP test tool to send and check your email server
            </footer>
        </>
    );
}

export default Footer;