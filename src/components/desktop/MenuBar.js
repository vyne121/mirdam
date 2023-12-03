import {Container, Nav, Navbar, NavbarBrand} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {icon} from '@fortawesome/fontawesome-svg-core/import.macro'

const MenuBar = () => {
    let menuItems = [
        {
            "name": "Főoldal",
            "link": "",
            "icon": <FontAwesomeIcon icon={icon({name: 'home'})}/>
        },
        {
            "name": "Zene küldés",
            "link": "musicRequest",
            "icon": <FontAwesomeIcon icon={icon({name: 'music'})}/>
        },
        {
            "name": "Kép küldés",
            "link": "sendImage",
            "icon": <FontAwesomeIcon icon={icon({name: 'camera'})}/>
        },
        {
            "name": "Visszajelzés",
            "link": "feedback",
            "icon": <FontAwesomeIcon icon={icon({name: 'mail-reply'})}/>
        }
    ]
    return (
        <Navbar expanded={true} expand="sm"
                className="shadow-lg customNavbarColour border-black font-oswald border-bottom font-2vh">
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="navbar-nav">
                <NavbarBrand className={"font-fancy navbar-brand nav-spacing-brand font-2vh"}>
                    Miri és Ádám
                </NavbarBrand>
                <Nav className="nav-spacing">
                    {menuItems.map(item => (
                        <Nav.Link className={""} href={"/" + item.link} key={item.name}>
                            {item.icon} {item.name}
                        </Nav.Link>
                    ))}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default MenuBar;