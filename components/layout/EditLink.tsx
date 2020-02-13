export const EditLink = () => {
  let authTab
  const onClick = () => {
    const url = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.GITHUB_CLIENT_ID}`
    authTab = window.open(
      url,
      '_blank',
      'fullscreen=no, width=1000, height=800'
    )
  }

  return (
    <div onClick={onClick}>
      <a>Edit this page</a>
    </div>
  )
}
