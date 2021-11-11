const Statuses = ({
  status,
  children,
}: {
  children: JSX.Element[]
  status: "loading" | "success" | "error" | undefined
}) => {
  return (
    <div className="statuses">
      {children.find((child: JSX.Element) => child.props.type === status)}
    </div>
  )
}

export default Statuses
