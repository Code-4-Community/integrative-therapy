import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getTherapist from "app/therapists/queries/getTherapist"
import updateTherapist from "app/therapists/mutations/updateTherapist"
import { TherapistForm, FORM_ERROR } from "app/therapists/components/TherapistForm"

export const EditTherapist = () => {
  const router = useRouter()
  const therapistId = useParam("therapistId", "number")
  const [therapist, { setQueryData }] = useQuery(
    getTherapist,
    { id: therapistId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateTherapistMutation] = useMutation(updateTherapist)

  return (
    <>
      <Head>
        <title>Edit Therapist {therapist.id}</title>
      </Head>

      <div>
        <h1>Edit Therapist {therapist.id}</h1>
        <pre>{JSON.stringify(therapist, null, 2)}</pre>

        <TherapistForm
          submitText="Update Therapist"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateTherapist}
          initialValues={therapist}
          onSubmit={async (values) => {
            try {
              const updated = await updateTherapistMutation({
                id: therapist.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowTherapistPage({ therapistId: updated.id }))
            } catch (error: any) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditTherapistPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditTherapist />
      </Suspense>

      <p>
        <Link href={Routes.TherapistsPage()}>
          <a>Therapists</a>
        </Link>
      </p>
    </div>
  )
}

EditTherapistPage.authenticate = true
EditTherapistPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditTherapistPage
