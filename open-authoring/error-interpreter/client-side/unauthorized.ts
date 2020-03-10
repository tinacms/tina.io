import OpenAuthoringError from "../../OpenAuthoringError";
import OpenAuthoringContextualErrorUI from "../../OpenAuthoringContextualErrorUI"
import { enterAuthFlow, refresh } from "../actions"

export default function interpretUnauthorizedError(error: OpenAuthoringError) {
    // if authentication is not valid they need to re-authenticate
    return new OpenAuthoringContextualErrorUI(
        true,
        "401 Unauthenticated",
        "Authentication is invalid",
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