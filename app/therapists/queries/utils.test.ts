import { coerceToMaybeSearchQuery } from "app/pages/therapists/index"
import { UNKNOWN_DISTANCE } from "integrations/distance/distance"
import { compareByDistance } from "app/therapists/queries/getTherapists"

describe("coerceToMaybeSearchQuery", () => {
  it("should delimit a string array with |", () => {
    expect(coerceToMaybeSearchQuery(["a", "b", "c"])).toEqual("a|b|c")
  })
  it("should delimit a string with spaces with |", () => {
    expect(coerceToMaybeSearchQuery("a b c")).toEqual("a|b|c")
  })
  it("should return the given string if there are no spaces", () => {
    expect(coerceToMaybeSearchQuery("abc")).toEqual("abc")
  })
  it("should return empty string if given undefined", () => {
    expect(coerceToMaybeSearchQuery(undefined)).toEqual("")
  })
  it("should delimit a string array with | even if the contents contain whitespace", () => {
    expect(coerceToMaybeSearchQuery([" a", "b  ", "c"])).toEqual("a|b|c")
  })
})

describe("compareByDistance", () => {
  it("should return 0 if both therapists have an unknown distance", () => {
    expect(compareByDistance(UNKNOWN_DISTANCE, UNKNOWN_DISTANCE)).toBe(0)
  })
  it("should return -1 if therapist 1 is closer than therapist 2", () => {
    expect(compareByDistance(1, 2)).toBeLessThan(0)
  })
  it("should return 1 if therapist 2 is closer than therapist 1", () => {
    expect(compareByDistance(2, 1)).toBeGreaterThan(0)
  })
  it("should return 0 if both therapists are equidistant", () => {
    expect(compareByDistance(1, 1)).toBe(0)
  })
  it("should return a sorted list of distances", () => {
    const distances = [UNKNOWN_DISTANCE, 3, 2, 1, 4, 5, 6, UNKNOWN_DISTANCE]
    distances.sort(compareByDistance)
    expect(distances).toEqual([1, 2, 3, 4, 5, 6, UNKNOWN_DISTANCE, UNKNOWN_DISTANCE])
  })
})
