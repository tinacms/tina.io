import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import { response } from 'express'

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
 
  useEffect(() => {  
    const branch = "master";
    fetch(`/api/proxy-github`, {
      method: 'POST',
      body: JSON.stringify({
        proxy_data: {
          url: `https://api.github.com/user`,
          method: 'GET',
        },
      }),
    }).then( rawResponse => {
      return rawResponse.json()
    }).then( data => {
      return data.login
    }).then( login => {
      const expectedFork = login + "/" + process.env.REPO_FULL_NAME.split('/')[1]
      fetch(`/api/proxy-github`, {
        method: 'POST',
        body: JSON.stringify({
          proxy_data: {
            url: `https://api.github.com/repos/${expectedFork}/git/ref/heads/${branch}`,
            method: 'GET',
          },
        }),
      }).then( forkRawResponse => {
        return forkRawResponse.json()
      }).then( forkData => {
        console.log(forkData);
        if (forkData.ref === "refs/heads/" + branch) {
          localStorage.setItem('fork_full_name', expectedFork)
          window.close()
        }
        setForkValidating(false);
        return;
      }).catch( err => {
        setForkValidating(false);
        return;
      })
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
