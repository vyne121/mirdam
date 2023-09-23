import React from 'react';
import { Container, Image } from 'react-bootstrap';
import '../App.css';

const DynamicImage = ({src, offset}) => {
    return (
        <Container fluid className="dynamic-image-container">
            <Image src={src} className="dynamic-image" alt="Dynamic Image" style={offset ? {} : {}} />
            <div className="text-overlay">
                <h2 className={"text-outline"}>Miri és Ádám</h2>
            </div>
        </Container>
    );
};

export default DynamicImage;