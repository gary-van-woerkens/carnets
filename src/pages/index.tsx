import { NextPage } from "next"
import Posts from "@/components/posts"
import Teams from "@/components/teams"

const HomePage: NextPage = () => {
  return (
    <main className="bg-beige">
      <div className="flex container mx-auto py-10">
        <aside>
          <Teams />
        </aside>
        <Posts />
      </div>
    </main>
  )
}

export default HomePage
