export default class OpenAuthoringErrorProps {
  title: string
  message: string
  actions: [{ message: string; action: () => boolean }]

  constructor(title, message, actions) {
    this.message = message
    this.title = title
    this.actions = actions
  }
}
