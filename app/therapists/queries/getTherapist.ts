import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetTherapist = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetTherapist), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const therapist = await db.therapist.findFirst({ where: { id } })

  if (!therapist) throw new NotFoundError()

  return therapist
})
