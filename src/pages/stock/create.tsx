import { CreateStock } from 'components';
import { GetServerSideProps } from 'next';
import React from 'react';

const Create = () => <CreateStock />;

export default Create;

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.req.cookies.token) {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    };
  } else {
    return {
      props: {},
    };
  }
};