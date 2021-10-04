import { NextPage } from "next"
import Posts from "@/components/posts"
import Teams from "@/components/teams"

import { Button } from "react-dsfr"

const HomePage: NextPage = () => {
  return (
    <div>
      <Button label="I'm a button" />
      <Teams />
      <Posts />
    </div>
  )
}

export default HomePage
