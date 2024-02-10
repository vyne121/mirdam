import React, {useState} from 'react';
import {Button, ButtonGroup, Col, Container, Form} from 'react-bootstrap';
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {icon} from "@fortawesome/fontawesome-svg-core/import.macro";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import {post} from "aws-amplify/api";

const MultiPageForm = ({user}) => {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [successMessage, setSuccessMessage] = useState('');
    const [formRef, enableAnimations] = useAutoAnimate()
    const [resp, setResp] = useState({
            needAccommodation: user.needAccommodation > 0,
            needAccommodationFor: user.accommodation,
            code: user.code,
            members: Object.fromEntries(user.members.split(',').map(member => [
                        member,
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
            plus: Object.fromEntries(user.members.split(',').filter(member => user.plusEligible.includes(member)).map(member => [
                        member, {
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
        console.log(resp)
        try {
            const restOperation = post({
                apiName: 'family',
                path: '/feedback',
                options: {
                    body: resp
                }
            });
            const {body} = await restOperation.response;
            const response = await body.json();
            if (response.includes("SUCCESS")) {
                setSuccessMessage('Köszönjük a visszajelzést!');
                setTimeout(() => {
                    setSuccessMessage('');
                    navigate("/");
                }, 10000);
            } else {
                throw new Error('Failed to fetch data: ');
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        try {

            // Make a POST request to the Flask /feedback endpoint
            const response = await axios.post('http://16.171.37.246:5000/feedback', resp, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data);
            setSuccessMessage('Köszönjük a visszajelzést!');
            setTimeout(() => {
                setSuccessMessage('');
                navigate("/");
            }, 5000);
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
        for (let member of user.members.split(',')) {
            if (user.plusEligible.includes(member) && resp.members[member].willAttend === true) {
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
        if (currentPage === 1) {
            return true
        }
        if (currentPage === 2) {
            for (let member of user.members.split(',')) {
                if (resp.members[member].allergies.hasSpecialNeeds && resp.members[member].allergies.text === "") {
                    return false;
                }
            }
        }
        if (currentPage === 3) {
            for (let member in resp.plus) {
                if (resp.plus[member].plus && resp.plus[member].name === "") {
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
        for (let member in resp.members) {
            if (resp.members[member].willAttend) {
                eligible++;
            }
        }
        for (let member in resp.plus) {
            if (resp.plus[member].plus) {
                eligible++;
            }
        }
        console.log("[MAX_ACC] " + eligible);
        return eligible
    }

    return (
        <Form className={"font-oswald form-parent"}>
                {/*Attendance*/}
                {successMessage ?
                    <>
                        <Container classname={"w-100 justify-content-center align-items-center pt-3"}>
                            <Container>
                                <h2 className={"text-center align-content-center font-4vh"}>
                                    {successMessage}
                                </h2>
                                <Container className={"text-center align-content-center font-2_5vh"}>
                                    Ha van kedvetek küldjetek nekünk képeket és zenéket a megfelelő menük segitségével!
                                </Container>
                                <Container className={"text-center align-content-center font-2_5vh pt-3"}>
                                    Az éjféli menyasszonytáncra egy-egy sorsjeggyel készüljetek! 💃🕺🏼
                                </Container>
                            </Container>
                        </Container>
                    </>
                    :
                    <>
                        <h4 className={"h4 font-2vh variwidth"}>{questions[currentPage - 1]}</h4>
                    <Container className={"form-overflow"} id={"form-container"}>
                        {currentPage === 1 ?
                            <>
                                {user.members.split(',').map(guest => (
                                    <Form.Group className={"h5 font-2vh"} controlId={guest}>
                                        <Container className={"d-grid d-block"}>
                                            <Col className={"d-flex align-content-center align-items-center"}>
                                                {guest}:
                                            </Col>
                                            <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                                Nem
                                                <Form.Switch
                                                    checked={resp.members[guest].willAttend}
                                                    onChange={(e) => {
                                                        setResp((prevResp) => {
                                                            const updatedMembers = {...prevResp.members};
                                                            if (!updatedMembers[guest]) {
                                                                updatedMembers[guest] = {};
                                                            }
                                                            updatedMembers[guest].willAttend = e.target.checked;
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
                                {user.members.split(',').map(guest => (
                                    resp.members[guest].willAttend ?
                                        <Form.Group className={"h5 font-2vh"} controlId={guest}>
                                            <Container className={"d-grid d-block"}>
                                                <Col className={"d-flex align-content-center align-items-center"}>
                                                    {guest}:
                                                </Col>
                                                <Col
                                                    className={"d-flex text-center align-content-center align-items-center p-2"}>
                                                    Nem
                                                    <Form.Switch
                                                        checked={resp.members[guest].allergies.hasSpecialNeeds}
                                                        disabled={!resp.members[guest].willAttend}
                                                        onChange={(e) => {
                                                            setResp((prevResp) => {
                                                                const updatedMembers = {...prevResp.members};
                                                                updatedMembers[guest].allergies.hasSpecialNeeds = e.target.checked;
                                                                return {...prevResp, members: updatedMembers};
                                                            });
                                                        }}
                                                    />
                                                    Igen
                                                </Col>
                                                <Col ref={formRef}
                                                     className={"d-flex text-center align-content-center align-items-center"}>
                                                    {
                                                        isPrevChecked(guest)
                                                            ? <input className="form-control font-1_5vh"
                                                                     id={guest + "-allergies"}
                                                                     type="text"
                                                                     placeholder={"pl. tej, húsmentes..."}
                                                                     value={resp.members[guest].allergies.text}
                                                                     onChange={(e) => {
                                                                         setResp((prevResp) => {
                                                                             const updatedMembers = {...prevResp.members};
                                                                             updatedMembers[guest].allergies.text = e.target.value;
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
                                {user.members.split(',').map(guest => (
                                    user.plusEligible.includes(guest) && resp.members[guest].willAttend === true ?
                                        <Form.Group className={"h4 font-2vh"} controlId={guest.name + "-plus"}>
                                            <Col className={"d-flex align-content-center align-items-center"}>
                                                {guest}:
                                            </Col>
                                            <Col className={"d-flex text-center align-content-center align-items-center p-2"}>
                                                Nem
                                                <Form.Switch
                                                    checked={resp.plus[guest].plus}
                                                    onChange={(e) => {
                                                        setResp((prevResp) => {
                                                            const updatedPlus = {...prevResp.plus};
                                                            if (!updatedPlus[guest]) {
                                                                updatedPlus[guest] = {};
                                                            }
                                                            updatedPlus[guest].plus = e.target.checked;
                                                            return {...prevResp, plus: updatedPlus};
                                                        });
                                                    }}
                                                />
                                                Igen
                                            </Col>
                                            <Col ref={formRef}
                                                 className={"d-flex text-center align-content-center align-items-center"}>
                                                {
                                                    isPlusChecked(guest)
                                                        ? <>
                                                            <Container>Mi a neve?</Container>
                                                            <input className="form-control"
                                                                   id={guest + "-plus-name"}
                                                                   type="text"
                                                                   value={resp.plus[guest].name}
                                                                   onChange={(e) => {
                                                                       setResp((prevResp) => {
                                                                           const updatedPlus = {...prevResp.plus};
                                                                           updatedPlus[guest].name = e.target.value;
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
                                                    isPlusChecked(guest)
                                                        ? <>
                                                            <Container>Van valamilyen érzékenysége vagy speciális
                                                                ételigénye?</Container>
                                                            <input className="form-control"
                                                                   id={guest + "-plus-allergy"}
                                                                   type="text"
                                                                   value={resp.plus[guest].allergy}
                                                                   onChange={(e) => {
                                                                       setResp((prevResp) => {
                                                                           const updatedPlus = {...prevResp.plus};
                                                                           updatedPlus[guest].allergy = e.target.value;
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
                                                               if (value > calculateMaxAccommodation()) {
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
                                    ? <>
                                        <Button
                                            variant="outline-success"
                                            className={"formButtonSmall font-1_5vh"}
                                            onClick={handleSubmit}
                                            disabled={!isPageValid()}>
                                            Küldés <FontAwesomeIcon icon={icon({name: 'mail-reply'})}/>
                                        </Button>
                                    </>
                                    : <></>
                                }
                            </ButtonGroup>
                        </Form.Group>
                    </>
                }
        </Form>
    );
};

export default MultiPageForm;

