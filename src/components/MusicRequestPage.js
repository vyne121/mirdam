import {Button, ButtonGroup, Container, Form, Image, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import loading from "../images/load.gif"



const MusicRequestPage = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    function handleSubmitMusic(e) {
        setMessage("")
        e.preventDefault()
        setTextareaValue('')
        setDisplayLoad(true)
        setTimeout(() => {
            setDisplayLoad(false)
            setMessage("Köszönjük szépen az elküldött dalokat!")
        }, 1500);

    }

    const [textareaValue, setTextareaValue] = useState('');
    const [message, setMessage] = useState("")
    const [displayLoad, setDisplayLoad] = useState(false);
    return (
        <>
        <motion.Container
            fluid
            className={"customBackgroundColour patternBack d-flex flex-column justify-content-center align-items-center"}
            style={{ height: '100vh' }}
            initial={{x: "100%", transition: { duration: 0.5}}}
            animate={{x: "0%", transition: { duration: 0.5}}}
            exit={{x: "100%", transition: { duration: 0.5}}}
        >
            <Container className={"pill-card shadow-lg"}>
                <Container className={"container pt-3"}>
                    <h1 className={"h1 text-white text-outline-inverse font-oswald text-center"}>
                        Küldjetek zeneszámokat amikre szívesen buliznátok!
                    </h1>

                </Container>
                <Form className={"font-oswald"} onSubmit={handleSubmitMusic}>
                    <Container className={"pt-4"}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>
                                <h4>
                                    A dal előadója és címe:
                                </h4>
                                <h7 className={"text-white text-outline-inverse font-oswald "}>
                                    A dalok megadhatóak link formában is, de az is elég, ha a dal cimét és előadóját irjátok le. Több dal is megadható egyszerre, ebben az esetben kérünk ird külön sorba, vagy válaszd el vesszővel!
                                </h7>
                            </Form.Label>
                            <Form.Control id={"songLink"} value={textareaValue}
                                          onChange={(e) => setTextareaValue(e.target.value)} as="textarea" rows={6}/>
                        </Form.Group>
                        <ButtonGroup>
                            <Button disabled={!textareaValue}
                                    onClick={handleSubmitMusic}
                                    className={"customButtonColour border-black text-light"}>Küldés</Button>
                            <Button className={"customButtonColour border-black text-light"}>
                                <Link className={"text-decoration-none text-light"} to={"/"}>
                                    Vissza
                                </Link>
                            </Button>
                        {
                            message ?
                                <>
                                    <Container className={"h5"}>{message}</Container>
                            </>
                                : <>
                                </>
                        }
                            {
                                displayLoad ?
                                    <>
                                        <Image
                                            style={{height: '3vh', width: "3vw"}}
                                            src={loading}/>
                                    </>
                                    : <>
                                    </>
                            }
                        </ButtonGroup>
                    </Container>
                </Form>
            </Container>
        </motion.Container>
        </>
    )
}

export default MusicRequestPage;