import { Actions } from "./OpenAuthoringModalContainer"

export default class OpenAuthoringContextualError extends Error {
    title: string
    actions: [{message: string, action: Actions}]
    shouldClearPreview: boolean

    constructor(message, title, actions, shouldClearPreview) {
        super(message)
        this.message = message
        this.title = title
        this.actions = actions 
        this.shouldClearPreview = shouldClearPreview

    }
}
