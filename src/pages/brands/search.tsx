import { BrandsPage } from 'components';
import { GetServerSideProps, NextPage } from 'next';
import { getBrandsList, search_in } from 'utils';

const PageName: NextPage = () => <BrandsPage />;
export default PageName;
export const getServerSideProps: GetServerSideProps = async (context) => {
  if (context?.req?.cookies?.token) {
    const { data: result } = await search_in('brands', context.query, context.query, context.req.cookies.token);

    return {
      props: {
        initialState: {
          brands: {
            data: result,
            fields: [
              'id',
              'name',
              'created_at',
              'updated_at',
              'meta_title',
              'meta_keywords',
              'meta_description',
              'title_page',
              'tagtext',
            ],
          },
        },
      },
    };
  } else {
    return {
      props: {},
      redirect: {
        destination: '/auth/login',
      },
    };
  }
};
