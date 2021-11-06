import { NextPage } from "next"
import Posts from "@/components/posts"
import Teams from "@/components/teams"

const HomePage: NextPage = () => {
  return (
    <main>
      <aside>
        <Teams />
      </aside>
      <section>
        <Posts />
      </section>
    </main>
  )
}

export default HomePage
