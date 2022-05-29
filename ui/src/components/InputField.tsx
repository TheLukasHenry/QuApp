import React from 'react'
import { useField, ErrorMessage } from 'formik'

interface Props {
    label: string
    name: string
    type: string
}

export const InputField: React.FC<Props> = ({...props}) => {
    const [field, meta] = useField(props)

  return (
    <div className="mb-2 col-lg-6">
        <label htmlFor={field.name}>{props.label}</label>
        <input 
            className={`form-control ${meta.touched && meta.error ? 'is-invalid' : ''}`}
            autoComplete='off'
            {...field} {...props}
        />
        <ErrorMessage name={field.name} component="div" className="validate-error-message" />
    </div>
  )
}

export default InputField