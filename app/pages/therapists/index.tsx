import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTherapists from "app/therapists/queries/getTherapists"

const ITEMS_PER_PAGE = 3

export const TherapistsList = () => {
  const router = useRouter()
  const searchQuery = router.query.search || undefined
  const page = Number(router.query.page) || 0
  const [{ therapists, hasMore }] = usePaginatedQuery(getTherapists, {
    where: {
      body: {
        search: searchQuery,
      }
    },
    orderBy: { id: "asc" },
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

TherapistsPage.authenticate = true
TherapistsPage.getLayout = (page) => <Layout>{page}</Layout>

export default TherapistsPage
