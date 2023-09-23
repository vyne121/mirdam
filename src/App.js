// App.js
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideMenu from "./components/SideMenu";
import MainPage from "./components/MainPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MusicRequestPage from "./components/MusicRequestPage";
import PhotoSendPage from "./components/PhotoSendPage";

function App() {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <Router>
                <Routes>
                    <Route path="/musicRequest" element={<MusicRequestPage/>}/>
                    <Route path="/photoSend" element={<PhotoSendPage/>}/>
                    <Route path="/" element={ <MainPage/>}/>
                </Routes>
                <SideMenu/>
            </Router>
        </>
    )

}

export default App;
