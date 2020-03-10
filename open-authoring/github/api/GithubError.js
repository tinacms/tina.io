class GithubError extends Error {
    status
    constructor(message, status) {
        super(message)
        this.message = message
        this.status = status
    }
}

module.exports = GithubError