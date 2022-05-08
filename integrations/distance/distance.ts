import { distance } from "zipcodes"

export const UNKNOWN_DISTANCE = "unknown distance" as const

export type DistanceResult = number | typeof UNKNOWN_DISTANCE

/**
 * Produces the distance between two zipcodes in miles.
 * Assumes both strings are valid zipcodes.
 * If a distance cannot be computed, returns "unknown"
 *
 * @example calculateDistance(02115, 02120) -> 5 // (I dont actually know, just guessing here)
 * @example calculateDistance(99320, 92614) -> "unknown"
 */
export function calculateDistance(zipcode1: string, zipcode2: string): DistanceResult {
  return distance(zipcode1, zipcode2) ?? UNKNOWN_DISTANCE
}
