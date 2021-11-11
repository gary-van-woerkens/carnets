import Link from "next/link"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import MarkdownEditor from "@/components/common/markdown-editor"

import usePost from "@/services/post"
import useSWR from "swr"
import fetcher from "@/utils/fetcher"
import useToken from "@/services/token"
import { getPost } from "../queries"
import Loader from "./common/loader"
import { createPost } from "@/queries/index"

import Wizard, { Steps, Step, Status } from "@/components/common/wizard"
import { session, useSession } from "next-auth/client"

const defaultValues = {
  // team: "",
  // kpis: "",
  // author: "",
  // created_at: "",
  // team_slug: "",
  mood: "good",
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
  priorities: `### Exemple de titre

Un petit texte d'introduction. Lorem ipsum dolor sit amet. Est quidem sint sed accusamus molestias ea deleniti beatae. Quo laboriosam sequi qui dolor nisi et soluta velit et asperiores totam qui labore temporibus.

Un exemple de liste:
- élément 1
- élément 2
- sous élément 1
- sous élément 2`,
}

// const Success = ({ slug }: { slug: string }) => (
//   <div className="flex flex-1 items-center justify-center">
//     <div className="text-9xl text-success relative -top-4">✓</div>
//     <div>
//       <p>Votre publication a été enregitrée avec succès.</p>
//       <p>
//         Retrouvez cette publication en vous rendant sur{" "}
//         <Link href={`/team/${slug}`}>
//           <a>la page dédiée à l&apos;équipe</a>
//         </Link>
//         .
//       </p>
//     </div>
//   </div>
// )

// const Mood = ({
//   post,
//   handleChange,
// }: {
//   post: Post
//   handleChange: (name: string, value: string) => void
// }) => (
//   <>
//     <h2 className="text-center py-10">
//       L&apos;état d&apos;esprit de l&apos;équipe:
//     </h2>
//     <MoodSelector value={post.mood} handleChange={handleChange} />
//   </>
// )

// const Term = ({
//   post,
//   handleChange,
// }: {
//   post: Post
//   handleChange: (name: string, value: string) => void
// }) => (
//   <>
//     <h2 className="text-center py-10">Vos prochaines échéances:</h2>
//     <MarkdownEditor name="term" value={post.term} handleChange={handleChange} />
//   </>
// )

// const Needs = ({
//   post,
//   handleChange,
// }: {
//   post: Post
//   handleChange: (name: string, value: string) => void
// }) => (
//   <>
//     <h2 className="text-center py-10">Vos besoins immédiats:</h2>
//     <MarkdownEditor name="needs" value={post.needs} handleChange={handleChange} />
//   </>
// )

// const Priorities = ({
//   post,
//   handleChange,
// }: {
//   post: Post
//   handleChange: (name: string, value: string) => void
// }) => (
//   <>
//     <h2 className="text-center py-10">Vos priorités de la semaine:</h2>
//     <MarkdownEditor
//       name="priorities"
//       value={post.priorities}
//       handleChange={handleChange}
//     />
//   </>
// )

const MoodSelector = ({
  value,
  handleChange,
}: {
  value: string
  handleChange: (name: string, value: string) => void
}) => {
  const moods = ["bad", "average", "good"]
  console.log("mood ==>", value)

  return (
    <div className="mood-selector">
      {moods.map((mood, i) => (
        <div
          key={i}
          onClick={() => handleChange("mood", mood)}
          className={`mood${mood === value ? " selected" : ""}`}
        >
          {mood}
        </div>
      ))}
    </div>
  )
}

// const Wizardx = ({
//   post,
//   slug,
//   success,
//   onComplete,
//   handleChange,
// }: {
//   post: Post
//   slug: string
//   success: boolean
//   onComplete: () => void
//   handleChange: (name: string, value: string) => void
// }) => {
//   const steps = [1, 2, 3, 4]
//   const [activeStep, setActiveStep] = useState(1)

//   const isLastStep = () => activeStep === steps.length

//   const handleClick = async () => {
//     console.log("activeStep", activeStep, steps.length)
//     setActiveStep(activeStep + 1)
//     if (isLastStep()) {
//       onComplete()
//     }
//   }

//   return (
//     <>
//       <div className="wizard">
//         <div className="steps">
//           {steps.map((step, i) => (
//             <React.Fragment key={i}>
//               <div
//                 className={`indicator${step === activeStep ? " active" : ""}${
//                   i + 1 < activeStep ? " completed" : ""
//                 }`}
//               >
//                 {step}
//               </div>
//               {i < steps.length - 1 && (
//                 <div
//                   className={`line${i + 1 < activeStep ? " completed" : ""}`}
//                 ></div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//       {activeStep === 1 && (
//         <Priorities post={post} handleChange={handleChange} />
//       )}
//       {activeStep === 2 && <Needs post={post} handleChange={handleChange} />}
//       {activeStep === 3 && <Term post={post} handleChange={handleChange} />}
//       {activeStep === 4 && <Mood post={post} handleChange={handleChange} />}
//       {!success && activeStep === 5 && <Loader size="lg" />}
//       {activeStep <= steps.length && (
//         <div className="flex justify-end">
//           <button
//             className="primary"
//             onClick={(e) => {
//               e.preventDefault()
//               handleClick()
//             }}
//           >
//             {isLastStep() ? "Publier" : "Suivant"}
//           </button>
//         </div>
//       )}
//       {success && <Success slug={slug} />}
//     </>
//   )
// }

const PostForm = () => {
  const router = useRouter()
  const [token] = useToken()
  const [session] = useSession()
  console.log("session", session)

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [activeStep, setActiveStep] = useState(0)
  const [status, setStatus] = useState<Status>("steps")

  const {
    query: { slug, id },
  } = router

  const { data } = useSWR(id ? `post/${id[0]}` : null, () =>
    fetcher(getPost, token, id && id[0] ? { id: id[0] } : undefined)
  )

  const [post, setPost] = useState(data || defaultValues)

  const submit = async () => {
    console.log("ON SUBMIT", post)
    try {
      const result = await fetcher(createPost, token, {
        post: { ...post, team_slug: slug, author: session?.user.login },
      })
      console.log("result", result)
      setStatus("success")
    } catch (error) {
      setStatus("error")
      throw error
    }
  }

  const handleChange = (name: string, value: string) =>
    setPost({ ...post, [name]: value })

  const handleComplete = () => {
    setStatus("loading")
    submit()
  }

  return (
    <form className="flex flex-col flex-1">
      <Steps status={status} onComplete={handleComplete}>
        <Step>
          <h2 className="text-center pb-10">Vos priorités de la semaine:</h2>
          <MarkdownEditor
            name="priorities"
            value={post.priorities}
            handleChange={handleChange}
          />
        </Step>
        <Step>
          <h2 className="text-center pb-10">Vos besoins immédiats:</h2>
          <MarkdownEditor
            name="needs"
            value={post.needs}
            handleChange={handleChange}
          />
        </Step>
        <Step>
          <h2 className="text-center pb-10">Vos prochaines échéances:</h2>
          <MarkdownEditor
            name="term"
            value={post.term}
            handleChange={handleChange}
          />
        </Step>
        <Step>
          <h2 className="text-center pb-10">
            L&apos;état d&apos;esprit de l&apos;équipe:
          </h2>
          <MoodSelector value={post.mood} handleChange={handleChange} />
        </Step>
        <Step type="loading">
          <Loader size="lg" />
        </Step>
        <Step type="success">
          <div className="flex flex-1 items-center justify-center">
            <div className="text-9xl text-success relative -top-4">✓</div>
            <div>
              <p>Votre publication a été enregitrée avec succès.</p>
              <p>
                Retrouvez cette publication en vous rendant sur{" "}
                <Link href={`/team/${slug}`}>
                  <a>la page dédiée à l&apos;équipe</a>
                </Link>
                .
              </p>
            </div>
          </div>
        </Step>
        <Step type="error">
          <div className="flex flex-1 items-center justify-center">
            <div className="text-9xl text-error relative -top-4">❌</div>
            <div>
              <p>
                Un problème est survenu empechant votre publication d&apos;être
                enregitrée.
              </p>
              <p>
                Veuillez essayer ultèrieurement en repartant de{" "}
                <Link href={`/team/${slug}`}>
                  <a>la page dédiée à l&apos;équipe</a>
                </Link>
                .
              </p>
            </div>
          </div>
        </Step>
      </Steps>
    </form>
  )
}

export default PostForm
