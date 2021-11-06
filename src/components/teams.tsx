import Link from "next/link"
import useTeams from "@/services/teams"

const Teams = (): JSX.Element => {
  const [teams] = useTeams()

  return (
    <ul className="teams">
      {teams.map(({ name, slug }, i) => (
        <li key={i}>
          <Link
            shallow={true}
            href={{ query: { slug }, pathname: "/team/[slug]" }}
          >
            <a>{name}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Teams
