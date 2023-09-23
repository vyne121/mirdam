import {Button, Container} from "react-bootstrap";
import {useState} from "react";
import {Link} from "react-router-dom";

const SideMenu = () => {
    const [menuDisplayed, setMenuDisplayed] = useState(false);

    function handleShowClick() {
        setMenuDisplayed(!menuDisplayed);
    }

    return (
        <>
            {
                menuDisplayed
                    ? <>
                        <Container id={"sideMenu"}
                                   className={"bg-light bg-opacity-25 side-menu-container visible"}>
                            <Container className={"pt-3 h-100"}>
                                <Button
                                    className={"side-menu-button-shifted btn-light opacity-75 border-1 shadow-lg w-10 font-monospace mb-2 shadow-lg d-flex align-items-center justify-content-center"}
                                    onClick={handleShowClick}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         fill="currentColor"
                                         className="side-menu-button-icon bi bi-x-lg" viewBox="0 0 16 16">
                                        <path
                                            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                                    </svg>
                                </Button>
                                <Button
                                    onClick={handleShowClick}
                                    className={"btn-light opacity-75 border-1 shadow-lg border-black w-100 font-monospace mb-2"}>
                                    <Link
                                        className={"text-decoration-none text-black"}
                                        to="/musicRequest">
                                        Zene kérés
                                    </Link>
                                </Button>
                                <Button
                                    onClick={handleShowClick}
                                    className={"btn-light opacity-75 border-1 shadow-lg border-black w-100 font-monospace mb-2"}>
                                    <Link className={"text-decoration-none text-black"} to="/sendPhoto">Fotó küldés</Link>
                                </Button>
                                <Button
                                    className={"btn-light opacity-75 border-1 shadow-lg border-black w-100 font-monospace mb-2"}>
                                    Visszajelzés
                                </Button>
                            </Container>
                        </Container>
                    </>
                    : <>
                        <Button
                            className={"side-menu-button btn-light border-1 opacity-75 shadow-lg d-flex align-items-center justify-content-center"}
                            onClick={handleShowClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="black"
                                 className="bi bi-stack side-menu-button-icon" viewBox="0 0 16 16">
                                <path
                                    d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.598.598 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.598.598 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.598.598 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535L7.733.063z"/>
                                <path
                                    d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.598.598 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.659z"/>
                            </svg>
                        </Button>
                    </>
            }
        </>
    )
}

export default SideMenu;