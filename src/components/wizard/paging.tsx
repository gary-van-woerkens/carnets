import { Fragment } from "react"

const Paging = ({
  activeStep,
  totalSteps,
}: {
  activeStep: number
  totalSteps: number
}) => {
  return (
    <div className="paging">
      {[...Array(totalSteps)].map((e, i) => (
        <Fragment key={i}>
          <div
            className={`indicator${i === activeStep ? " active" : ""}${
              i + 1 < activeStep ? " completed" : ""
            }`}
          >
            {i}
          </div>
          {i < totalSteps - 1 && (
            <div
              className={`line${i + 1 < activeStep ? " completed" : ""}`}
            ></div>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export default Paging
