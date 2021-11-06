import Link from "next/link"
import { useRouter } from "next/router"
import { useSession } from "next-auth/client"

import Post from "@/components/post"
import fetcher from "@/utils/fetcher"
import usePosts from "@/services/posts"
import { deletePost as deletePostQuery } from "../queries"
import useToken from "@/services/token"

const Posts = (): JSX.Element => {
  const {
    query: { slug },
  } = useRouter()

  const [token] = useToken()
  const [session] = useSession()
  const [posts] = usePosts(slug)

  const isAuthorized = (slug: string) =>
    session?.user.role === "admin" || session?.user.teams.includes(slug)
      ? true
      : false

  const deletePost = async (id: string | undefined) => {
    console.log("deletePost", id)
    if (id) {
      await fetcher(deletePostQuery, token, { id })
    }
  }

  return (
    <div className="posts">
      {isAuthorized(String(slug)) && (
        <Link href={`/team/${slug}/post`}>
          <a>Add</a>
        </Link>
      )}
      <ul className="list">
        {posts &&
          posts.map((post, i) => (
            <li key={i}>
              <Post
                {...post}
                editable={isAuthorized(String(post.team_slug))}
                handlePostDeletion={() => deletePost(post.id)}
              />
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Posts
