import Link from "next/link"

const Teams = ({ teams = [] }: { teams: Team[] }) => (
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

export default Teams
