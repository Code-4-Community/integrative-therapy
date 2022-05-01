import { Signup } from "app/auth/validations"
import { Ctx, resolver, SecurePassword } from "blitz"
import db from "db"
import { Role } from "types"

export default resolver.pipe(resolver.zod(Signup), async ({ email, password }, ctx: Ctx) => {
  const user = await createNewUser(email, password)

  await ctx.session.$create({ userId: user.id, role: user.role as Role })
  return user
})

/**
 * Creates a new user with the given password and email.
 * @param password
 * @param email
 */
export async function createNewUser(email: string, password: string) {
  const hashedPassword = await SecurePassword.hash(password.trim())
  const user = await db.user.create({
    data: { email: email.toLowerCase().trim(), hashedPassword, role: "USER" },
    select: { id: true, name: true, email: true, role: true },
  })
  return user
}
