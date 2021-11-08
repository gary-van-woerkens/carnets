import { SWRConfig } from "swr"
import { useRouter } from "next/router"
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
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string }
  const teams = await getTeams()
  const posts = await getPosts(slug)
  const team = teams.find((team: Team) => team.slug === slug)

  return {
    props: {
      fallback: {
        teams,
        [`posts/${slug}`]: posts,
        [`team/${slug}`]: team,
      },
    },
  }
}

const Page = ({ fallback }: { fallback: Record<string, Team[] | Post[]> }) => {
  const { query } = useRouter()
  const slug = Array.isArray(query.slug) ? query.slug[0] : query.slug

  return (
    <div className="flex flex-1 container mx-auto py-10">
      <SWRConfig value={{ fallback }}>
        <aside className="flex min-h-full max-h-screen sticky top-0 w-52 border-r border-gray-300 mr-8">
          <TeamsLoader />
        </aside>
        <main className="flex flex-col flex-1">
          <TeamLoader slug={slug} />
          <PostsLoader slug={slug} />
        </main>
      </SWRConfig>
    </div>
  )
}

export default Page
