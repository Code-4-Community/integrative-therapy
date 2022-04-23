import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createTherapist from "app/therapists/mutations/createTherapist"
import { TherapistForm, FORM_ERROR } from "app/therapists/components/TherapistForm"

const NewTherapistPage: BlitzPage = () => {
  const router = useRouter()
  const [createTherapistMutation] = useMutation(createTherapist)

  return (
    <div>
      <h1>Create New Therapist</h1>

      <TherapistForm
        submitText="Create Therapist"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateTherapist}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const therapist = await createTherapistMutation(values)
            router.push(Routes.ShowTherapistPage({ therapistId: therapist.id }))
          } catch (error: any) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.TherapistsPage()}>
          <a>Therapists</a>
        </Link>
      </p>
    </div>
  )
}

NewTherapistPage.authenticate = true
NewTherapistPage.getLayout = (page) => <Layout title={"Create New Therapist"}>{page}</Layout>

export default NewTherapistPage
