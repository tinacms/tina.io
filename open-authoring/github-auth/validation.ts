import { getForkName, getHeadBranch, setForkName } from "../open-authoring/repository"
import { useCMS } from "tinacms"

export const validate = async () => {
    var validations = {
        userIsAuthenticated: false,
        forkIsValid: false
    }

    const cms = useCMS()

    const user = await cms.api.github.getUser()

    if (user) {
        validations.userIsAuthenticated = true
        const forkName = getForkName() || (user.login || "") + "/" + process.env.REPO_FULL_NAME.split("/")[1]
        if (await cms.api.github.getBranch(forkName, getHeadBranch())) {
            validations.forkIsValid = true
            if (!getForkName()) { // we guessed the name so we need to set it
                setForkName(forkName)
            }
        }
    } 

    
    return validations
}