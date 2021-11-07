interface TeamStatus {
  mood: string
  kpis_count: number
  last_post: string
  team_slug: string
}
interface Stat {
  posts_stat: [
    {
      count: number
      week: number
      year: number
    }
  ]
  teams_status: TeamStatus[]
}

interface Request {
  url: string
  query: string
  token?: string
  params?: Record<string, unknown>
}

interface Team {
  name: string
  slug: string
  avatarUrl: string
  description: string
}

interface Kpi {
  id: string
  name: string
  value: string
}

interface Post {
  id?: string
  team?: Team
  kpis?: [Kpi]
  mood: string
  term: string
  needs: string
  author?: string
  created_at?: Date
  team_slug?: string
  priorities: string
  editable: boolean
  handlePostDeletion: (
    id: string | undefined
  ) => MouseEventHandler<HTMLButtonElement> | undefined
}
