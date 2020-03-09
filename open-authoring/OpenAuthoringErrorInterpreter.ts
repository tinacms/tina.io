import OpenAuthoringError from "./OpenAuthoringError";
import OpenAuthoringContextualError from "./OpenAuthoringContextualError";
import { Actions } from "./OpenAuthoringModalContainer";
import { isForkValid } from "./github/api";

export default async function interpretError(error: OpenAuthoringError) {
    if (!error || !error.code) {
        return new OpenAuthoringContextualError(
            "Failed to interpret error. No context provided.",
            "Error",
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
    
    switch (parseInt(error.code.toString()[0])) {
        case 4: {
            return await interpretClientError(error)
        }
        case 5: {
            return interpretServerError(error)
        }
    }

    return new OpenAuthoringContextualError(
        "Failed to interpret error.",
        "Error",
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

function interpretServerError(error: OpenAuthoringError) {
    switch (error.code) {
        case 500: {
            // todo
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
        "Authentication is invalid",
        "401 Unauthenticated",
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
            "Failed to get some content.",
            "404 Not Found",
            [{
                message: "Continue",
                action: Actions.doNothing
            }],
            false
        )
    }
    return new OpenAuthoringContextualError(
        "You are missing a fork.",
        "404 Not Found",
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
