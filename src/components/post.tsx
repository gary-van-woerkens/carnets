import Link from "next/link"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"

import Mood from "./common/mood"
import TabPanel, { Tab, Tabs, Panels } from "@/components/common/tab-panel"

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
}: Post): JSX.Element => {
  return (
    <article className="post">
      <div className="flex mb-5">
        <div className="flex-1">
          <h2>{team?.name}</h2>
          <div className="flex text-sm text-gray-500">
            <div className="mr-2">{author}</div>
            <div>
              {created_at && format(new Date(created_at), "dd-MM-yyyy")}
            </div>
          </div>
        </div>
        <Mood mood={mood} />
      </div>
      <TabPanel>
        <Tabs>
          <Tab disabled={!priorities.length}>Piorités</Tab>
          <Tab disabled={!needs.length}>Besoins</Tab>
          <Tab disabled={!term.length}>Échéances</Tab>
        </Tabs>
        <Panels>
          <ReactMarkdown className="prose prose-sm">{priorities}</ReactMarkdown>
          <ReactMarkdown className="prose prose-sm">{needs}</ReactMarkdown>
          <ReactMarkdown className="prose prose-sm">{term}</ReactMarkdown>
        </Panels>
      </TabPanel>
      {editable && (
        <div className="flex justify-end">
          <Link href={`/team/${team_slug}/post/${id}`}>
            <a className="btn primary">
              <i className="ri-edit-fill ri-fw" />
              Editer
            </a>
          </Link>
          <button
            className="primary ml-2"
            onClick={() => handlePostDeletion(id)}
          >
            <i className="ri-delete-bin-7-fill ri-fw" />
            Supprimer
          </button>
        </div>
      )}
    </article>
  )
}

export default Post
