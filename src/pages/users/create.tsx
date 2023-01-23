import { CreateUser } from 'components'
import { GetServerSideProps } from 'next'
import React from 'react'
import { PermissionEnum } from 'types'
import { $_get_roles_list, asyncHas } from 'utils'

const Create = () => <CreateUser />

export default Create

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies[process.env.TOKEN!]
  if (!token) {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    }
  } else {
    if (!(await asyncHas(PermissionEnum.editUser, token)))
      return {
        props: {},
        redirect: {
          destination: '/dashboard',
        },
      }
    const roles = await $_get_roles_list({}, context?.req?.cookies?.[process.env.TOKEN!])
    return {
      props: {
        initialState: {
          roles
        }
      },
    }
  }
}
