export default class OpenAuthoringErrorProps {
  title: string
  message: string
  actions: [{ message: string; action: () => boolean }]
  asModal: boolean

  constructor(asModal, title, message, actions) {
    this.asModal = asModal
    this.message = message
    this.title = title
    this.actions = actions
  }
}
