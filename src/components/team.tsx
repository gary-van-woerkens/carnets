import Image from "next/image"
import { useRouter } from "next/router"

import useTeam from "@/services/team"

interface Team {
  slug: string
  name: string
  avatarUrl: string
  description: string
}

const Team = (): JSX.Element => {
  const {
    query: { slug },
  } = useRouter()

  const [team] = useTeam(slug) as [Team]

  return (
    <div>
      <div>{team?.name}</div>
      <div>
        {team?.avatarUrl && (
          <Image
            width={128}
            height={128}
            src={team?.avatarUrl}
            alt="Picture of the author"
          />
        )}
      </div>
      <div>{team?.description}</div>
    </div>
  )
}

export default Team
