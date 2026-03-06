import type { AuthorizedUserContext } from '../../access-control/access-control.types'

export interface AuthenticatedRequest {
  headers: {
    authorization?: string
    [key: string]: string | string[] | undefined
  }
  authUser?: AuthorizedUserContext
  accessToken?: string
}
