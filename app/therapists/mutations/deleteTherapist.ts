import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteTherapist = z.object({
  id: z.number(),
})

export default resolver.pipe(
  resolver.zod(DeleteTherapist),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const therapist = await db.therapist.deleteMany({ where: { id } })

    return therapist
  }
)
