import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const UpdateTherapist = z.object({
  id: z.number(),
  name: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateTherapist),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const therapist = await db.therapist.update({ where: { id }, data })

    return therapist
  }
)
