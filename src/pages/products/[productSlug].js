import Head from 'next/head'

import Layout from '@components/Layout';
import Header from '@components/Header';
import Container from '@components/Container';
import Button from '@components/Button';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { buildImage } from '@lib/cloudinary';
import styles from '@styles/Product.module.scss'

export default function Product({product}) {
  const imageUrl = buildImage(product.image.public_id).resize('w_900,h_900').toURL();

  return (
    <Layout>
      <Head>
        <title>{ product.name }</title>
        <meta name="description" content={ product.slug } />
      </Head>

      <Container>
        <div className={styles.productWrapper}>
          <div className={styles.productImage}>
            <img width={product.width} height={product.height} src={imageUrl} alt={product.slug} />
          </div>
          <div className={styles.productContent}>
            <h1>{ product.name }</h1>
            <div className={styles.productDescription} dangerouslySetInnerHTML={{ __html: product.description?.html }} />
            <p className={styles.productPrice}>
              { product.price } XAF
            </p>
            <p className={styles.productBuy}>
              <Button className="snipcart-add-item"
                data-item-id={product.id}
                data-item-price={product.price}
                data-item-url={`/products/${product.slug}`}
                data-item-image={product.image.url}
                data-item-name={product.name}>
                Ajouter au panier
              </Button>
            </p>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, locale }) {
  const client = new ApolloClient({
    uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clyhyneju013107ti6bka6y62/master',
    cache: new InMemoryCache()
  });
console.log(params)
  const {data} = await client.query({
    query: gql`
      query getProduct($slug: String, $locale: Locale!) {
        product(where: {slug: $slug}) {
          id
          image
          name
          slug
          price
          description {
            html
          }
          localizations(locales: [$locale]) {
            description {
              html
            }
            locale
          }
        }
      }
    `,
    variables: {
      slug: params.productSlug,
      locale
    }
  });

  let product = data.product

  if (product.localizations.length > 0) {
    product = {
      ...product,
      ...product.localizations[0]
    }
  }
  return {
    props: {
      product
    }
  }
}

export async function getStaticPaths({ locales }) {
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

  return {
    paths: [
      ...paths,
      ...paths.flatMap(path => {
        return locales.map(locale => {
          return {
            ...path,
            locale
          }
        })
      })
    ],
    fallback: false
  }
}