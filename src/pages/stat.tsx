import { NextPage } from "next"
import Chart from "@/components/chart"
import Statuses from "@/components/statuses"

const StatPage: NextPage = () => {
  return (
    <div>
      <Chart />
      <Statuses />
    </div>
  )
}

export default StatPage
