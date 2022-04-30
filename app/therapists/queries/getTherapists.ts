import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetTherapistsInput
  extends Pick<Prisma.TherapistFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  searchQuery: string | undefined
}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100, searchQuery }: GetTherapistsInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: therapists,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.therapist.count({ where }),
      query: (paginateArgs) =>
        db.therapist.findMany({
          ...paginateArgs, where: {
            body: {
              search: 'cat',
            }
          }, orderBy }),
    })

    return {
      therapists,
      nextPage,
      hasMore,
      count,
    }
  }
)
