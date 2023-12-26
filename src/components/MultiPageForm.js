import React, {useState} from 'react';
import {Button, ButtonGroup, Col, Container, Form} from 'react-bootstrap';
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';

const MultiPageForm = ({user}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [formRef, enableAnimations] = useAutoAnimate()
    const [resp, setResp] = useState({
        allergies: Object.fromEntries(
            user.members.map(member => [
                member.name,
                {
                    hasSpecialNeeds: false,
                    text: "",
                }
            ])
        ),
        plus: Object.fromEntries(
            user.members.filter(member => member.plusEligible).map(member => [
                member.name, {
                    plus: false,
                    name: "",
                    allergy: "",
                }
            ])
        ),
        needAccommodation: false,
        needAccommodationFor: 0,
        identifier: user.code
    });
    const questions = [
        "Van valamilyen különleges ételigényetek? (allergia, érzékenység, vagy diéta)",
        "Hozol plusz egy főt?",
        "Szeretnétek szállást kérni a helyszínen? (Az elérhetőségről és az árakról érdeklődjetek nálunk!)"
    ]

    const sendFeedback = async () => {
        try {

            // Make a POST request to the Flask /feedback endpoint
            const response = await axios.post('http://127.0.0.1:5000/feedback', resp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
        } catch (error) {
            console.error('Error sending feedback:', error);
        }
    }

    // Function to handle form submission
    const handleSubmit = () => {
        console.log('Form submitted:', resp);
        sendFeedback().then(r => console.log("SENT MESSAGE"))
        // Add logic to handle form submission, e.g., sending data to the server
    };

    // Function to handle going to the next page
    const handleNextPage = () => {
        let plusEligableInList = false;
        for (let member of user.members) {
            if (member.plusEligible) {
                plusEligableInList = true;
            }
        }
        if (currentPage === 1 && !plusEligableInList) {
            setCurrentPage(3);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    // Function to handle going back to the previous page
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Function to validate form data for the current page
    const isPageValid = () => {
        let valid = false;
        /*if(currentPage === 1) {
            for (let member of resp.allergies) {
                if(member.hasSpecialNeeds) {
                    return false;
                }
            }
        }*/
        return true;
    };


    function isPrevChecked(name) {
        return resp.allergies[name].hasSpecialNeeds;
    }

    function isPlusChecked(name) {
        return resp.plus[name].plus;
    }

    return (
        <Form className={"font-oswald form-parent"}>
            <h4 className={"h4 font-2_5vh variwidth"}>{questions[currentPage - 1]}</h4>
            <Container className={"form-overflow"} id={"form-container"}>
                {currentPage === 1 ?
                    <>
                        {user.members.map(guest => (
                            <Form.Group className={"h5 font-2_5vh"} controlId={guest.name}>
                                <Container className={"d-grid d-block"}>
                                    <Col className={"d-flex align-content-center align-items-center"}>
                                        {guest.name}:
                                    </Col>
                                    <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                        NEM
                                        <Form.Switch
                                            checked={resp.allergies[guest.name].hasSpecialNeeds}
                                            onChange={(e) => {
                                                setResp((prevResp) => {
                                                    const updatedAllergies = {...prevResp.allergies};
                                                    if (!updatedAllergies[guest.name]) {
                                                        updatedAllergies[guest.name] = {};
                                                    }
                                                    updatedAllergies[guest.name].hasSpecialNeeds = e.target.checked;
                                                    return {...prevResp, allergies: updatedAllergies};
                                                });
                                            }}
                                        />
                                        IGEN
                                    </Col>
                                    <Col ref={formRef}
                                         className={"d-flex text-center align-content-center align-items-center"}>
                                        {
                                            isPrevChecked(guest.name)
                                                ? <input className="form-control"
                                                         id={guest.name + "-allergies"}
                                                         type="text"
                                                         placeholder={"pl. tej, húsmentes..."}
                                                         value={resp.allergies[guest.name].text}
                                                         onChange={(e) => {
                                                             setResp((prevResp) => {
                                                                 const updatedAllergies = {...prevResp.allergies};
                                                                 updatedAllergies[guest.name].text = e.target.value;
                                                                 return {...prevResp, allergies: updatedAllergies};
                                                             });
                                                         }}
                                                >
                                                </input>
                                                : <></>}

                                    </Col>
                                </Container>
                            </Form.Group>
                        ))}
                    </> : <></>
                }
                {currentPage === 2 && (
                    <>
                        {user.members.map(guest => (
                            guest.plusEligible
                                ? <Form.Group className={"h4 font-2_5vh"} controlId={guest.name + "-plus"}>
                                    <Col className={"d-flex align-content-center align-items-center"}>
                                        {guest.name}:
                                    </Col>
                                    <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                        NEM
                                        <Form.Switch
                                            checked={resp.plus[guest.name].plus}
                                            onChange={(e) => {
                                                setResp((prevResp) => {
                                                    const updatedPlus = {...prevResp.plus};
                                                    if (!updatedPlus[guest.name]) {
                                                        updatedPlus[guest.name] = {};
                                                    }
                                                    updatedPlus[guest.name].plus = e.target.checked;
                                                    return {...prevResp, plus: updatedPlus};
                                                });
                                            }}
                                        />
                                        IGEN
                                    </Col>
                                    <Col ref={formRef}
                                         className={"d-flex text-center align-content-center align-items-center"}>
                                        {
                                            isPlusChecked(guest.name)
                                                ? <>
                                                    <Container>Mi a neve?</Container>
                                                    <input className="form-control"
                                                           id={guest.name + "-plus-name"}
                                                           type="text"
                                                           value={resp.plus[guest.name].name}
                                                           onChange={(e) => {
                                                               setResp((prevResp) => {
                                                                   const updatedPlus = {...prevResp.plus};
                                                                   updatedPlus[guest.name].name = e.target.value;
                                                                   return {...prevResp, plus: updatedPlus};
                                                               });
                                                           }}
                                                    >
                                                    </input>
                                                </>
                                                : <></>}

                                    </Col>
                                    <Col ref={formRef}
                                         className={"d-flex text-center align-content-center align-items-center"}>
                                        {
                                            isPlusChecked(guest.name)
                                                ? <>
                                                    <Container>Van valamilyen érzékenysége vagy speciális
                                                        ételigénye?</Container>
                                                    <input className="form-control"
                                                           id={guest.name + "-plus-allergy"}
                                                           type="text"
                                                           value={resp.plus[guest.name].allergy}
                                                           onChange={(e) => {
                                                               setResp((prevResp) => {
                                                                   const updatedPlus = {...prevResp.plus};
                                                                   updatedPlus[guest.name].allergy = e.target.value;
                                                                   return {...prevResp, plus: updatedPlus};
                                                               });
                                                           }}
                                                    >
                                                    </input>
                                                </>

                                                : <></>}

                                    </Col>
                                </Form.Group>
                                : <></>
                        ))
                        }
                    </>
                )}
                {currentPage === 3 && (
                    <>
                        <Form.Group
                            className={"h4 font-2_5vh"}
                            controlId={user.name + "-accommodation"}>
                            <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                NEM
                                <Form.Switch
                                    checked={resp.needAccommodation}
                                    onChange={(e) => {
                                        setResp((prevResp) => {
                                            // Toggle the needAccommodation value based on the current state
                                            return {
                                                ...prevResp,
                                                needAccommodation: !prevResp.needAccommodation
                                            };
                                        });
                                    }}
                                />
                                IGEN
                            </Col>
                            {
                                resp.needAccommodation
                                    ?
                                    <>
                                        <Container>
                                            Hány főre szeretnétek szállást?
                                        </Container>
                                        <input className="form-control"
                                               id={user.name + "-numOfAccommodations"}
                                               type="number"
                                               value={resp.needAccommodationFor}
                                               placeholder={0}
                                               min={0}
                                               onChange={(e) => {
                                                       setResp((prevResp) => {
                                                           return {...prevResp, needAccommodationFor: parseInt(e.target.value)};
                                                       });
                                               }}
                                        >
                                        </input>
                                    </>
                                    : <></>
                            }
                        </Form.Group>
                    </>
                )}
            </Container>
            <Form.Group className={"pt-3 h-25"}>
                <ButtonGroup>
                    {/* Navigation buttons */}
                    {currentPage !== 1
                        ? <Button
                            className={"formButtonSmall font-2vh"}
                            variant="primary"
                            onClick={handlePrevPage}>
                            <FontAwesomeIcon icon={icon({name: 'arrow-left'})}/> Előző
                        </Button>
                        : <></>
                    }
                    {currentPage !== 3
                        ? <Button
                            variant="primary"
                            className={"formButtonSmall font-2vh"}
                            onClick={handleNextPage}
                            disabled={!isPageValid()}>
                            Következő <FontAwesomeIcon icon={icon({name: 'arrow-right'})}/>
                        </Button>
                        : <></>
                    }
                    {currentPage === 3
                        ? <Button
                            variant="primary"
                            className={"formButtonSmall font-2vh"}
                            onClick={handleSubmit}
                            disabled={!isPageValid()}>
                            Küldés <FontAwesomeIcon icon={icon({name: 'mail-reply'})}/>
                        </Button>
                        : <></>
                    }
                </ButtonGroup>
            </Form.Group>
        </Form>
    );
};

export default MultiPageForm;

