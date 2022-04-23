import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTherapist from "app/therapists/queries/getTherapist"
import deleteTherapist from "app/therapists/mutations/deleteTherapist"

export const Therapist = () => {
  const router = useRouter()
  const therapistId = useParam("therapistId", "number")
  const [deleteTherapistMutation] = useMutation(deleteTherapist)
  const [therapist] = useQuery(getTherapist, { id: therapistId })

  return (
    <>
      <Head>
        <title>Therapist {therapist.id}</title>
      </Head>

      <div>
        <h1>Therapist {therapist.id}</h1>
        <pre>{JSON.stringify(therapist, null, 2)}</pre>

        <Link href={Routes.EditTherapistPage({ therapistId: therapist.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteTherapistMutation({ id: therapist.id })
              router.push(Routes.TherapistsPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowTherapistPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.TherapistsPage()}>
          <a>Therapists</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Therapist />
      </Suspense>
    </div>
  )
}

ShowTherapistPage.authenticate = true
ShowTherapistPage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowTherapistPage
