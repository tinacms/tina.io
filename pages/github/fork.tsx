import Cookies from 'js-cookie'

export default function Authorizing() {
  const createFork = async () => {
    const accessToken = Cookies.get('github_access_token')
    const resp = await fetch(
      `https://api.github.com/repos/${process.env.REPO_FULL_NAME}/forks`,
      {
        method: 'POST',
        headers: {
          Authorization: 'token ' + accessToken,
        },
      }
    )

    const { full_name } = await resp.json()
    const forkFullName = full_name
    if (forkFullName) {
      localStorage.setItem('fork_full_name', full_name)
      window.close()
    } else {
      alert('Could not fork the site') //TODO - show clean error message
    }
  }

  return (
    <div>
      <button
        onClick={() => {
          createFork()
        }}
      >
        Create a fork
      </button>
    </div>
  )
}
