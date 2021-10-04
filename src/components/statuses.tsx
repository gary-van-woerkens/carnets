import useStat from "@/services/stat"

const Statuses = (): JSX.Element => {
  const [{ teams_status: data }] = useStat()

  return (
    <table>
      <tbody>
        {data &&
          data.map(({ team_slug: slug, mood, last_post, kpis_count }, i) => (
            <tr key={i}>
              <td>{slug}</td>
              <td>{mood}</td>
              <td>{last_post}</td>
              <td>{kpis_count}</td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default Statuses
