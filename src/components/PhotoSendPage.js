import {Button, ButtonGroup, Container, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";

const PhotoSendPage = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);
    const [textareaValue, setTextareaValue] = useState('');
    return (
        <>
            <motion.Container
                fluid
                className={"customBackgroundColour2 patternBack2 d-flex flex-column justify-content-center align-items-center"}
                style={{ height: '100vh' }}
                initial={{x: "100%", transition: { duration: 0.5}}}
                animate={{x: "0%", transition: { duration: 0.5}}}
                exit={{x: "100%", transition: { duration: 0.5}}}
            >
                <Container className={"pill-card2 shadow-lg"}>
                    <Container className={"container pt-3"}>
                        <h1 className={"text-white text-outline-inverse font-oswald"}>
                            Küldjetek zeneszámokat amikre szívesen buliznátok!
                        </h1>
                    </Container>
                    <Form className={"font-oswald"}>
                        <Container className={"pt-4"}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>
                                    <h4>
                                        A dal előadója és címe:
                                    </h4>
                                </Form.Label>
                                <Form.Control id={"songLink"} value={textareaValue}
                                              onChange={(e) => setTextareaValue(e.target.value)} as="textarea" rows={4}/>
                            </Form.Group>
                            <ButtonGroup>
                                <Button disabled={!textareaValue}
                                        className={"customButtonColour border-black text-light"}>Küldés</Button>
                                <Button className={"customButtonColour border-black text-light"}>
                                    <Link className={"text-decoration-none text-light"} to={"/"}>
                                        Vissza
                                    </Link>
                                </Button>
                            </ButtonGroup>
                        </Container>
                    </Form>
                </Container>
            </motion.Container>
        </>
    )
}

export default PhotoSendPage;