import { MainPageSectionPage } from 'components/PageComponents/MainPageSection'
import { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { getMainPageSectionsList } from 'utils'

const PageName: NextPage = () => <MainPageSectionPage />

export default PageName

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context?.req?.cookies?.token
  const params = context?.query

  if (token) {
    const mainPageSections = await getMainPageSectionsList(params, token)

    return {
      props: {
        initialState: {
          mainPageSections,
        },
      },
    }
  } else {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    }
  }
}
