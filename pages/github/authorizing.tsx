import { useEffect } from 'react'

export default function Authorizing() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')
    localStorage.setItem('github_code', code)
  }, [])
  return <div>Authorizing with Github, Please wait</div>
}
