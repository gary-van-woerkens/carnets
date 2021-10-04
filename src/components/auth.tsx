import { withRouter } from "next/router"
import { signIn, signOut, useSession } from "next-auth/client"

const Auth = (): JSX.Element => {
  const [session] = useSession()

  return (
    <>
      {!session && (
        <a
          href={`/api/auth/signin`}
          onClick={(e) => {
            e.preventDefault()
            signIn()
          }}
        >
          Connexion
        </a>
      )}
      {session?.user && (
        <a
          href={`/api/auth/signout`}
          onClick={(e) => {
            e.preventDefault()
            signOut()
          }}
        >
          Déconnexion
        </a>
      )}
    </>
  )
}

export default withRouter(Auth)
