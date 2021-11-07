import { SWRConfig } from "swr"
import type { GetStaticPaths, GetStaticProps } from "next"

import {
  getTeams,
  getPosts,
  TeamsLoader,
  PostsLoader,
  TeamLoader,
} from "@/utils/helpers"

export const getStaticPaths: GetStaticPaths = async () => {
  const teams = await getTeams()
  const paths = teams.map((team: Team) => `/team/${team.slug}`)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const teams = await getTeams()
  const posts = await getPosts(slug)

  return {
    props: {
      slug,
      fallback: {
        teams,
        [`posts/${slug}`]: posts,
        [`team/${slug}`]: teams.find((team: Team) => team.slug === slug),
      },
    },
  }
}

const Page = ({
  slug,
  fallback = {},
}: {
  slug: string
  fallback: Record<string, Team[] | Post[]>
}) => (
  <div className="flex flex-1 container mx-auto py-10">
    <SWRConfig value={{ fallback }}>
      <aside className="flex min-h-full max-h-screen sticky top-0 w-60 border-r border-gray-300 mr-8">
        <TeamsLoader />
      </aside>
      <main className="flex flex-1">
        <TeamLoader slug={slug} />
        <PostsLoader slug={slug} />
      </main>
    </SWRConfig>
  </div>
)

export default Page
