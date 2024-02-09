import {Button, Container, Form, FormControl} from "react-bootstrap";
import {useEffect, useState} from "react";
import {generateClient} from "aws-amplify/api";
import {post} from 'aws-amplify/api';
import {validateUID} from "../funtions/AuthUtil";

function AdminView() {
    const [uidCheckData, setUidCheckData] = useState([]);
    const [feedbackCheckData, setFeedbackCheckData] = useState([]);
    let [getFamilyResult, setGetFamilyResult] = useState("")
    let [identifierFieldValue, setIdentifierFieldValue] = useState("");
    let [getFamilyUID, setGetFamilyUID] = useState("hpbro3");
    let [checkFieldAndButtonDisabled, setCheckFieldAndButtonDisabled] = useState(false)

    async function handleUIDSubmit(event) {
        event.preventDefault();
        setCheckFieldAndButtonDisabled(false)
        setUidCheckData("")
        if (await validateUID(identifierFieldValue)) {
            console.log("IT WORKS")
        }

        try {
            const restOperation = post({
                apiName: 'family',
                path: '/uid',
                options: {
                    body: {
                        "uid": identifierFieldValue
                    }
                }
            });

            const {body} = await restOperation.response;
            const response = await body.json();
            setUidCheckData(response)
            setCheckFieldAndButtonDisabled(false)
            console.log(response['result']);
        } catch (e) {
            console.log('POST call failed: ', e);
            setUidCheckData("Error")
            setCheckFieldAndButtonDisabled(false)
        }
    }

    function handleFeedbackSubmit() {

    }

    async function handleFamilyQuery() {
        setGetFamilyResult("")
        try {
            const restOperation = post({
                apiName: 'family',
                path: '/family',
                options: {
                    body: {
                        "uid": getFamilyUID
                    }
                }
            });
            const {body} = await restOperation.response;
            const response = await body.json();
            setGetFamilyResult(response)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <>
            <Container className={"d-flex flex-column font-oswald border-5 border-black pt-3"}>
                <Container className={"h2"}>
                    Kód lekérdezés
                </Container>
                <Form onSubmit={handleUIDSubmit}>
                    <FormControl value={identifierFieldValue}
                                 autoFocus={true}
                                 onChange={(e) => setIdentifierFieldValue(e.target.value)}
                                 className={"form-control-lg text-sm-center font-2vh w-50"}
                                 id={"identifierField"}
                                 disabled={checkFieldAndButtonDisabled}
                                 placeholder={"ABC123"}>
                    </FormControl>
                    <Container className={"pt-3 d-flex flex-row"}>
                        <Button
                            className={"btn-success"}
                            onClick={handleUIDSubmit}
                            disabled={checkFieldAndButtonDisabled}
                            id={"submitId-Button"}
                        >
                            Küld</Button>
                        {uidCheckData
                            ? <>
                                <Container id={"checkUID-result"} className={"pt-2"}>

                                    {
                                        uidCheckData
                                            ? <>{uidCheckData}</>
                                            : <>{uidCheckData}</>
                                    }
                                </Container>
                            </> : <></>}
                    </Container>
                </Form>
            </Container>
            <Container className={"d-flex flex-column font-oswald border-5 border-black pt-3"}>
                <Container className={"h2"}>
                    Visszajelez
                </Container>
                <Form>
                    <FormControl
                        className={"form-control-lg text-sm-center font-2vh w-50"}
                        id={"feedback-submit-btn"}
                        placeholder={"BOCSI MOST NINCS KEDVEM DEFINIÁLNI :D"}
                        disabled={true}>
                    </FormControl>
                    <Container className={"pt-3 d-flex flex-row"}>
                        <Button className={"btn-success"} onClick={handleFeedbackSubmit}>Küld</Button>
                        {feedbackCheckData
                            ? <>
                                <Container className={"pt-2"}>

                                    {
                                        feedbackCheckData
                                            ? <></>
                                            : <>{Object.keys(feedbackCheckData).map((key) => (
                                                <li key={key}>
                                                    <strong>{key}: </strong>
                                                    {feedbackCheckData[key]}
                                                </li>
                                            ))}</>
                                    }
                                </Container>
                            </> : <></>}
                    </Container>
                </Form>
            </Container>
            <Container className={"d-flex flex-column font-oswald border-5 border-black pt-3"}>
                <Container className={"h2"}>
                    Család lekérdezés
                </Container>
                <Form>
                    <FormControl value={getFamilyUID}
                                 onChange={(e) => setGetFamilyUID(e.target.value)}
                                 className={"form-control-lg text-sm-center font-2vh w-50"}
                                 id={"familyQuery-btn"}
                                 placeholder={"ABC123"}>
                    </FormControl>
                    <Container className={"pt-3 d-flex flex-row"}>
                        <Button
                            className={"btn-success"}
                            onClick={handleFamilyQuery}
                        >
                            Küld
                        </Button>
                        {getFamilyResult
                            ? <>
                                <Container className={"pt-2"}>

                                    {
                                        getFamilyResult
                                            ? <>{Object.keys(getFamilyResult).map((key) => (
                                                <li key={key}>
                                                    <strong>{key}: </strong>
                                                    {getFamilyResult[key]}
                                                </li>
                                            ))}</>
                                            : <>{Object.keys(getFamilyResult).map((key) => (
                                                <li key={key}>
                                                    <strong>{key}: </strong>
                                                    {getFamilyResult[key]}
                                                </li>
                                            ))}</>
                                    }
                                </Container>
                            </> : <></>}
                    </Container>
                </Form>
            </Container>

        </>
    );
}

export default AdminView;
