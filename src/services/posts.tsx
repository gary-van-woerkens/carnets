import useSWRImmutable from "swr/immutable"

import fetcher from "@/utils/fetcher"
import useToken from "@/services/token"
import type { Post } from "@/types/index"
import { getLastPosts, getTeamPosts } from "@/queries/index"

const usePosts = (slug: string | string[] | undefined): Post[][] => {
  const [token] = useToken()

  const { data: { posts: data } = {} } = useSWRImmutable(
    token ? [slug, slug ? getTeamPosts : getLastPosts, token] : null,
    (slug, query, token) => fetcher(query, token, slug ? { slug } : undefined)
  )

  const posts =
    data &&
    data.reduce(
      (acc: [Post], post: Post) => (post.team && acc.push(post), acc),
      []
    )

  return [posts]
}

export default usePosts
