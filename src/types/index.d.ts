interface Stat {
  posts_stat: [
    {
      count: number
      week: number
      year: number
    }
  ]
  teams_status: [
    {
      mood: string
      kpis_count: number
      last_post: string
      team_slug: string
    }
  ]
}

export interface Request {
  url: string
  query: string
  token?: string
  params?: Record<string, unknown>
}

export interface Team {
  name: string
  slug: string
  avatarUrl: string
  description: string
}

export interface Kpi {
  id: string
  name: string
  value: string
}

export interface Post {
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
