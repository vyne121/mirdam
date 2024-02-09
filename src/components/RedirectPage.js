import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";
import {post} from "aws-amplify/api";


const RedirectPage = () => {
    const navigate = useNavigate();
    const { identifier } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const restOperation = post({
                    apiName: 'family',
                    path: '/uid',
                    options: {
                        body: {
                            "uid": identifier
                        }
                    }
                });

                const {body} = await restOperation.response;
                const response = await body.json();
                localStorage.setItem("uID", identifier)
                console.log('POST call succeeded');
                console.log(response['result']);
            } catch (e) {
                console.log('POST call failed: ', e);
            } finally {
                navigate("/feedback");
            }
        };

        fetchData(); // Call the async function

        // Clean-up function (optional)
        return () => {
            // Perform clean-up tasks if necessary
        };
    }, [identifier, navigate]);


    return (
        <>
            <div>
            </div>
        </>
    )
}

export default RedirectPage;