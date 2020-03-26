import { AuthLayout } from '../../components/layout'
import useGithubAuthRedirect from '../../open-authoring/source-provider-managers/useGithubAuthRedirect'

export default function Authorizing() {
  useGithubAuthRedirect()

  return (
    <AuthLayout>
      <h2>Authorizing with Github, Please wait...</h2>
    </AuthLayout>
  )
}
