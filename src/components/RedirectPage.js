import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {id} from "date-fns/locale";


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