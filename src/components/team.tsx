import Image from "next/image"

const Team = ({ team }: { team: Team }) => (
  <section className="team flex items-center pb-8">
    <div>
      {team?.avatarUrl && (
        <Image
          width={96}
          height={96}
          src={team?.avatarUrl}
          alt="Picture of the author"
        />
      )}
    </div>
    <div className="flex-1 px-8">
      <h2>{team?.name}</h2>
      <div className="font-spectral">{team?.description}</div>
    </div>
  </section>
)

export default Team
