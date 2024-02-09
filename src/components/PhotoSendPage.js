import {Button, Image, ButtonGroup, Container, Form, Modal} from "react-bootstrap";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { uploadData } from 'aws-amplify/storage';

const PhotoSendPage = () => {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState("");
    const [imagePreviews, setImagePreviews] = useState([]);
    const [showModal, setShowModal] = useState(false);
    let [currSelected, setCurrentlySelected] = useState(3)
    const [selectedFile, setSelectedFile] = useState(null)

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    function handleFileChange(e) {
        const files = Array.from(e.target.files);
        setImagePreviews([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Create image preview
                setImagePreviews((prevPreviews) => [...prevPreviews, reader.result]);
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        });
        setFiles(e.target.files);
    }

    const handleFileUpload = async () => {
        if (files) {
            console.log("Uploading file...");

            const formData = new FormData();
            formData.append("file", files);

            try {
                const result = await uploadData({
                    key: files,
                    data: files
                }).result;
                console.log('Succeeded: ', result);
            } catch (error) {
                console.log('Error : ', error);
            }

            try {
                throw new Error
                // You can write the URL of your server or any other endpoint used for file upload
                const result = await fetch("https://httpbin.org/post", {
                    method: "POST",
                    body: formData,
                });

                const data = await result.json();

                console.log(data);
            } catch (error) {
                setError({
                    msg: "A manóba! Valami baj történt feltöltés közben!",
                    type: "error",
                    icon: <FontAwesomeIcon icon={icon({name: 'sad-tear'})}/>
                })
                setTimeout(() => {
                    setError(null);
                }, 5000);
                console.error(error);
            }
        }
    }

    function handlePictureClick(e) {
        console.log(e.target.getAttribute("index"))
        setCurrentlySelected(e.target.getAttribute("index"))
        setSelectedFile(imagePreviews[currSelected])
        setShowModal(true)
    }

    function handleModalClose() {
        setShowModal(false)
    }

    function handleModalLeft() {
        if(currSelected !== 0) {
            setCurrentlySelected(currSelected--)
            setSelectedFile(imagePreviews[currSelected])
        }
    }

    function handleModalRight() {
        if(currSelected !== imagePreviews.length) {
            setCurrentlySelected(currSelected++)
            setSelectedFile(imagePreviews[currSelected])
        }
    }

    return (
        <>
            <Modal className={"modalMax"} show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Kép előnézet</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"w-100"}>
                    {currSelected}/{imagePreviews.length}
                    {files.length > 1
                        ?
                        <Container>
                            <Button onClick={handleModalLeft} disabled={currSelected === 0}>
                                LEFT
                            </Button>
                        </Container>
                        : <></>}
                    <Container className={"flex-fill"}>
                        <Image
                            className={"flex-fill"}
                            thumbnail
                            src={selectedFile}
                            alt={`Preview`}
                            style={{width: '90%', height: '90%', objectFit: 'cover'}}>
                        </Image>
                    </Container>
                    {files.length > 1
                        ?
                        <Container>
                            <Button
                                onClick={handleModalRight}
                                disabled={currSelected === imagePreviews.length - 1}
                            >Right</Button>
                        </Container>
                        : <></>}
                    <Container>

                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary"
                            onClick={handleModalClose}
                    >
                        Bezár
                    </Button>
                </Modal.Footer>
            </Modal>
            <motion.Container
                fluid
                className={"customBackgroundColour2 patternBack2 d-flex flex-column justify-content-center align-items-center"}
                style={{height: '100vh'}}
                initial={{x: "100%", transition: {duration: 0.5}}}
                animate={{x: "0%", transition: {duration: 0.5}}}
                exit={{x: "100%", transition: {duration: 0.5}}}
            >
                <Container className={"pill-card2 shadow-lg"}>
                    <Container className={"container pt-3"}>
                        <h1 className={"text-white text-outline-inverse font-oswald"}>
                            Küldjetek képeket velünk/rólunk, amikhez szép emlékeitek fűződnek!
                        </h1>
                    </Container>
                    <Form className={"font-oswald"}>
                        <Container className={"pt-4"}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>
                                    <Container>
                                        <h5>
                                            A küldött fotókból válogatva az esküvőn vetíteni fogunk
                                        </h5>
                                    </Container>
                                    <Form.Group controlId="formFileLg" className="mb-3">
                                        <Form.Label>Képek feltöltése:</Form.Label>
                                        {error ? <Container
                                                className={"text-info"}
                                                id={"errorContainer"}>
                                                <h3 className={error.type === "error" ? "h3 font-1_5vh text-outline text-light" : "h3 font-1_5vh text-outline-inverse text-success"}>
                                                    {error.msg}
                                                    {error.icon}
                                                </h3>
                                            </Container>
                                            : <></>}
                                        <Form.Control
                                            onChange={handleFileChange}
                                            type="file"
                                            size="lg"
                                            accept={"image/*"}
                                            multiple
                                        />
                                    </Form.Group>
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
                                                    alt={`Preview ${index}`}
                                                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                                                    onClick={handlePictureClick}
                                                />
                                            </Container>

                                        ))}
                                    </Container>
                                </Container>

                            </Form.Group>
                            <ButtonGroup>
                                <Button
                                    disabled={!files}
                                    className={"customButtonColour border-black text-light"}
                                    onClick={handleFileUpload}
                                >
                                    Feltöltés
                                </Button>
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