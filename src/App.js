// App.js
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideMenu from "./components/mobile/SideMenu";
import {BrowserRouter as Router} from "react-router-dom";
import MenuBar from "./components/desktop/MenuBar";
import AnimatedRoutes from "./components/AnimatedRoutes";

function App() {

    let isMobil = false;

    return (
        <>
            <Router>
                {isMobil ? <SideMenu/> : <MenuBar/>}
                <AnimatedRoutes/>
            </Router>
        </>
    )

}

export default App;
