import OpenAuthoringError from "../../OpenAuthoringError";
import OpenAuthoringContextualErrorUI from "../../OpenAuthoringContextualErrorUI"
import { enterAuthFlow, refresh } from "../actions"

export default function interpretServerError(error: OpenAuthoringError) {
    switch (error.code) {
        case 500: {
            return new OpenAuthoringContextualErrorUI(
                true,
                "Error 500",
                error.message,
                [{ 
                    message: "Continue",
                    action: close
                }]
            )
        }
    }
}