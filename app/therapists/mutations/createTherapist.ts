import { resolver } from "blitz"
// import db from "db"
import { z } from "zod"

const CreateTherapist = z.object({
  name: z.string(),
})

export default resolver.pipe(resolver.zod(CreateTherapist), resolver.authorize(), async (_) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  // const therapist = await db.therapist.create({ data: input })
  // return therapist
})
