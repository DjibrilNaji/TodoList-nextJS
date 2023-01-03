import { Field } from "formik"

const FormField = (props) => {
  const { name, label } = props

  return (
    <>
      <Field name={name}>
        {({ field, meta }) => (
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold">{label}</span>
            <input {...field} className="border-2 px-2 py-1 rounded-lg" />
            {meta.touched && meta.error ? (
              <span className="text-red-600">{meta.error}</span>
            ) : null}
          </label>
        )}
      </Field>
    </>
  )
}

export default FormField
