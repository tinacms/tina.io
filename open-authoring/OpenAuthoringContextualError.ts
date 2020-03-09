import { Actions } from "./OpenAuthoringModalContainer"

export default class OpenAuthoringContextualError extends Error {
    title: string
    actions: [{message: string, action: Actions}]
    shouldClearPreview: boolean
    asModal: boolean

    constructor(asModal, title, message, actions, shouldClearPreview) {
        super(message)
        this.asModal = asModal
        this.message = message
        this.title = title
        this.actions = actions 
        this.shouldClearPreview = shouldClearPreview

    }
}
