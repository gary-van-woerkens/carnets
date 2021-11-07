import Image from "next/image"

const Team = ({ team }: { team: Team }) => (
  <section className="team">
    <div>{team?.name}</div>
    <div>
      {team?.avatarUrl && (
        <Image
          width={128}
          height={128}
          src={team?.avatarUrl}
          alt="Picture of the author"
        />
      )}
    </div>
    <div>{team?.description}</div>
  </section>
)

export default Team
