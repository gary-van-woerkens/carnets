import Link from "next/link"
import type { Post as PostInterface } from "@/types/index"

const Post = ({
  id,
  mood,
  team,
  term,
  needs,
  author,
  team_slug,
  created_at,
  priorities,
  editable,
  handlePostDeletion,
}: PostInterface): JSX.Element => {
  return (
    <div>
      <div>{team?.name}</div>
      <div>{mood}</div>
      <div>{author}</div>
      <div>{created_at}</div>
      <div className="tab-panel">
        <div className="tabs">
          <div className="tab">Piorités</div>
          <div className="tab">Besoins</div>
          <div className="tab">Échéances</div>
        </div>
        <div className="panels">
          <div className="panel">{priorities}</div>
          <div className="panel">{needs}</div>
          <div className="panel">{term}</div>
        </div>
      </div>
      {editable && (
        <>
          <Link href={`/team/${team_slug}/post/${id}`}>
            <a>Edit</a>
          </Link>
          <button onClick={() => handlePostDeletion(id)}>Delete</button>
        </>
      )}
    </div>
  )
}

export default Post
