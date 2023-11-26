import React from 'react';
import { Container, Image } from 'react-bootstrap';
import '../App.css';

const DynamicImage = ({src, offset}) => {
    return (
        <Container fluid className="dynamic-image-container">
            <Image src={src} className="dynamic-image" alt="Dynamic Image" style={offset ? {} : {}} />
            <div className="text-overlay">
                <h2 className={"text-outline"}>Miri és Ádám</h2>
                <h3 className={"text-outline"}>2024. 06. 22.</h3>
                <h3 className={"font-fancy text-outline-h3 text-outline"}>Pilisvörösvár</h3>
            </div>
            <div className={"bottom-right-overlay"}>
                <h3 className={"text-outline font-oswald"}>
                    Gólyafészek rendezvényház
                </h3>
                <h3 className={"text-outline font-oswald"}>
                    Az esemény kezdete: 17:00
                </h3>
                <h3 className={"text-outline font-oswald"}>
                    Pilisvörösvár, Szent Erzsébet u. 132, 2085
                </h3>
            </div>
        </Container>
    );
};

export default DynamicImage;