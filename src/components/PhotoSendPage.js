import {Button, Image, ButtonGroup, Container, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {uploadData} from 'aws-amplify/storage';

const PhotoSendPage = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [imagePreviews, setImagePreviews] = useState([]);
    let [currSelected, setCurrentlySelected] = useState(0)
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    function navigateToUploadLink() {
        let url = sessionStorage.getItem("driveLink");
        if (!url) {
            setError({
                msg: "A manóba! A link valamiért elromlott. Szólj nekünk és megpróbáljuk megoldani a problémát!" ,
                type: "error",
                icon: <FontAwesomeIcon icon={icon({name: 'sad-tear'})}/>
            })
            setTimeout(() => {
                setError(null);
            }, 3000);
            console.error("OneDrive link is invalid")
            return;
        }
        window.open(url, '_blank');
    }

    const openLinkInNewTab = () => {
        try {
            window.open(sessionStorage.getItem("driveLink"), '_blank');
        } catch (error) {
            console.error("Error opening link:", error);
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        const button = document.getElementById('openLinkButton');
        button.addEventListener('click', openLinkInNewTab);
    });

    return (
        <>
            <motion.Container
                fluid
                className={"customBackgroundColour2 patternBack2 d-flex flex-column justify-content-center align-items-center"}
                style={{height: '100vh'}}
                initial={{x: "100%", transition: {duration: 0.5}}}
                animate={{x: "0%", transition: {duration: 0.5}}}
                exit={{x: "100%", transition: {duration: 0.5}}}
            >
                <Container className={"pill-card2 w-50 h-75 shadow-lg"}>
                    <Container className={"container pt-3"}>
                        <h1 className={"text-white text-outline-inverse font-oswald"}>
                            Küldjetek képeket velünk/rólunk, amikhez szép emlékeitek fűződnek!
                        </h1>
                    </Container>
                    <Form className={"font-oswald"}>
                        <Container className={"pt-4"}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>
                                    <Container className={"pb-3"}>
                                        <h5 className={"font-2_5vh"}>
                                            A küldött fotókból válogatva az esküvőn vetíteni fogunk
                                        </h5>
                                    </Container>
                                </Form.Label>
                                <Container
                                    flex
                                    id={"imagePreview"}
                                    className={"sideScrollContainer"}
                                >
                                    <Container className={"d-flex flex-row justify-content-center"}>
                                        {imagePreviews.map((preview, index) => (
                                            <Container
                                                key={index}
                                                style={{
                                                    width: '25%',
                                                    height: 'auto',
                                                    overflow: 'hidden',
                                                    margin: '1vh'
                                                }}
                                            >
                                                <Image
                                                    thumbnail
                                                    src={preview}
                                                    index={index}
                                                    alt={`Előnézet ${index + 1}`}
                                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                />
                                            </Container>

                                        ))}
                                    </Container>
                                </Container>
                                <Container fluid={"xl"}
                                           className={"d-flex flex-column justify-content-center align-content-center align-items-baseline"}>
                                    <Button className={"btn-lg btn-info pb-3 font-2vh"}
                                            onClick={navigateToUploadLink}
                                            id={"openLinkButton"}
                                    >
                                        KÉP FELTÖLTÉS
                                    </Button>
                                    {error ? <Container
                                            className={"text-info"}
                                            id={"errorContainer"}>
                                            <h3 className={error.type === "error" ? "h3 font-1_5vh text-outline text-light" : "h3 font-1_5vh text-outline-inverse text-success"}>
                                                {error.msg}
                                                {error.icon}
                                            </h3>
                                        </Container>
                                        : <></>}
                                    <Form.Group controlId="formFileLg" className="mb-3">
                                    </Form.Group>
                                </Container>

                            </Form.Group>
                        </Container>
                    </Form>
                </Container>
            </motion.Container>
        </>
    )
}

export default PhotoSendPage;
