import {Button, Container, Form, FormControl, FormLabel} from "react-bootstrap";
import {useEffect, useState} from "react";
import MultiPageForm from "./MultiPageForm";
import {motion} from "framer-motion";

const FeedbackPage = () => {
    let valid_passes = [
        {
            name: "Rezes család",
            members: [
                {
                    name: "Edit",
                    plusEligible: false
                },
                {
                    name: "János",
                    plusEligible: false
                },
                {
                    name: "Gábor",
                    plusEligible: true
                },
                {
                    name: "Niki",
                    plusEligible: true
                },
                {
                    name: "Martin",
                    plusEligible: true
                },
                {
                    name: "Klaudia",
                    plusEligible: true
                }, {
                    name: "Dia",
                    plusEligible: true
                },
                {
                    name: "Tomi",
                    plusEligible: true
                },
                {
                    name: "Mama",
                    plusEligible: true
                }
            ],
            code: "y",
        },
        {
            name: "Hinsenkamp család",
            members: [
                {
                    name: "Tamás",
                    plusEligible: false
                },
                {
                    name: "Kati",
                    plusEligible: false
                },
                {
                    name: "Adrián",
                    plusEligible: true
                }
            ],
            code: "x",
        },
        {
            name: "Test1",
            code: "ab3cd4",
            members: [
                {
                    name: "MEM1",
                    plusEligible: true
                },
                {
                    name: "MEM2",
                    plusEligible: true
                }
            ]
        },
        {
            name: "Test2",
            code: "ef5gh6",
            members: [
                { name: "MEM3", plusEligible: true },
                { name: "MEM4", plusEligible: true }
            ]
        },
        {
            name: "Test20",
            code: "yz1ab2",
            members: [
                { name: "MEM39", plusEligible: true },
                { name: "MEM40", plusEligible: true }
            ]
        },
        {
            name: "ÁDÁM ÉS MIRI",
            code: "mirito"
        }
    ]
    let [currentId, setCurrentId] = useState(sessionStorage.getItem("uID"));

    useEffect(() => {
        if (window.innerWidth > 768) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    function LoggedInView() {
        let user = valid_passes.find(entry => entry.code === sessionStorage.getItem("uID"));
        console.log("LOGGED IN VIEW")
        return (
            <Container className={"h-100"}>
                <h1 className={"text-outline-inverse h1 font-3_5vh pt-3"}>Kedves {user.name}</h1>
                <Container className={"d-grid h-75"}>
                    <MultiPageForm user={user}/>
                </Container>
            </Container>
        );
    }

    function IdentifierView() {

        const [identifierFieldValue, setIdentifierFieldValue] = useState('');
        const [errorMessage, setErrorMessage] = useState('');

        function checkIdentifier() {
            console.log(identifierFieldValue)
            setErrorMessage("")
            const foundEntry = valid_passes.find(
                entry => entry.code === identifierFieldValue.toLowerCase()
            );
            if (foundEntry) {
                console.log("Valid pass: " + identifierFieldValue)
                sessionStorage.setItem("uID", identifierFieldValue.toLowerCase())
                setCurrentId(identifierFieldValue.toLowerCase())
            } else {
                setErrorMessage("Ilyen kód nem létezik, kérlek próbáld újra! 🍆💦")
            }
        }

        return (
            <Container className={"p-3"}>
                <h1 className={"text-outline-inverse h1 font-3_5vh pt-3"}>Visszajelzés</h1>
                <Container className={"h-100"} id={"formContentContainer"}>
                    <Form className={"font-oswald font-5vh p-3"}>
                        <FormLabel>
                            <h3 className={"h5 font-2_5vh"}>Úgy tűnik nem egy azonosító linken keresztül érkeztél az
                                oldalra.</h3>
                            <h3 className={"h5 font-2_5vh"}>Ahhoz, hogy vissza tudj jelezni, írd be a meghívón található
                                azonosítód:</h3>
                            {errorMessage ? <h5 className={"text-danger font-2vh"}>
                                    {errorMessage}</h5>
                                : ""}

                        </FormLabel>
                        <FormControl value={identifierFieldValue}
                                     autoFocus={true}
                                     onChange={(e) => setIdentifierFieldValue(e.target.value)}
                                     className={"form-control-lg text-sm-center font-2vh"}
                                     id={"identifierField"}
                                     placeholder={"ABC123"}>
                        </FormControl>
                    </Form>
                </Container>
                <Container>
                    <Button type={"button"}
                            className={"btn btn-dark font-oswald font-2vh"}
                            onClick={checkIdentifier}>
                        Küldés
                    </Button>
                </Container>
            </Container>
        );
    }


    function validPass() {
        console.log("Checking pass: ")
        if (currentId === null) {
            console.log("NULL pass value")
            return false;
        }
        const foundEntry = valid_passes.find(
            entry => entry.code === currentId
        );
        if (foundEntry) {
            console.log("VALID pass entered")
            return true
        }
        console.log("INVALID pass entered")
        return false;
    }

    return <>
        {/*Background*/}
        <motion.div fluid
                    className={"customBackgroundColour2 patternBack3 d-flex justify-content-center align-items-center"}
                    style={{height: '100vh'}}
                    initial={{x: "100%", transition: {duration: 0.5}}}
                    animate={{x: "0%", transition: {duration: 0.5}}}
                    exit={{x: window.innerWidth, transition: {duration: 0.5}}}
        >
            {/*Container*/}
            <motion.Container
                className={"pill-card d-flex flex-column shadow-lg"}
                initial={{x: "100%"}}
                animate={{x: 0}}
                transition={{ease: "easeOut", duration: 1}}>
                {
                    currentId
                        ? <LoggedInView/>
                        : <IdentifierView/>
                }
            </motion.Container>
        </motion.div>
    </>

}

export default FeedbackPage;