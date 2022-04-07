import { NotFoundError, resolver, SecurePassword } from "blitz"
import { ChangePassword } from "../validations"
import { authenticateUser } from "./login"

export default resolver.pipe(
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
