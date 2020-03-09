import OpenAuthoringError from "./OpenAuthoringError";
import OpenAuthoringContextualError from "./OpenAuthoringContextualError";
import { Actions } from "./OpenAuthoringModalContainer";
import { isForkValid } from "./github/api";

export default async function interpretError(error: OpenAuthoringError) : Promise<OpenAuthoringContextualError> {
    if (!error || !error.code) {
        return new OpenAuthoringContextualError(
            false, // should it be presented as a modal? (if not present a toast)
            "Error", // title
            "Failed to interpret error. No context provided.", // message (the only thing a toast will present)
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

    return new OpenAuthoringContextualError(
        false,
        "Error",
        "Failed to interpret error.",
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
            return new OpenAuthoringContextualError(
                true,
                "500 Error",
                "Server error. Your fork may be out of sync.",
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
    return new OpenAuthoringContextualError(
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
        return new OpenAuthoringContextualError(
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
    return new OpenAuthoringContextualError(
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
