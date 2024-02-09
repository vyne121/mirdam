import {Button, Container, Form, FormControl, FormLabel} from "react-bootstrap";
import {useEffect, useState} from "react";
import MultiPageForm from "./MultiPageForm";
import {motion} from "framer-motion";
import {validateUID} from "../funtions/AuthUtil";
import {post} from "aws-amplify/api";

const FeedbackPage = () => {
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
        const [userData, setUserData] = useState(null); // Initialize userData state with null
        useEffect(() => {
            const fetchData = async () => {
                try {
                    const restOperation = post({
                        apiName: 'family',
                        path: '/family',
                        options: {
                            body: {
                                "uid": sessionStorage.getItem("uID")
                            }
                        }
                    });
                    const {body} = await restOperation.response;
                    const response = await body.json();
                    setUserData(response)
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData(); // Call the async function

            // Clean-up function (optional)
            return () => {
                // Perform clean-up tasks if necessary
            };
        }, []);
        useEffect(() => {
            const currentId = sessionStorage.getItem("uID");
            const checkUIdEndpoint = "http://16.171.37.246:5000/family?uID=" + currentId;

            fetch(checkUIdEndpoint)
                .then(response => response.json())
                .then(data => {
                    if (data && data.result && data.result.length > 0) {
                        setUserData(data.result[0]); // Update userData state with fetched data
                    } else {
                        console.log("Invalid entry: " + currentId);
                        console.log("Ilyen kód nem létezik, kérlek próbáld újra! 🍆💦");
                    }
                })
                .catch(error => {
                    console.error("Error fetching data:", error);
                    console.log("Hálózati hiba");
                });
        }, []); // Empty dependency array ensures the effect runs only once on component mount

        if (!userData) {
            return <Container className={"align-content-center align-items-center p-3 h2 font-oswald"}>
                Betöltés...
            </Container>;
        }

        return (
            <Container className={"h-100"}>
                <h1 className={"text-outline-inverse h1 font-3_5vh pt-3"}>Kedves {userData.name}</h1>
                <Container className={"d-grid h-75"}>
                    <MultiPageForm user={userData} />
                </Container>
            </Container>
        );
    }

    function IdentifierView() {

        const [identifierFieldValue, setIdentifierFieldValue] = useState('');
        const [errorMessage, setErrorMessage] = useState('');

        async function checkIdentifier(event) {
            event.preventDefault()
            setErrorMessage("")
            console.log(identifierFieldValue)
            if (await validateUID(identifierFieldValue)) {
                console.log("Valid entry: " + identifierFieldValue);
                sessionStorage.setItem("uID", identifierFieldValue.toLowerCase());
                setCurrentId(identifierFieldValue.toLowerCase())
            } else {
                console.log("Invalid entry: " + identifierFieldValue);
                setErrorMessage("Ilyen kód nem létezik, kérlek próbáld újra! 👀")
            }
        }

        return (
            <Container className={"p-3"}>
                <h1 className={"text-outline-inverse h1 font-3_5vh pt-3"}>Visszajelzés</h1>
                <Container className={"h-100"} id={"formContentContainer"}>
                    <Form className={"font-oswald font-5vh p-3"} onSubmit={checkIdentifier}>
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
                            disabled={!identifierFieldValue}
                            onClick={checkIdentifier}>
                        Küldés
                    </Button>
                </Container>
            </Container>
        );
    }

    return <>
        {/*Background*/}
        <motion.Container fluid
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
        </motion.Container>
    </>

}

export default FeedbackPage;