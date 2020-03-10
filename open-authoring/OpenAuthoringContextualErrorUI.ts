import { Actions } from "./OpenAuthoringModalContainer"

export default class OpenAuthoringContextualErrorUIUI {
    title: string
    message: string
    actions: [{message: string, action: Actions}]
    shouldClearPreview: boolean
    asModal: boolean

    constructor(asModal, title, message, actions, shouldClearPreview) {
        this.asModal = asModal
        this.message = message
        this.title = title
        this.actions = actions 
        this.shouldClearPreview = shouldClearPreview

    }
}
