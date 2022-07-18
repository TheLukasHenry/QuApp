import React from 'react'
import { useField, ErrorMessage, Field } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'

interface Props {
  label: string
  name: string
  type: string
  wrapperClasses?: string
  active?: string
}

export const InputField: React.FC<Props> = ({ wrapperClasses, active, ...props }) => {
  const [field, meta] = useField(props)
  const { label, name, type } = props
  const [isEditing, setIsEditing] = React.useState(false)

  if (isEditing || active) {
    return (
      <>
        <div className={`${wrapperClasses} input mr-1`}>
          <div className='position-relative p-0'>
            <label htmlFor={name}>{label}:</label>
            <Field
              className={`input-field ${meta.touched && meta.error ? 'is-invalid' : ''}`}
              autoComplete='off'
              {...field}
              {...props}
              onBlur={(e: any) => {
                setIsEditing(false)
                field.onBlur(e)
              }}
              autoFocus={isEditing || active === 'focused'}
            />
            <div className='focus-border position-absolute'></div>
          </div>
          <ErrorMessage name={field.name} component='div' className='validate-error-message position-absolute' />
        </div>
      </>
    )
  }

  if (!isEditing) {
    return (
      <>
        <div className={`${wrapperClasses} input`}>
          <div className='position-relative'>
            <div
              onClick={() => {
                if (!isEditing) {
                  setIsEditing(true)
                }
              }}
              className='input-btn btn-primary d-inline-block py-auto px-2 position-absolute'
            >
              <FontAwesomeIcon icon={faPen} />
            </div>
            <label htmlFor={name}>{label}:</label>

            <div className={`input-field ${meta.touched && meta.error ? 'is-invalid' : ''}`}>{field.value} </div>
          </div>
          <ErrorMessage name={field.name} component='div' className='validate-error-message position-absolute' />
        </div>
      </>
    )
  }

  return <div></div>
}

export default InputField
