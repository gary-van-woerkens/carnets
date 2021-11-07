import { useRouter } from "next/router"

import usePost from "@/services/post"

const PostForm = () => {
  const router = useRouter()

  const {
    query: { slug, id },
  } = router

  // const [, id] = publish as [string, string | undefined]
  // const id = undefined

  // const [post, setPost, updatePost, createPost] = usePost(id ? id[0] : undefined)
  const [post, setPost, updatePost, createPost] = usePost(
    id ? id[0] : undefined
  )

  const submit = () =>
    id ? updatePost(post) : createPost({ ...post, team_slug: slug } as Post)

  const handleTextareaChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = target
    setPost({ ...post, [name]: value })
  }

  const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target
    setPost({ ...post, [name]: value })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await submit()
    router.push({ pathname: "/team/[slug]", query: { slug } })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>Publish Form</div>
      <input onChange={handleChange} name="mood" value={post?.mood || ""} />
      {/* <input
        onChange={handleChange}
        name="created_at"
        value={`${new Date()}`}
      /> */}
      {/* <input onChange={handleChange} name="author" value="John Doe" /> */}
      {/* <input onChange={handleChange} name="team_slug" value={slug} /> */}
      <label>Priorités</label>
      <textarea
        name="priorities"
        value={post?.priorities || ""}
        onChange={handleTextareaChange}
      />
      <label>Besoins</label>
      <textarea
        name="needs"
        value={post?.needs || ""}
        onChange={handleTextareaChange}
      />
      <label>Échéances</label>
      <textarea
        name="term"
        value={post?.term || ""}
        onChange={handleTextareaChange}
      />
      {/* <input name="kpis" value={[{ name: "My kpi", value: 42 }]} /> */}
      <button type="submit">submit</button>
    </form>
  )
}

export default PostForm
