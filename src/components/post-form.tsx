import React, { useState } from "react"
import { useRouter } from "next/router"
import ReactMarkdown from "react-markdown"

import usePost from "@/services/post"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import useToken from "@/services/token"
import { getPost } from "../queries"

const MoodSelector = () => {
  const moods = ["bad", "average", "good"]
  const [selectedMood, setSelectedMood] = useState("good")
  return (
    <div className="mood-selector">
      {moods.map((mood, i) => (
        <div key={i} onClick={() => setSelectedMood(mood)} className="mood">
          {mood}
        </div>
      ))}
    </div>
  )
}

const Editor = ({ value }: { value: string }) => {
  const [text, setText] = useState(value || "")

  const handleChange = ({ target }: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = target
    setText(value)
  }

  return (
    <div className="flex flex-col flex-1 pb-10">
      <div className="flex flex-1">
        <textarea
          className="flex-1 p-5 border rounded mr-5 bg-beige"
          value={text}
          onChange={handleChange}
        ></textarea>
        <div className="flex-1 p-5 border border-gray-100 shadow-lg z-10 bg-white">
          <ReactMarkdown className="prose prose-sm">{text}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

const Wizard = ({ post }: { post: Post }) => {
  const steps = [1, 2, 3, 4]
  const [activeStep, setActiveStep] = useState(1)

  const handleClick = async () => {
    console.log("activeStep", activeStep, steps.length)
    const nextStep = activeStep + 1
    if (nextStep <= steps.length) {
      setActiveStep(nextStep)
    } else {
      console.log("IT'S OVER!")
    }
  }

  return (
    <>
      <div className="wizard">
        <div className="steps">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={`indicator${step === activeStep ? " active" : ""}${
                  i + 1 < activeStep ? " completed" : ""
                }`}
              >
                {step}
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`line${i + 1 < activeStep ? " completed" : ""}`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {activeStep === 1 && (
        <>
          <h2 className="text-center py-10">Vos priorités de la semaine:</h2>
          <Editor value={post?.priorities} />
        </>
      )}
      {activeStep === 2 && (
        <>
          <h2 className="text-center py-10">Vos besoins immédiats:</h2>
          <Editor value={post?.needs} />
        </>
      )}
      {activeStep === 3 && (
        <>
          <h2 className="text-center py-10">Vos prochaines échéances:</h2>
          <Editor value={post?.term} />
        </>
      )}
      {activeStep === 4 && (
        <>
          <h2 className="text-center py-10">
            L&apos;état d&apos;esprit de l&apos;équipe:
          </h2>
          <MoodSelector />
        </>
      )}
      <button
        className="primary"
        onClick={(e) => {
          e.preventDefault()
          handleClick()
        }}
      >
        Suivant
      </button>
    </>
  )
}

const PostForm = () => {
  const router = useRouter()

  const {
    query: { slug, id },
  } = router

  const defaultValues = {
    team: "",
    kpis: "",
    mood: "",
    term: `### Nos prochaines échéances

- Mise en production de la version \`1.42.0\`
- Présentation FAST
    `,
    needs: `### Nos besoins immédiats

#### Besoins fonctionnels
- besoin numéro 1
- besoin numéro 2

#### Besoins techniques
- besoin numéro 1
- besoin numéro 2`,
    author: "",
    created_at: "",
    team_slug: "",
    priorities: `### Exemple de titre

Un petit texte d'introduction. Lorem ipsum dolor sit amet. Est quidem sint sed accusamus molestias ea deleniti beatae. Quo laboriosam sequi qui dolor nisi et soluta velit et asperiores totam qui labore temporibus.

Un exemple de liste:
- élément 1
- élément 2
  - sous élément 1
  - sous élément 2`,
  }

  // const [, id] = publish as [string, string | undefined]
  // const id = undefined

  // const [post, setPost, updatePost, createPost] = usePost(id ? id[0] : undefined)
  // const [post, setPost, updatePost, createPost] = usePost(
  //   id ? id[0] : undefined
  // )
  const [token] = useToken()
  const { data: post } = useSWR(id ? `post/${id[0]}` : null, () =>
    fetcher(getPost, token, id && id[0] ? { id: id[0] } : undefined)
  )
  console.log("POST", post)

  // const submit = () =>
  //   id ? updatePost(post) : createPost({ ...post, team_slug: slug } as Post)

  // const handleTextareaChange = ({
  //   target,
  // }: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   const { name, value } = target
  //   setPost({ ...post, [name]: value })
  // }

  // const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = target
  //   setPost({ ...post, [name]: value })
  // }

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault()
  //   await submit()
  //   router.push({ pathname: "/team/[slug]", query: { slug } })
  // }

  return (
    <form className="flex flex-col flex-1">
      <Wizard post={post || defaultValues} />
      {/* <input onChange={handleChange} name="mood" value={post?.mood || ""} /> */}
      {/* <input
        onChange={handleChange}
        name="created_at"
        value={`${new Date()}`}
      /> */}
      {/* <input onChange={handleChange} name="author" value="John Doe" /> */}
      {/* <input onChange={handleChange} name="team_slug" value={slug} /> */}
      {/* <label>Priorités</label> */}
      {/* <textarea
        name="priorities"
        value={post?.priorities || ""}
        onChange={handleTextareaChange}
      /> */}
      {/* <Editor value={post?.priorities} /> */}
      {/* <label>Besoins</label>
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
      /> */}
      {/* <input name="kpis" value={[{ name: "My kpi", value: 42 }]} /> */}
      {/* <button type="submit">submit</button> */}
    </form>
  )
}

export default PostForm
