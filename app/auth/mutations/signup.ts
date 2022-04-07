import { Ctx, resolver, SecurePassword } from "blitz"
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"
import { injectDb } from "app/core/custom-resolvers/resolvers"

export default resolver.pipe(
  injectDb,
  resolver.zod(Signup),
  async ({ email, password }, ctx: Ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
      select: { id: true, name: true, email: true, role: true },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
