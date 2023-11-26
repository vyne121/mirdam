import {Button, ButtonGroup, Container, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useState} from "react";

const MusicRequestPage = () => {
    const [textareaValue, setTextareaValue] = useState('');
    return (
        <>
        <Container fluid className={"customBackgroundColour patternBack d-flex flex-column justify-content-center align-items-center"} style={{ height: '100vh' }}>
            <Container className={"pill-card shadow-lg"}>
                <Container className={"container pt-3"}>
                    <h1 className={"h1 text-white text-outline-inverse font-oswald text-center"}>
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
                                <h7 className={"text-white text-outline-inverse font-oswald "}>
                                    (Több dal is megadható egyszerre)
                                </h7>
                            </Form.Label>
                            <Form.Control id={"songLink"} value={textareaValue}
                                          onChange={(e) => setTextareaValue(e.target.value)} as="textarea" rows={6}/>
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
        </Container>
        </>
    )
}

export default MusicRequestPage;