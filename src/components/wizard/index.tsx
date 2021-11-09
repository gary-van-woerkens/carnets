import { Children, useEffect, useState } from "react"
import Loader from "../loader"
import Paging from "./paging"

const Wizard = ({
  error,
  success,
  loading,
  children,
  onComplete,
}: {
  error: string | boolean
  success: string | boolean
  loading: boolean
  onComplete: () => void
  children: JSX.Element[]
}) => {
  const [activeStep, setActiveStep] = useState(0)
  const totalSteps = Array.isArray(children) ? children.length : 1
  console.log("totalSteps", totalSteps)

  useEffect(() => {
    if (activeStep === totalSteps - 1) onComplete()
  }, [activeStep, totalSteps, onComplete])
  children.map((x) => console.log(x.type.name))
  const steps = children.filter((child) => child.type.name === "Step")
  console.log("steps", steps)

  return (
    <div className="wizard">
      <Paging activeStep={activeStep} totalSteps={totalSteps} />
      {error
        ? children.find((child) => child.props.type === "error")
        : success
        ? children.find((child) => child.props.type === "success")
        : loading
        ? children.find((child) => child.props.type === "loading")
        : children.find((child, i) => i === activeStep)}
      <div className="">
        <button
          className="primary"
          onClick={(e) => {
            e.preventDefault()
            setActiveStep(activeStep + 1)
          }}
        >
          Suivant
        </button>
      </div>
    </div>
  )
}

export default Wizard
