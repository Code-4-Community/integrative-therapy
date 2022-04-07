import { Ctx } from "blitz"
import db from "db"

export function injectDb<T>(input: T, ctx: Ctx) {
  attachDbToContext(ctx)
  return input
}

export function attachDbToContext(ctx: Ctx) {
  if (!ctx.db) {
    ctx.db = db
  }
}
