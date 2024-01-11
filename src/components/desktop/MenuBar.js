import {Container, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro'
import {useState} from "react";

const MenuBar = () => {
    let [expanded, setExpanded] = useState(false);

    function toggleMenu() {
        setExpanded(!expanded)
    }

    let menuItems = [
        {
            "name": "Főoldal",
            "link": "",
            "icon": <FontAwesomeIcon icon={icon({name: 'home'})}/>,
            "loggedInOnly": false,
        },
        {
            "name": "Zene küldés",
            "link": "musicRequest",
            "icon": <FontAwesomeIcon icon={icon({name: 'music'})}/>,
            "loggedInOnly": true,
        },
        {
            "name": "Kép küldés",
            "link": "sendImage",
            "icon": <FontAwesomeIcon icon={icon({name: 'camera'})}/>,
            "loggedInOnly": true,
        },
        {
            "name": "Visszajelzés",
            "link": "feedback",
            "icon": <FontAwesomeIcon icon={icon({name: 'mail-reply'})}/>,
            "loggedInOnly": false,
        }
    ]
    return (
        <Navbar expanded={expanded} expand="sm"
                className="shadow-lg customNavbarColour border-bottom border-black font-oswald border-bottom font-2vh">
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    onClick={toggleMenu}
                    className={"border-0"}
                />
            <NavbarBrand className={"font-fancy navbar-brand nav-spacing-brand font-3_5vh"}>
                Miri és Ádám
            </NavbarBrand>
            <Navbar.Collapse id="navbar-nav">
                <Nav className="nav-spacing">
                    {menuItems.map(item => (
                        <Nav.Link
                            className={"border-end border-black"}
                            href={"/" + item.link}
                            disabled={item.loggedInOnly ? !sessionStorage.getItem("uID") : false}
                            key={item.name}>
                            {item.icon} {item.name}
                        </Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MenuBar;