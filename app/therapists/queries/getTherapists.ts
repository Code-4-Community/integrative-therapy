import { resolver } from "blitz"
import db, { Prisma, Therapist, Location } from "db"
import { calculateDistance, DistanceResult, UNKNOWN_DISTANCE } from "integrations/distance/distance"

interface GetTherapistsInput
  extends Pick<Prisma.TherapistFindManyArgs, "where" | "orderBy" | "skip" | "take"> {
  targetZipcode: string | undefined
}

export type TherapistWithLocation = Therapist & {
  location: Location
}

export type TherapistWithLocationAndDistance = TherapistWithLocation & {
  distance: DistanceResult
}

export default resolver.pipe(async ({ where, orderBy, targetZipcode }: GetTherapistsInput) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const result: TherapistWithLocation[] = await db.therapist.findMany({
    orderBy,
    where,
    include: {
      location: true,
    },
  })

  if (targetZipcode) {
    return sortTherapistsByDistance(result, targetZipcode)
  } else {
    return therapistsWithUnknownDistance(result)
  }
})

/**
 * Maps a list of therapists with location and gives each therapist an initial distance of UNKNOWN_DISTANCE
 */
function therapistsWithUnknownDistance(
  therapistsWithLocation: TherapistWithLocation[]
): TherapistWithLocationAndDistance[] | PromiseLike<TherapistWithLocationAndDistance[]> {
  return therapistsWithLocation.map((therapistWithLocation) => ({
    ...therapistWithLocation,
    distance: UNKNOWN_DISTANCE,
  }))
}

/**
 * Produces a sorted list of therapists w/ location and distance, sorted by distance
 */
function sortTherapistsByDistance(
  therapistsWithLocation: TherapistWithLocation[],
  targetZipcode: string
) {
  const therapistWithLocationAndDistance: TherapistWithLocationAndDistance[] =
    therapistsWithLocation.map((therapistWithLocation) => {
      return {
        ...therapistWithLocation,
        distance: calculateDistance(therapistWithLocation.location.zipCode, targetZipcode),
      }
    })
  return therapistWithLocationAndDistance.sort(compareTherapistByDistance)
}

function compareTherapistByDistance(
  therapist1: TherapistWithLocationAndDistance,
  therapist2: TherapistWithLocationAndDistance
): number {
  return compareByDistance(therapist1.distance, therapist2.distance)
}

export function compareByDistance(
  therapist1Distance: DistanceResult,
  therapist2Distance: DistanceResult
): number {
  if (therapist1Distance === UNKNOWN_DISTANCE && therapist2Distance === UNKNOWN_DISTANCE) {
    return 0
  } else if (typeof therapist1Distance === "number" && therapist2Distance === UNKNOWN_DISTANCE) {
    return -1
  } else if (therapist1Distance === UNKNOWN_DISTANCE && typeof therapist2Distance === "number") {
    return 1
  } else if (typeof therapist1Distance === "number" && typeof therapist2Distance === "number") {
    return therapist1Distance - therapist2Distance
  }

  throw new Error(
    "Should be impossible since all cases of compareTherapistByDistance have been covered"
  )
}
