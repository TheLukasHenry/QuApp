import { ApolloError } from '@apollo/client'
import React from 'react'
interface Props {
    children: ApolloError | undefined
}

export const Error: React.FC<Props> = ({children}) => {

  return (
    <p>{`Error: ${children}`}</p>
  )
}
