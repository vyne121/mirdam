import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import MusicRequestPage from "./MusicRequestPage";
import PhotoSendPage from "./PhotoSendPage";
import FeedbackPage from "./FeedbackPage";
import MainPage from "./MainPage";
import RedirectPage from "./RedirectPage";
import {AnimatePresence} from "framer-motion";
import AdminView from "./AdminView";
import {Helmet} from "react-helmet";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
                <Routes location={location} key={location.pathname}>
                    <Route path="/musicRequest" element={<MusicRequestPage/>}/>
                    <Route path="/sendImage" element={<PhotoSendPage/>}/>
                    <Route path="/feedback" element={<FeedbackPage/>}/>
                    <Route path="/adminView" element={<AdminView/>}/>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/:identifier" element={<RedirectPage/>}/>
                </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;