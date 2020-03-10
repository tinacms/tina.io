import OpenAuthoringError from "./OpenAuthoringError";
import OpenAuthoringContextualErrorUI from "./OpenAuthoringContextualErrorUI";
import { Actions } from "./OpenAuthoringModalContainer";
import { isForkValid } from "./github/api";

export default async function interpretError(error: OpenAuthoringError) : Promise<OpenAuthoringContextualErrorUI> {
    if (!error || !error.code) {
        console.warn("Error Interpreter: called without an error")
        const message = error?.message || "An error occured."
        return new OpenAuthoringContextualErrorUI(
            true, // should it be presented as a modal? (if not present a toast)
            "Error", // title
            message, // message (the only thing a toast will present)
            [{ 
                message: "Continue",
                action: Actions.authFlow
            },
            { 
                message: "Cancel",
                action: Actions.refresh
            }], // Action buttons
            false // clear preview cookies
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
            action: Actions.authFlow
        },
        { 
            message: "Cancel",
            action: Actions.refresh
        }],
        false
    )
}

function interpretServerError(error: OpenAuthoringError) {
    switch (error.code) {
        case 500: {
            return new OpenAuthoringContextualErrorUI(
                true,
                "Error 500",
                error.message,
                [{ 
                    message: "Continue",
                    action: Actions.doNothing
                }],
                false
            )
        }
    }
}

async function interpretClientError(error: OpenAuthoringError) {
    switch (error.code) {
        case 401: { // Unauthorized
            return interpretUnauthorizedError(error)
        }
        case 404: { // Not Found
            return await interpretNotFoundError(error)
        }
    }
}

function interpretUnauthorizedError(error: OpenAuthoringError) {
    // if authentication is not valid they need to re-authenticate
    return new OpenAuthoringContextualErrorUI(
        false,
        "401 Unauthenticated",
        "Authentication is invalid",
        [{ 
            message: "Continue",
            action: Actions.authFlow
        },
        { 
            message: "Cancel",
            action: Actions.refresh
        }],
        true
    )
}

async function interpretNotFoundError(error: OpenAuthoringError) {
    if (await isForkValid()) { // drill down further in the future
        return new OpenAuthoringContextualErrorUI(
            true,
            "404 Not Found",
            "Failed to get some content.",
            [{
                message: "Continue",
                action: Actions.doNothing
            }],
            false
        )
    }
    return new OpenAuthoringContextualErrorUI(
        true,
        "404 Not Found",
        "You are missing a fork.",
        [{
            message: "Continue",
            action: Actions.authFlow
        },
        {
            message: "Cancel",
            action: Actions.refresh
        }],
        true
    )   
}
