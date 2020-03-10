import OpenAuthoringError from "../../OpenAuthoringError"
import interpretUnauthorizedError from "./unauthorized"
import interpretNotFoundError from "./notFound"

export default async function interpretClientError(error: OpenAuthoringError) {
    switch (error.code) {
        case 401: { // Unauthorized
            return interpretUnauthorizedError(error)
        }
        case 404: { // Not Found
            return await interpretNotFoundError(error)
        }
    }
}