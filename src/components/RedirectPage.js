import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";


const RedirectPage = () => {
    const navigate = useNavigate();
    const { identifier } = useParams();
    useEffect(() => {
        const checkUIdEndpoint = "16.171.37.246:5000/check_uid?uID=" + identifier;
        fetch(checkUIdEndpoint)
            .then(response => response.json())
            .then(data => {
                if (data === true) {
                    console.log("Valid entry: " + identifier);
                    sessionStorage.setItem("uID", identifier);
                } else {
                    console.log("Invalid entry: " + identifier);
                }
                navigate("/feedback");
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                navigate("/feedback");
            });
    }, [identifier, navigate]);
    return (
        <>
            <div>
            </div>
        </>
    )
}

export default RedirectPage;