import OpenAuthoringError from "../../OpenAuthoringError"
import interpretUnauthorizedError from "./unauthorized"
import interpretNotFoundError from "./notFound"
import OpenAuthoringContextualErrorUI from "../../OpenAuthoringContextualErrorUI"
import { enterAuthFlow, refresh } from "../actions"

export default async function interpretClientError(error: OpenAuthoringError) {
    switch (error.code) {
        case 401: { // Unauthorized
            return interpretUnauthorizedError(error)
        }
        case 404: { // Not Found
            return await interpretNotFoundError(error)
        }
    }
    return new OpenAuthoringContextualErrorUI(
        true,
        "Error " + error.code,
        "Message: " + error.message,
        [{ 
            message: "Continue",
            action: enterAuthFlow
        },
        { 
            message: "Cancel",
            action: refresh
        }]
    )
}