import {Button, Container, Form, FormControl, FormLabel} from "react-bootstrap";
import {useState} from "react";
import MultiPageForm from "./MultiPageForm";


const FeedbackPage = () => {
    function LoggedInView() {
        let user = valid_passes.find(entry => entry.code === sessionStorage.getItem("uID"));
        return (
            <>
                <Container fluid
                           className={"customBackgroundColour2 patternBack3 d-flex flex-column justify-content-center align-items-center"}
                           style={{height: '100vh'}}>
                    <Container
                        className={"pill-card d-flex flex-column shadow-lg align-items-center align-content-center"}>
                        <h1 className={"text-outline-inverse h1 p-3"}>Kedves {user.name}!</h1>
                        <Container className={"container p-3"}>
                            <MultiPageForm user={user}/>
                        </Container>
                    </Container>
                </Container>
            </>
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
            <>
                <Container fluid
                           className={"customBackgroundColour2 patternBack3 d-flex flex-column justify-content-center align-items-center"}
                           style={{height: '100vh'}}>
                    <Container
                        className={"pill-card d-flex flex-column shadow-lg align-items-center align-content-center"}>
                        <h1 className={"text-outline-inverse h1 p-3"}>Visszajelzés</h1>
                        <Container className={"container p-3"}>
                            <Form className={"font-oswald pb-3"}>
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
                    </Container>
                </Container>
            </>
        );
    }

    let valid_passes = [
        {
            name: "Rezes család",
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

    return sessionStorage.getItem("uID") ?
        LoggedInView()
        : IdentifierView();
}

export default FeedbackPage;