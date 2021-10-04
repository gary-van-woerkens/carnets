import { useSession } from "next-auth/client"

const User = (): JSX.Element => {
  const [session] = useSession()

  return (
    <>
      {session?.user && (
        <div>
          <div style={{ backgroundImage: `url(${session.user.image})` }}></div>
          <div>{session.user.name}</div>
        </div>
      )}
    </>
  )
}

export default User
