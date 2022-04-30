import Layout from "app/core/layouts/Layout"
import getTherapists from "app/therapists/queries/getTherapists"
import { BlitzPage, Head, Link, Routes, usePaginatedQuery, useRouter } from "blitz"
import { Suspense } from "react"

const ITEMS_PER_PAGE = 20

/**
 * @example coerceParamToMaybeString(["a", "b", "c"]) // -> "a,b,c"
 * @example coerceParamToMaybeString("abc")           // -> "abc"
 * @example coerceParamToMaybeString(undefined)       // -> undefined
 */
function coerceParamToMaybeString(param: string[] | string | undefined): string | undefined {
  if (Array.isArray(param)) {
    return param.join(",")
  }
  return param
}

export const TherapistsList = () => {
  const router = useRouter()
  const search = coerceParamToMaybeString(router.query.search)
  const page = Number(router.query.page) || 0
  const [{ therapists, hasMore }] = usePaginatedQuery(getTherapists, {
    where: {
      name: {
        search: search,
      },
      description: {
        search: search,
      },
    },
    orderBy: search === undefined ? { id: "asc" } : undefined,
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {therapists.map((therapist) => (
          <li key={therapist.id}>
            <Link href={Routes.ShowTherapistPage({ therapistId: therapist.id })}>
              <a>{therapist.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
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

TherapistsPage.authenticate = false
TherapistsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TherapistsPage
