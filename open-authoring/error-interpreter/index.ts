import OpenAuthoringError from "../OpenAuthoringError"
import OpenAuthoringContextualErrorUI from "../OpenAuthoringContextualErrorUI"
import { enterAuthFlow, refresh } from "./actions"
import interpretClientError from "./client-side"
import interpretServerError from "./server-side"

export default async function getErrorUIFrom(error: OpenAuthoringError) : Promise<OpenAuthoringContextualErrorUI> {
    if (!error || !error.code) {
        console.warn("Error Interpreter: called without an error")
        const message = error?.message || "An error occured."
        return new OpenAuthoringContextualErrorUI(
            true, // should it be presented as a modal? (if not present a toast)
            "Error", // title
            message, // message (the only thing a toast will present)
            [{ 
                message: "Continue",
                action: enterAuthFlow
            },
            { 
                message: "Cancel",
                action: refresh
            }] // Action buttons
        )
    }
    
    switch (parseInt(error.code.toString()[0])) {
        case 4: {
            return await interpretClientError(error)
        }
        case 5: {
            return interpretServerError(error)
        }
    }
    console.warn("Error Interpreter: Could not interpret error " + error.code)
    return new OpenAuthoringContextualErrorUI(
        true,
        "Error " + error.code,
        error.message,
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