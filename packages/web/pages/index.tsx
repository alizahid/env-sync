import { GetServerSideProps, NextPage } from 'next'

const Home: NextPage = () => null

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: 'https://github.com/alizahid/env-sync',
    permanent: true
  }
})

export default Home
