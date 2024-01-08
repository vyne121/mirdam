import {Accordion, Container, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import axios from "axios";
import AccordionHeader from "react-bootstrap/AccordionHeader";
import AccordionBody from "react-bootstrap/AccordionBody";
import AccordionItem from "react-bootstrap/AccordionItem";

function AdminView() {
    const [data, setData] = useState([]); // Initialize data as an empty array

    useEffect(() => {
        const fetchData = async () => {
            try {
                let response = await axios.get('http://127.0.0.1:5000/all');
                console.log('Type of response.data:', typeof response.data[0]);
                console.log(response.data);
                setData(response.data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData().then(r => console.log(data));
    }, []);


    console.log(data.families)

    return (
        <>
            <Container className={"d-flex font-oswald"}>
                <h1>Családok</h1>
                <Accordion defaultActiveKey="0">
                    {data.families.map(item => (
                        <>
                            <Accordion.Item eventKey={item.name}>
                                <Accordion.Header accessKey={item.name}>
                                    {item.name}
                                </Accordion.Header>
                                <AccordionBody>
                                    <Table>
                                        <th>
                                            Szállás
                                        </th>
                                        <th>
                                            Szállás
                                        </th>
                                    </Table>
                                </AccordionBody>
                            </Accordion.Item>
                        </>

                    ))}

                </Accordion>
            </Container>
        </>
    );
}

export default AdminView;
