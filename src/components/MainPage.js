import {Carousel} from "react-bootstrap";
import DynamicImage from "./DynamicImage";
import image1 from "../images/IMG1.jpg";
import image2 from "../images/IMG2.jpg";
import image3 from "../images/IMG3.jpg";
import image4 from "../images/IMG4.jpg";
import image5 from "../images/IMG5.jpg";
import React from "react";

const MainPage = () => {
    return (<>
        <Carousel
            pause={false}
            indicators={false}
            interval={5000}
            keyboard={false}
            touch={true}
            controls={false}
            data-bs-theme="dark">
            <Carousel.Item>
                <DynamicImage src={image1}/>
            </Carousel.Item>
            <Carousel.Item>
                <DynamicImage src={image2}/>
            </Carousel.Item>
            <Carousel.Item>
                <DynamicImage src={image3}/>
            </Carousel.Item>
            <Carousel.Item>
                <DynamicImage src={image4}/>
            </Carousel.Item>
            <Carousel.Item>
                <DynamicImage src={image5}/>
            </Carousel.Item>
        </Carousel>
    </>)
}

export default MainPage;