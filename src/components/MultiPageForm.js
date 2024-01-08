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
            needAccommodation: false,
            needAccommodationFor: 0,
            identifier: user.code,
            members: Object.fromEntries(user.members.map(member => [
                        member.name,
                        {
                            willAttend: true,
                            allergies: {
                                hasSpecialNeeds: false,
                                text: ""
                            },
                        }
                    ]
                )
            ),
            plus: Object.fromEntries(user.members.filter(member => member.plusEligible).map(member => [
                        member.name, {
                            plus: false,
                            name: "",
                            allergy: "",
                        }
                    ]
                )
            ),
        }
    );
    const questions = [
        "Részt veszel az eseményen?",
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
        if (currentPage === 2 && !plusEligibleInFamily()) {
            setCurrentPage(4);
        } else {
            setCurrentPage(currentPage + 1);
        }
    };

    function plusEligibleInFamily() {
        for (let member of user.members) {
            if (member.plusEligible && resp.members[member.name].willAttend === true) {
                return true;
            }
        }
        return false
    }

// Function to handle going back to the previous page
    const handlePrevPage = () => {
        if (currentPage === 4 && !plusEligibleInFamily()) {
            setCurrentPage(2)
        } else {
            setCurrentPage(currentPage - 1);
        }
    };

    // Function to validate form data for the current page
    const isPageValid = () => {
        console.log(resp)
        if (currentPage === 1) {
            return true
        }
        if(currentPage === 2) {
            for (let member of user.members) {
                if(resp.members[member.name].allergies.hasSpecialNeeds && resp.members[member.name].allergies.text === "") {
                    return false;
                }
            }
        }
        if(currentPage === 3) {
            for (let member in resp.plus) {
                if(resp.plus[member].plus && resp.plus[member].name === "") {
                    return false;
                }
            }
        }
        return true;
    };


    function isPrevChecked(name) {
        return resp.members[name].allergies.hasSpecialNeeds;
    }

    function isPlusChecked(name) {
        return resp.plus[name].plus;
    }

    function calculateMaxAccommodation() {
        let eligible = 0;
        for(let member in resp.members) {
            if (resp.members[member].willAttend) {
                eligible++;
            }
        }
        for(let member in resp.plus) {
            console.log(member)
            if (resp.plus[member].plus) {
                eligible++;
            }
        }
        console.log("[MAX_ACC] " + eligible);
        return eligible
    }

    return (
        <Form className={"font-oswald form-parent"}>
            <h4 className={"h4 font-2vh variwidth"}>{questions[currentPage - 1]}</h4>
            <Container className={"form-overflow"} id={"form-container"}>
                {/*Attendance*/}
                {currentPage === 1 ?
                    <>
                        {user.members.map(guest => (
                            <Form.Group className={"h5 font-2vh"} controlId={guest.name}>
                                <Container className={"d-grid d-block"}>
                                    <Col className={"d-flex align-content-center align-items-center"}>
                                        {guest.name}:
                                    </Col>
                                    <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                        Nem
                                        <Form.Switch
                                            checked={resp.members[guest.name].willAttend}
                                            onChange={(e) => {
                                                setResp((prevResp) => {
                                                    const updatedMembers = {...prevResp.members};
                                                    if (!updatedMembers[guest.name]) {
                                                        updatedMembers[guest.name] = {};
                                                    }
                                                    updatedMembers[guest.name].willAttend = e.target.checked;
                                                    return {...prevResp, members: updatedMembers};
                                                });
                                            }}
                                        />
                                        Igen
                                    </Col>
                                </Container>
                            </Form.Group>
                        ))}
                    </> : <></>
                }
                {/*Allergies*/}
                {currentPage === 2 ?
                    <>
                        {user.members.map(guest => (
                            resp.members[guest.name].willAttend ?
                            <Form.Group className={"h5 font-2vh"} controlId={guest.name}>
                                <Container className={"d-grid d-block"}>
                                    <Col className={"d-flex align-content-center align-items-center"}>
                                        {guest.name}:
                                    </Col>
                                    <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                        Nem
                                        <Form.Switch
                                            checked={resp.members[guest.name].allergies.hasSpecialNeeds}
                                            disabled={!resp.members[guest.name].willAttend}
                                            onChange={(e) => {
                                                setResp((prevResp) => {
                                                    const updatedMembers = {...prevResp.members};
                                                    updatedMembers[guest.name].allergies.hasSpecialNeeds = e.target.checked;
                                                    console.log(updatedMembers)
                                                    return {...prevResp, members: updatedMembers};
                                                });
                                            }}
                                        />
                                        Igen
                                    </Col>
                                    <Col ref={formRef}
                                         className={"d-flex text-center align-content-center align-items-center"}>
                                        {
                                            isPrevChecked(guest.name)
                                                ? <input className="form-control font-1_5vh"
                                                         id={guest.name + "-allergies"}
                                                         type="text"
                                                         placeholder={"pl. tej, húsmentes..."}
                                                         value={resp.members[guest.name].allergies.text}
                                                         onChange={(e) => {
                                                             setResp((prevResp) => {
                                                                 const updatedMembers = {...prevResp.members};
                                                                 updatedMembers[guest.name].allergies.text = e.target.value;
                                                                 return {...prevResp, members: updatedMembers};
                                                             });
                                                         }}
                                                >
                                                </input>
                                                : <></>}

                                    </Col>
                                </Container>
                            </Form.Group> : <></>
                        ))}
                    </> : <></>
                }
                {/*Plus*/}
                {currentPage === 3 && (
                    <>
                        {user.members.map(guest => (
                            guest.plusEligible && resp.members[guest.name].willAttend === true ?
                                <Form.Group className={"h4 font-2vh"} controlId={guest.name + "-plus"}>
                                    <Col className={"d-flex align-content-center align-items-center"}>
                                        {guest.name}:
                                    </Col>
                                    <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                        Nem
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
                                        Igen
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
                {/*Accommodation*/}
                {currentPage === 4 && (
                    <>
                        <Form.Group
                            className={"h4 font-2vh"}
                            controlId={user.name + "-accommodation"}>
                            <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                Nem
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
                                Igen
                            </Col>
                            {
                                resp.needAccommodation
                                    ?
                                    <>
                                        <Container>
                                            Hány főre szeretnétek szállást?
                                        </Container>
                                        <input className="form-control font-2vh"
                                               id={user.name + "-numOfAccommodations"}
                                               type="number"
                                               value={resp.needAccommodationFor}
                                               placeholder={0}
                                               min={0}
                                               max={calculateMaxAccommodation()}
                                               onChange={(e) => {
                                                   setResp((prevResp) => {
                                                       let value = parseInt(e.target.value)
                                                       if(value > calculateMaxAccommodation()) {
                                                           value = calculateMaxAccommodation()
                                                       }
                                                       return {
                                                           ...prevResp,
                                                           needAccommodationFor: value
                                                       };
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
            <Form.Group className={"pt-3 h-25 d-flex flex-column align-items-center"}>
                <ButtonGroup className={""}>
                    {/* Navigation buttons */}
                    <Button
                            className={"formButtonSmall font-1_5vh"}
                            variant="outline-dark"
                            disabled={currentPage === 1}
                            onClick={handlePrevPage}>
                            <FontAwesomeIcon icon={icon({name: 'arrow-left'})}/> Előző
                    </Button>
                    {currentPage !== 4
                        ? <Button
                            variant="outline-dark"
                            className={"formButtonSmall font-1_5vh"}
                            onClick={handleNextPage}
                            disabled={!isPageValid()}>
                            Következő <FontAwesomeIcon icon={icon({name: 'arrow-right'})}/>
                        </Button>
                        : <></>
                    }
                    {currentPage === 4
                        ? <Button
                            variant="outline-success"
                            className={"formButtonSmall font-1_5vh"}
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

