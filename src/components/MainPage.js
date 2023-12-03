import {Carousel} from "react-bootstrap";
import DynamicImage from "./DynamicImage";
import image1 from "../images/IMG1.jpg";
import image2 from "../images/IMG2.jpg";
import image3 from "../images/IMG3.jpg";
import image4 from "../images/IMG4.jpg";
import image5 from "../images/IMG5.jpg";
import React, {useEffect} from "react";

const MainPage = () => {

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    let isMobile = window.innerWidth <= 768;

    let images = [
        {
            "src": image1,
        },
        {
            "src": image2
        },
        {
            "src": image3,
        },
        {
            "src": image4,
        },
        {
            "src": image5
        }
        ]

    function desktopView() {
        return (
            <>
                <Carousel
                    className={"fullScreen"}
                    pause={false}
                    indicators={false}
                    interval={5000}
                    keyboard={false}
                    touch={true}
                    controls={false}
                    data-bs-theme="dark">

                    {images.map(item => (
                        <Carousel.Item>
                            <DynamicImage src={item.src}/>
                        </Carousel.Item>
                        ))}
                </Carousel>
            </>
        );
    }

    function mobilView() {
        return (
            <>
                Mobil
            </>
        );
    }

    return (<>
        {isMobile ? mobilView() : desktopView()}
    </>)
}

export default MainPage;