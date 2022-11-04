import React from "react";
import "./Style.css"
function Header() {
    return (
        <header className="d-none d-sm-block nanoMenu item">
            <span className="item on">
                <iconify-icon className="icon-navb" icon="akar-icons:grid"></iconify-icon>
                &nbsp;SMTPer
            </span>

            <span className="dropdown item">
                <div className="navb-sub">

                    <span data-bs-toggle="dropdown" aria-expanded="false">
                        <iconify-icon className="icon-navb" icon="lucide:feather"></iconify-icon>
                        &nbsp;More Apps
                        <iconify-icon className="icon-navb" icon="feather:chevron-down"></iconify-icon>
                    </span>
                    <div className="dropdown-menu nanoDropDownMenu w3-container w3-animate-left" >
                        <span className="dr-down">
                            <iconify-icon icon="octicon:zap-24"></iconify-icon>
                            PostMan</span>
                    </div>
                </div>
            </span>

            <span className="dropdown item">
                <span data-bs-toggle="dropdown" aria-expanded="false">
                    <iconify-icon className="icon-navb" icon="bx:layout" ></iconify-icon>
                    &nbsp;Themes
                    <iconify-icon className="icon-navb" icon="feather:chevron-down"></iconify-icon>
                </span>
                <div className="dropdown-menu nanoDropDownMenu w3-container w3-animate-left" >
                    <span className="dr-down">
                        <iconify-icon icon="ei:chevron-right"></iconify-icon>
                        Auto
                    </span>
                    <span className="dr-down">
                        <iconify-icon icon="ei:chevron-right"></iconify-icon>Dark mode
                    </span>
                    <span className="dr-down">
                        <iconify-icon icon="ei:chevron-right"></iconify-icon>Light mode
                    </span>
                </div>
            </span>

            <span className="dropdown item">
                <span data-bs-toggle="dropdown" aria-expanded="false">
                    <iconify-icon className="icon-navb" icon="feather:info"></iconify-icon>
                    <span>
                        &nbsp;About
                    </span>
                    <iconify-icon className="icon-navb" icon="feather:chevron-down"></iconify-icon>
                </span>
                <div className="dropdown-menu nanoDropDownMenu w3-container w3-animate-left" >
                    <span className="dr-down">
                        <iconify-icon icon="lucide:alert-octagon"></iconify-icon>
                        &nbsp; Disclaimer
                    </span>
                    <span className="dr-down">
                        <iconify-icon className="icon-navb" icon="feather:info"></iconify-icon>
                        &nbsp; About SMTPer
                    </span>
                </div>
            </span>
        </header>
    )
}
export default Header;