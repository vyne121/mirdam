import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";


const RedirectPage = () => {
    const navigate = useNavigate();
    const { identifier } = useParams();
    useEffect(() => {
        sessionStorage.setItem("uID", identifier);
        navigate("/");
    }, [navigate]);
    return (
        <>
            <div>
            </div>
        </>
    )
}

export default RedirectPage;