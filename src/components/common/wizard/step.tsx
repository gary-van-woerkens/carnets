const Step = ({
  type,
  children,
}: {
  type?: "error" | "success" | "loading"
  children: JSX.Element | JSX.Element[]
}) => {
  return <div className="step">{children}</div>
}

export default Step
