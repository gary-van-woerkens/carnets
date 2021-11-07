import Link from "next/link"
import { format } from "date-fns"
import ReactMarkdown from "react-markdown"

import type { Post as PostInterface } from "@/types/index"
import TabPanel, { Tab, Tabs, Panels } from "@/components/tab-panel"

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
    <article className="post">
      <div className="flex justify-between">
        <h2>{team?.name}</h2>
        <div>{mood}</div>
      </div>
      <div className="flex text-sm text-gray-500 mb-5">
        <div className="mr-2">{author}</div>
        <div>{created_at && format(new Date(created_at), "dd-MM-yyyy")}</div>
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
        <>
          <Link href={`/team/${team_slug}/post/${id}`}>
            <a>Edit</a>
          </Link>
          <button onClick={() => handlePostDeletion(id)}>Delete</button>
        </>
      )}
    </article>
  )
}

export default Post
