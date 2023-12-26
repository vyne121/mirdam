import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";


const RedirectPage = () => {
    let valid_passes = [
        {
            name: "Rezes család",
            members: [
                {
                    name: "Edit",
                    plusEligible: false
                },
                {
                    name: "János",
                    plusEligible: false
                },
                {
                    name: "Gábor",
                    plusEligible: true
                },
                {
                    name: "Niki",
                    plusEligible: true
                },
                {
                    name: "Martin",
                    plusEligible: true
                },
                {
                    name: "Klaudia",
                    plusEligible: true
                }, {
                    name: "Dia",
                    plusEligible: true
                },
                {
                    name: "Tomi",
                    plusEligible: true
                },
                {
                    name: "Mama",
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
        },
        {
            name: "Test1",
            code: "aB3cD4",
            members: [
                {
                    name: "MEM1",
                    plusEligible: true
                },
                {
                    name: "MEM2",
                    plusEligible: true
                }
            ]
        },
        {
            name: "Test2",
            code: "eF5gH6",
            members: [
                { name: "MEM3", plusEligible: true },
                { name: "MEM4", plusEligible: true }
            ]
        },
        {
            name: "Test20",
            code: "yZ1aB2",
            members: [
                { name: "MEM39", plusEligible: true },
                { name: "MEM40", plusEligible: true }
            ]
        }
    ]
    const navigate = useNavigate();
    const { identifier } = useParams();
    useEffect(() => {
        const foundEntry = valid_passes.find(
            entry => entry.code === identifier
        );
        if(foundEntry) {
            console.log("Valid entry: " + identifier);
            sessionStorage.setItem("uID", identifier);
        } else {
            console.log("Invalid entry: " + identifier);
            console.log("Jumping to feedback page")
        }
        navigate("/feedback");
    }, [navigate]);
    return (
        <>
            <div>
            </div>
        </>
    )
}

export default RedirectPage;