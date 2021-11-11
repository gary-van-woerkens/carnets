import { withRouter } from "next/router"
import { signIn, signOut, useSession } from "next-auth/client"

import User from "@/components/user"

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
        <div className="flex items-center">
          <a
            className="mr-4"
            href={`/api/auth/signout`}
            onClick={(e) => {
              e.preventDefault()
              signOut()
            }}
          >
            Déconnexion
          </a>
          <User />
        </div>
      )}
    </>
  )
}

export default withRouter(Auth)
