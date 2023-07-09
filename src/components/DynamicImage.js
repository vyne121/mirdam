import {Container, Image} from "react-bootstrap";

const DynamicImage = (src) => {
    return (
        <Container fluid>
            <Image
                src={src}
                className="dynamic-image"
                alt="Dynamic Image"
            />
        </Container>
    );
};

export default DynamicImage;