import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { Db, User } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
    /**
     * Injected Enhanced Prisma Client instance.
     * Attached to Ctx via global middleware in `blitz.config.ts`.
     */
    db: Db
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}
