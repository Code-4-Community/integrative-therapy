import Layout from "app/core/layouts/Layout"
import getTherapists from "app/therapists/queries/getTherapists"
import { BlitzPage, Head, Link, Routes, useQuery, useRouter } from "blitz"
import { Suspense, useRef } from "react"

/**
 * https://www.prisma.io/docs/concepts/components/prisma-client/full-text-search#querying-the-database
 * @example coerceParamToMaybeString(["a", "b", "c"]) // -> "a|b|c"
 * @example coerceParamToMaybeString("a b c") // -> "a|b|c"
 * @example coerceParamToMaybeString("abc")           // -> "abc"
 * @example coerceParamToMaybeString(undefined)       // -> ""
 */
export function coerceToMaybeSearchQuery(param: string[] | string | undefined): string {
  if (Array.isArray(param)) {
    return coerceToMaybeSearchQuery(param.join(" "))
  } else if (typeof param === "string") {
    return param.trim().split(new RegExp("\\s+")).join("|")
  } else {
    return ""
  }
}

export const TherapistsList = () => {
  const router = useRouter()
  const searchQueryParam = coerceToMaybeSearchQuery(router.query.search)
  const [therapists] = useQuery(getTherapists, {
    where: {
      OR: [
        {
          name: {
            contains: searchQueryParam,
            mode: "insensitive",
          },
        },
        {
          description: {
            contains: searchQueryParam,
            mode: "insensitive",
          },
        },
      ],
    },
    orderBy: [
      {
        _relevance: {
          fields: ["name", "description"],
          search: searchQueryParam,
          sort: "desc",
        },
      },
      { id: "asc" },
    ],
    targetZipcode: "02120",
  })

  const searchInput = useRef<HTMLInputElement>(null)

  return (
    <div>
      <form
        onSubmit={(evt) => {
          evt.preventDefault()
          const searchValue = searchInput.current?.value

          router.push({ query: { search: searchValue } })
        }}
      >
        <input
          data-cy="search-input"
          ref={searchInput}
          // Display a simple stringified version of the query param rather than the true query for PostgreSQL
          defaultValue={router.query.search ? router.query.search.toString() : ""}
          type={"search"}
          placeholder="acupuncture"
        />
        <button data-cy="search-button" type="submit">
          Search
        </button>
      </form>
      {therapists.length > 0 && (
        <ul data-cy="therapist-list">
          {therapists.map((therapist) => (
            <li key={therapist.id}>
              <Link href={Routes.ShowTherapistPage({ therapistId: therapist.id })}>
                <a>{therapist.name}</a>
              </Link>
              <span style={{ marginLeft: "1em" }}>
                {therapist.distance} {typeof therapist.distance === "number" && "miles away"}
              </span>
            </li>
          ))}
        </ul>
      )}
      {therapists.length === 0 && (
        <section data-cy="no-results-message">
          <p>
            We&rsquo;re sorry, no therapists were found. Please expand your search criteria and try
            again.
          </p>
          <p>
            <Link href={Routes.TherapistsPage()}>View all therapists</Link>
          </p>
        </section>
      )}
    </div>
  )
}

const TherapistsPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Therapists</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewTherapistPage()}>
            <a>Create Therapist</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <TherapistsList />
        </Suspense>
      </div>
    </>
  )
}

TherapistsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TherapistsPage
