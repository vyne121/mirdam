import {post} from "aws-amplify/api";

export async function validateUID(uid) {
    try {
        const restOperation = post({
            apiName: 'family',
            path: '/uid',
            options: {
                body: {
                    "uid": uid
                }
            }
        });

        const {body} = await restOperation.response;
        const response = await body.json();
        if (response.includes("Valid")) {
            return true
        }
        console.log(response['result']);
        return false
    } catch (e) {
        console.log('POST call failed: ', e);
        return false
    }
}