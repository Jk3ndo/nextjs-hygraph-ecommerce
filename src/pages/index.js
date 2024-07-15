import Head from 'next/head'
import Link from 'next/link';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '@styles/Page.module.scss'

export default function Home({ homePage, products }) {
  console.log(homePage);
  console.log(products);
  const { heroTitle, heroText, heroLink, heroBackground } = homePage;
  return (
    <Layout>
      <Head>
        <title>Tiny Store</title>
        <meta name="description" content="Get your Tiny Store!" />
      </Head>

      <Container>
        <h1 className="sr-only">Tiny Store</h1>

        <div className={styles.hero}>
          <Link href={heroLink}>
            <a>
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height} src={heroBackground.url} alt="" />
            </a>
          </Link>
        </div>

        <h2 className={styles.heading}>Articles vedettes</h2>

        <ul className={styles.products}>
          {products.slice(0, 4).map(product => {
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                  <a>
                    <div className={styles.productImage}>
                      <img width={product.width} height={product.height} src={product.image.url} alt={product.slug} />
                    </div>
                    <h3 className={styles.productTitle}>
                      { product.name }
                    </h3>
                    <p className={styles.productPrice}>
                      { product.price } XAF
                    </p>
                  </a>
                </Link>
                <p>
                  <Button>
                    Ajouter au panier
                  </Button>
                </p>
              </li>
            )
          })}
        </ul>
      </Container>
    </Layout>
  )
}

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clyhyneju013107ti6bka6y62/master',
    cache: new InMemoryCache()
  });

  const {data} = await client.query({
    query: gql`
      query HomePage {
        page(where: {slug: "accueil"}) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground
        }
        
        products(first: 4) {
          id
          name
          price
          slug
          image
        }
      }
    `
  });
  console.log(data);
  const homePage = data.page;
  const products = data.products
  return {
    props: {
      homePage,
      products
    }
  }
}