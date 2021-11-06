import { cloneElement, useState } from "react"

const Tab = ({
  children,
  selected,
  handleClick,
}: {
  selected?: boolean
  children: JSX.Element[]
  handleClick: () => void
}) => (
  <div className={`tab${selected ? " selected" : ""}`}>
    <button onClick={handleClick}>{children}</button>
  </div>
)

export const Tabs = ({
  children,
  selectedIndex = 0,
  setSelectedIndex = () => {},
}: {
  selectedIndex?: number
  children: JSX.Element[]
  setSelectedIndex?: (index: number) => void
}) => (
  <div className="tabs">
    {children.map((child, i) => (
      <Tab
        key={i}
        selected={i === selectedIndex}
        handleClick={() => setSelectedIndex(i)}
      >
        {[child]}
      </Tab>
    ))}
  </div>
)

const Panel = ({
  children,
  selected = false,
}: {
  selected?: boolean
  children: JSX.Element[]
}) => <div className={`panel${selected ? " selected" : ""}`}>{children}</div>

export const Panels = ({
  children,
  selectedIndex = 0,
  setSelectedIndex = () => {},
}: {
  selectedIndex?: number
  children: JSX.Element[]
  setSelectedIndex?: (index: number) => void
}) => (
  <div className="panels">
    {children.map((child, i) => (
      <Panel key={i} selected={i === selectedIndex}>
        {[child]}
      </Panel>
    ))}
  </div>
)

const TabPanel = ({ children }: { children: JSX.Element[] }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="tab-panel">
      {children.map((child) =>
        cloneElement(child, { selectedIndex, setSelectedIndex })
      )}
    </div>
  )
}

export default TabPanel
