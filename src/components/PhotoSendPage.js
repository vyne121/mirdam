import React, {useEffect, useState} from "react";
import {Button, Container, Form} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {motion} from "framer-motion";

const PhotoSendPage = () => {
    const [error, setError] = useState("");

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
                msg:
                    "A manóba! A link valamiért elromlott. Szólj nekünk és megpróbáljuk megoldani a problémát!",
                type: "error",
                icon: <FontAwesomeIcon icon={icon({name: "sad-tear"})}/>,
            });
            setTimeout(() => {
                setError(null);
            }, 3000);
            console.error("OneDrive link is invalid");
            return;
        }
        window.open(url, "_blank");
    }

    return (
        <>
            <motion.Container
                fluid
                className={
                    "customBackgroundColour2 patternBack2 d-flex flex-column justify-content-center align-items-center"
                }
                style={{height: "100vh"}}
                initial={{x: "100%", transition: {duration: 0.5}}}
                animate={{x: "0%", transition: {duration: 0.5}}}
                exit={{x: "100%", transition: {duration: 0.5}}}
            >
                <Container className={"pill-card2 w-50 h-75 shadow-lg"}>
                    <Container className={"container pt-3"}>
                        <h1 className={"text-white text-outline-inverse font-oswald"}>
                            Küldjetek képeket velünk/rólunk, amikhez szép emlékeitek
                            fűződnek!
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
                                    fluid={"xl"}
                                    className={
                                        "d-flex flex-column justify-content-center align-content-center align-items-baseline"
                                    }
                                >
                                    <Button
                                        className={"btn-lg btn-info pb-3 font-2vh"}
                                        onClick={navigateToUploadLink}
                                    >
                                        KÉP FELTÖLTÉS
                                    </Button>
                                    {error ? (
                                        <Container className={"text-info"} id={"errorContainer"}>
                                            <h3
                                                className={
                                                    error.type === "error"
                                                        ? "h3 font-1_5vh text-outline text-light"
                                                        : "h3 font-1_5vh text-outline-inverse text-success"
                                                }
                                            >
                                                {error.msg}
                                                {error.icon}
                                            </h3>
                                        </Container>
                                    ) : (
                                        <></>
                                    )}
                                    <Form.Group controlId="formFileLg" className="mb-3"></Form.Group>
                                </Container>
                            </Form.Group>
                        </Container>
                    </Form>
                </Container>
            </motion.Container>
        </>
    );
};

export default PhotoSendPage;
