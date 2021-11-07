import useSWR, { SWRConfig } from "swr"
import type { GetStaticProps } from "next"

import { getTeams, getPosts, TeamsLoader, PostsLoader } from "@/utils/helpers"

export const getStaticProps: GetStaticProps = async () => {
  const teams = await getTeams()
  const posts = await getPosts()

  return {
    props: {
      fallback: { teams, posts },
    },
  }
}

const Page = ({
  fallback,
}: {
  fallback: Record<"teams" | "posts", Team[] | Post[]>
}) => (
  <div className="flex flex-1 container mx-auto py-10">
    <SWRConfig value={{ fallback }}>
      <aside className="flex min-h-full max-h-screen sticky top-0 w-60 border-r border-gray-300 mr-8">
        <TeamsLoader />
      </aside>
      <main className="flex flex-1">
        <PostsLoader />
      </main>
    </SWRConfig>
  </div>
)

export default Page
