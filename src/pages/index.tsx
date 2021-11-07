import { NextPage } from "next"
import Posts from "@/components/posts"
import Teams from "@/components/teams"

const HomePage: NextPage = () => {
  return (
    <div className="flex container mx-auto py-10">
      <aside className="h-screen sticky top-0">
        <Teams />
      </aside>
      <main>
        <Posts />
      </main>
    </div>
  )
}

export default HomePage
