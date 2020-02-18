export default function Authorizing() {
  const createFork = async () => {
    const resp = await fetch(`/api/proxy-github`, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/repos/${process.env.REPO_FULL_NAME}/forks`,
          method: 'POST',
        },
      }),
    })

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
