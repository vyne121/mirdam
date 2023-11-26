import React, { useState } from 'react';
import {Container, Form, Button, Nav} from 'react-bootstrap';

const MultiPageForm = ({user}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [formData, setFormData] = useState({
        // Jövök nem jövök
        page1: { // Assuming fields for the first page
            field1: '',
            field2: '',
        },
        // Ha volt +1 akkor mi a neve?
        page2: { // Fields for the second page
            field3: '',
            field4: '',
        },
        // Speckó ételigény
        page3: { // Fields for the second page
            field4: '',
            field5: '',
        },
        // Add more pages as needed
    });
    const totalCount = Object.keys(formData).reduce((count, page) => {
        return count + Object.keys(formData[page]).length;
    }, 0);

    // Function to handle form submission
    const handleSubmit = () => {
        console.log('Form submitted:', formData);
        // Add logic to handle form submission, e.g., sending data to the server
    };

    // Function to handle going to the next page
    const handleNextPage = () => {
        if(currentPage === 1 && true === formData.page1.field2) {
            setCurrentPage(currentPage + 1);
        }
        setCurrentPage(currentPage + 2);
    };

    // Function to handle going back to the previous page
    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    // Function to validate form data for the current page
    const isPageValid = () => {
        return Object.values(formData[`page${currentPage}`]).every(value => value.trim() !== '');
    };

    return (
            <Form className={"font-oswald"}>
                {/* Render form fields based on the current page */}
                {currentPage === 1 && (
                    <>
                        <h4>Ott leszek az esküvőn:</h4>
                        {user.members.map(item => (
                            <Form.Group className={"d-flex"} controlId={item.name}>
                                {item.name}:<Form.Check checked={true}/>IGEN / NEM<Form.Check checked={false}/>
                                {item.plusEligible ? <><div>Hozok plusz egy főt:</div><Form.Check/>IGEN / NEM<Form.Check checked={false}/></> : ""}
                            </Form.Group>
                        ))}
                    </>
                )}

                {currentPage === 2 && (
                    <>
                        <Form.Group controlId="field3">
                            <Form.Label>Field 3</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Field 3"
                                value={formData.page2.field3}
                                onChange={(e) => setFormData({ ...formData, page2: { ...formData.page2, field3: e.target.value } })}
                            />
                        </Form.Group>
                        <Form.Group controlId="field4">
                            <Form.Label>Field 4</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Field 4"
                                value={formData.page2.field4}
                                onChange={(e) => setFormData({ ...formData, page2: { ...formData.page2, field4: e.target.value } })}
                            />
                        </Form.Group>
                    </>
                )}

                {/* Navigation buttons */}
                {currentPage > 1 && (
                    <Button variant="primary" onClick={handlePrevPage}>
                        Előző
                    </Button>
                )}

                {currentPage < totalCount && (
                    <Button variant="primary" onClick={handleNextPage} disabled={!isPageValid()}>
                        Követkető
                    </Button>
                )}

                {currentPage === totalCount && (
                    <Button variant="success" onClick={handleSubmit} disabled={!isPageValid()}>
                        Küldés
                    </Button>
                )}
            </Form>
    );
};

export default MultiPageForm;

