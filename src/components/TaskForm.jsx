import Button from "@/components/Button"
import FormField from "@/components/FormField"
import { Form, Formik } from "formik"
import Link from "next/link"
import * as yup from "yup"

const defaultInitialValues = {
  description: "",
}

const defaultValidationSchema = yup.object().shape({
  description: yup
    .string()
    .required("Enter a description please")
    .label("Description"),
})

const TaskForm = (props) => {
  const {
    buttonName,
    onSubmit,
    initialValues = defaultInitialValues,
    validationSchema = defaultValidationSchema,
  } = props

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      <Form className="flex flex-col gap-4 p-4">
        <FormField name="description" type="text" label="Description" />
        <div className="ml-auto">
          <Link href={"/"} className="font-bold">
            Cancel
          </Link>
          <Button type="submit" variant="secondary" size="md" className="ml-3">
            {buttonName}
          </Button>
        </div>
      </Form>
    </Formik>
  )
}
export default TaskForm
