import { useOpenAuthoring } from "../../components/layout/OpenAuthoring"
import { enterEditMode } from "../authFlow"
import Cookies from "js-cookie"
import { isGithubTokenValid, isForkValid } from "../github/api"

// return true if you want the modal to close

export const refresh = () => {
    fetch(`/api/reset-preview`).then( () => {
        window.location.reload()
    })

    return false
}

export const enterAuthFlow = async () => {
    const authenticated = await isGithubTokenValid()

    const forkName = Cookies.get('fork_full_name')
    
    const forkValid = await isForkValid(forkName)

    fetch(`/api/reset-preview`).then( () => {
        enterEditMode(authenticated, forkValid, false)
    })

    return false
}

export const justClose = () => {
    return true
}