import { NextPage } from "next"
import Team from "@/components/team"
import Posts from "@/components/posts"
import Teams from "@/components/teams"

const TeamPage: NextPage = () => {
  return (
    <div>
      <Teams />
      <Team />
      <Posts />
    </div>
  )
}

export default TeamPage
