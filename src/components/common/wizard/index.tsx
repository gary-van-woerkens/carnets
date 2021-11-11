import { Children, useEffect, useState } from "react"
import Loader from "../loader"
import Paging from "./paging"

export { default as Step } from "./step"
export { default as Steps } from "./steps"
export { default as Statuses } from "./statuses"

export type { Status } from "./steps"

const Wizard = ({
  error,
  success,
  loading,
  status,
  children,
  onComplete,
}: {
  error: string | boolean
  success: string | boolean
  loading: boolean
  status: "loading" | "success" | "error" | undefined
  onComplete: () => void
  children: JSX.Element[]
}) => {
  // const [activeStep, setActiveStep] = useState(0)
  const steps = children.find((child) => child.type.name === "Steps")
  const statuses = children.find((child) => child.type.name === "Statuses")
  // const {
  //   props: { children: statuses },
  // } = children.find((child) => child.type.name === "Statuses") as JSX.Element

  // const totalSteps = steps.length

  // console.log("totalSteps", totalSteps, steps)
  // console.log("steps", steps)

  // useEffect(() => {
  //   if (activeStep === totalSteps - 1) onComplete()
  // }, [activeStep, totalSteps, onComplete])
  // children.map((x) => console.log(x.type.name))

  return (
    <div className="wizard">
      {children}
      {/* {status
        ? statuses.children.find(
            (child: JSX.Element) => child.props.type === status
          )
        : steps} */}
      {/* <Paging activeStep={activeStep} totalSteps={totalSteps} /> */}
      {/* <Steps /> */}
      {/* {error
        ? statuses.find((child: JSX.Element) => child.props.type === "error")
        : success
        ? statuses.find((child: JSX.Element) => child.props.type === "success")
        : loading
        ? statuses.find((child: JSX.Element) => child.props.type === "loading")
        : steps.find((child: JSX.Element, i: number) => i === activeStep)}
              <div className="">
        <button
          className="primary"
          onClick={(e) => {
            e.preventDefault()
            setActiveStep(activeStep + 1)
          }}
        >
          Suivant
        </button> */}
      {/* </div> */}
    </div>
  )
}

export default Wizard
