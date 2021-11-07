import useSWR, { SWRConfig } from "swr"

import { getJwt } from "@/utils/jwt"
import fetcher from "@/utils/fetcher"
import Posts from "@/components/posts"
import Team from "@/components/team"
import Teams from "@/components/teams"
import useToken from "@/services/token"
import Loader from "@/components/loader"
import {
  getTeams as getTeamsQuery,
  getLastPosts as getLastPostsQuery,
  getTeamPosts as getTeamPostsQuery,
} from "@/queries/index"

export const getTeams = async () => {
  const token = getJwt()
  const {
    organization: {
      teams: { nodes: teams },
    },
  } = await fetcher(getTeamsQuery, token)

  return teams
}

export const getPosts = async (slug?: string) => {
  const token = getJwt()
  const query = slug ? getTeamPostsQuery : getLastPostsQuery
  const { posts: data } = await fetcher(
    query,
    token,
    slug ? { slug } : undefined
  )

  const posts =
    data &&
    data.reduce(
      (acc: [Post], post: Post) => (post.team && acc.push(post), acc),
      []
    )

  return posts
}

export const TeamsLoader = () => {
  const [token] = useToken()
  const { data: teams } = useSWR("teams", () => fetcher(getTeamsQuery, token))

  if (!teams) return <Loader />
  if (!teams.length) return <div>Aucune équipe pour le moment...</div>

  return <Teams teams={teams} />
}

export const PostsLoader = ({ slug }: { slug?: string }) => {
  const [token] = useToken()
  const { data: posts } = useSWR(slug ? `posts/${slug}` : "posts", () =>
    fetcher(getLastPostsQuery, token, slug && { slug })
  )

  if (!posts) return <Loader size="lg" />
  if (!posts.length) return <div>Aucune publication pour le moment...</div>

  return <Posts posts={posts} />
}

export const TeamLoader = ({ slug }: { slug?: string }) => {
  const [token] = useToken()
  const { data: teams } = useSWR("teams", () => fetcher(getTeamsQuery, token))

  const { data: team } = useSWR(
    teams?.length && slug ? `team/${slug}` : null,
    () => teams.find((team: Team) => team.slug === slug)
  )

  return <Team team={team} />
}
