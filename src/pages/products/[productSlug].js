import Head from 'next/head'

import Layout from '@components/Layout';
import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import styles from '@styles/Product.module.scss'

export default function Product({product}) {
  return (
    <Layout>
      <Head>
        <title>{ product.name }</title>
        <meta name="description" content={ product.slug } />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <img width={product.width} height={product.height} src={product.image.url} alt={product.slug} />
          </div>
          <div className={styles.productContent}>
            <h1>{ product.name }</h1>
            <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.description?.html }} />
            <p className={styles.productPrice}>
              { product.price } XAF
            </p>
            <p className={styles.productBuy}>
              <Button>
                Ajouter au panier
              </Button>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clyhyneju013107ti6bka6y62/master',
    cache: new InMemoryCache()
  });
console.log(params)
  const {data} = await client.query({
    query: gql`
      query getProduct($slug: String) {
        product(where: {slug: $slug}) {
          id
          image
          name
          slug
          price
          description {
            html
          }
        }
      }
    `,
    variables: {
      slug: params.productSlug
    }
  });

  const product = data.product
  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clyhyneju013107ti6bka6y62/master',
    cache: new InMemoryCache()
  });

  const {data} = await client.query({
    query: gql`
      query ProductPage {
        products {
          id
          name
          price
          slug
          image
        }
      }
    `
  });
  // console.log('data', data);
  const paths = data.products.map(product => {
    return {
      params: {
        productSlug: product.slug
      }
    }
  })
  console.log(paths)
  return {
    paths,
    fallback: false
  }
}