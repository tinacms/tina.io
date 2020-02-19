import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { response } from 'express'
import { getUser, getBranch } from '../../open-authoring/github/api'

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

  const [forkValidating, setForkValidating] = useState(true)

  useEffect(() => {  // check if user already has a fork and if so use it
    const branch = "master";
    getUser().then( async rawResponse => {
      const data = await rawResponse.json()
      const login = data.login
      const expectedFork = login + "/" + process.env.REPO_FULL_NAME.split('/')[1]
      
      try {
        const forkRawResponse = await getBranch(expectedFork, branch)
        const forkData = await forkRawResponse.json()

        if (forkData.ref === "refs/heads/" + branch) {
          localStorage.setItem('fork_full_name', expectedFork)
          window.close()
          return
        }
        setForkValidating(false);
        return;
      } catch (err) {
        setForkValidating(false);
        return;
      }
    }).catch( err => {
      setForkValidating(false);
      return;
    })
  
  })


  return (
    <div>
      {!forkValidating &&
          <div>
            <button
            onClick={() => {
              createFork()
            }}
          >
            Create a fork
          </button>
        </div>
      }
      {forkValidating &&
        <p>
        Checking for fork...
        </p>
      }
    </div>
  )
}
