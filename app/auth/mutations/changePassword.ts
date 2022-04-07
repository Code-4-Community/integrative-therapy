import { NotFoundError, SecurePassword, resolver } from "blitz"
import { authenticateUser } from "./login"
import { ChangePassword } from "../validations"
import { injectDb } from "app/core/custom-resolvers/resolvers"

export default resolver.pipe(
  injectDb,
  resolver.zod(ChangePassword),
  resolver.authorize(),
  async ({ currentPassword, newPassword }, ctx) => {
    const user = await ctx.db.user.findFirst({ where: { id: ctx.session.userId! } })
    if (!user) throw new NotFoundError()

    await authenticateUser(user.email, currentPassword, ctx)

    const hashedPassword = await SecurePassword.hash(newPassword.trim())
    await ctx.db.user.update({
      where: { id: user.id },
      data: { hashedPassword },
    })

    return true
  }
)
