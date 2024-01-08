import {Carousel} from "react-bootstrap";
import DynamicImage from "./DynamicImage";
import image1D from "../images/IMG1.jpg";
import image2D from "../images/IMG2.jpg";
import image3D from "../images/IMG3.jpg";
import image4D from "../images/IMG4.jpg";
import image5D from "../images/IMG5.jpg";
import image1M from "../images/mobil/IMG1.png";
import image2M from "../images/mobil/IMG2.png";
import React, {useEffect} from "react";

const MainPage = () => {
    let isMobile = window.innerWidth <= 768;

    useEffect(() => {
        if (window.innerWidth > 768) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isMobile]);


    let imagesDesktop = [
        {
            "src": image1D,
        },
        {
            "src": image2D
        },
        {
            "src": image3D,
        },
        {
            "src": image4D,
        },
        {
            "src": image5D
        }
    ]

    let imagesMobile = [
        {
            "src": image1M,
        },
        {
            "src": image2M,
        },
    ]


    return (
        <>
            {
                isMobile
                    ?
                    <Carousel
                        className={"fullScreen"}
                        pause={false}
                        indicators={false}
                        interval={5000}
                        keyboard={false}
                        touch={true}
                        controls={false}
                        data-bs-theme="dark">

                        {
                            imagesMobile.map(item => (
                                    <Carousel.Item>
                                        <DynamicImage src={item.src}/>
                                    </Carousel.Item>
                                )
                            )
                        }

                    </Carousel>
                    :
                    <Carousel
                        className={"fullScreen"}
                        pause={false}
                        indicators={false}
                        interval={5000}
                        keyboard={false}
                        touch={true}
                        controls={false}
                        data-bs-theme="dark">

                        {
                            imagesDesktop.map(item => (
                                    <Carousel.Item>
                                        <DynamicImage src={item.src}/>
                                    </Carousel.Item>
                                )
                            )
                        }
                    </Carousel>

            }
        </>
    );
}

export default MainPage;