// App.js
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideMenu from "./components/mobile/SideMenu";
import MainPage from "./components/MainPage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import MusicRequestPage from "./components/MusicRequestPage";
import PhotoSendPage from "./components/PhotoSendPage";
import MenuBar from "./components/desktop/MenuBar";
import RedirectPage from "./components/RedirectPage";
import FeedbackPage from "./components/FeedbackPage";

function App() {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    let isMobil = false;

    return (
        <>
            <Router>
                {isMobil ? <SideMenu/> : <MenuBar/>}
                <Routes>
                    <Route path="/musicRequest" element={<MusicRequestPage/>}/>
                    <Route path="/sendImage" element={<PhotoSendPage/>}/>
                    <Route path="/feedback" element={<FeedbackPage/>}/>
                    <Route path="/" element={ <MainPage/>}/>
                    <Route path="/:identifier" element={<RedirectPage/>}/>
                </Routes>
            </Router>
        </>
    )

}

export default App;
