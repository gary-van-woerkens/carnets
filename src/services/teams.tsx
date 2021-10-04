import useSWRImmutable from "swr/immutable"

import fetcher from "@/utils/fetcher"
import useToken from "@/services/token"
import type { Team } from "@/types/index"
import { getTeams } from "@/queries/index"

const useTeams = (): Team[][] => {
  const [token] = useToken()

  const {
    data: { organization: { teams: { nodes: teams = [] } = {} } = {} } = {},
  } = useSWRImmutable(token ? [getTeams, token] : null, fetcher)

  return [teams]
}

export default useTeams
