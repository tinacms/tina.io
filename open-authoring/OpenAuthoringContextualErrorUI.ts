import { Actions } from "./OpenAuthoringModalContainer"

export default class OpenAuthoringContextualErrorUIUI {
    title: string
    message: string
    actions: [{message: string, action: Actions}]
    asModal: boolean

    constructor(asModal, title, message, actions) {
        this.asModal = asModal
        this.message = message
        this.title = title
        this.actions = actions 
    }
}
