import {Button, Container, Form, FormControl, FormLabel} from "react-bootstrap";
import {useEffect, useState} from "react";
import MultiPageForm from "./MultiPageForm";
import {motion} from "framer-motion";


const FeedbackPage = () => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    function LoggedInView() {
        let user = valid_passes.find(entry => entry.code === sessionStorage.getItem("uID"));
        return (
            <Container>
                <h1 className={"text-outline-inverse h1 font-4vh p-3"}>Kedves {user.name}</h1>
                <Container className={"d-grid h-100"}>
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
            const foundEntry = valid_passes.find(entry => entry.code === identifierFieldValue.toLowerCase());
            if (foundEntry) {
                console.log("Valid pass: " + identifierFieldValue)
                sessionStorage.setItem("uID", identifierFieldValue.toLowerCase())
                window.location.reload()
            } else {
                console.log("INVALID")
                setErrorMessage("Ilyen kód nem létezik, kérlek próbáld újra! 🍆💦")
            }
        }

        return (
            <Container className={"p-3"}>
                <h1 className={"text-outline-inverse h1 p-3"}>Visszajelzés</h1>
                <Form className={"font-oswald p-3"}>
                    <FormLabel>
                        <h3 className={"h5"}>Úgy tűnik nem egy azonosító linken keresztül érkeztél az
                            oldalra.</h3>
                        <h3 className={"h5"}>Ahhoz, hogy vissza tudj jelezni, írd be a meghívón található
                            azonosítód:</h3>
                        {errorMessage ? <h5 className={"text-danger"}>
                                {errorMessage}</h5>
                            : ""}

                    </FormLabel>
                    <FormControl value={identifierFieldValue}
                                 onChange={(e) => setIdentifierFieldValue(e.target.value)}
                                 className={"form-control-lg text-sm-center"}
                                 id={"identifierField"}
                                 placeholder={"ABC123"}>
                    </FormControl>
                </Form>
                <Button type={"button"} className={"btn btn-secondary font-oswald"}
                        onClick={checkIdentifier}>Küldés</Button>
            </Container>
        );
    }

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
        }
    ]

    return <>
        <motion.div fluid
                    className={"customBackgroundColour2 patternBack3 d-flex flex-column justify-content-center align-items-center"}
                    style={{height: '100vh'}}
                    initial={{x: "100%", transition: {duration: 0.5}}}
                    animate={{x: "0%", transition: {duration: 0.5}}}
                    exit={{x: window.innerWidth, transition: {duration: 0.5}}}
        >
            <motion.Container
                className={"pill-card h-75 d-flex flex-column shadow-lg"}
                animate={{x: 100}}
                transition={{ease: "easeOut", duration: 1}}>
                {sessionStorage.getItem("uID")
                    ? LoggedInView()
                    : IdentifierView()}
            </motion.Container>
        </motion.div>
    </>

}

export default FeedbackPage;