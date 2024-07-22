import Head from 'next/head'
import Link from 'next/link';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { buildImage } from '@lib/cloudinary';
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
              <div className={styles.heroContent}>
                <h2>{heroTitle}</h2>
                <p>{heroText}</p>
              </div>
              <img className={styles.heroImage} width={heroBackground.width} height={heroBackground.height} src={buildImage(heroBackground.public_id).toURL()} alt="" />
          </Link>
        </div>

        <h2 className={styles.heading}>Articles vedettes</h2>

        <ul className={styles.products}>
          {products.slice(0, 4).map(product => {
            const imageUrl = buildImage(product.image.public_id).resize('w_900,h_900').toURL();
            return (
              <li key={product.slug}>
                <Link href={`/products/${product.slug}`}>
                    <div className={styles.productImage}>
                      <img width={product.width} height={product.height} src={imageUrl} alt={product.slug} />
                    </div>
                    <h3 className={styles.productTitle}>
                      { product.name }
                    </h3>
                    <p className={styles.productPrice}>
                      { product.price } XAF
                    </p>
                </Link>
                <p>
                  <Button className="snipcart-add-item"
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-url={`/products/${product.slug}`}
                    data-item-image={product.image.url}
                    data-item-name={product.name}>
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

export async function getStaticProps({locale}) {
  console.log(locale)
  const client = new ApolloClient({
    uri: 'https://us-east-1-shared-usea1-02.cdn.hygraph.com/content/clyhyneju013107ti6bka6y62/master',
    cache: new InMemoryCache()
  });

  const {data} = await client.query({
    query: gql`
      query HomePage($locale: Locale!) {
        page(where: {slug: "accueil"}) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground
          localizations(locales: [$locale]) {
            heroText
            heroTitle
            locale
          }
        }
        
        products(where: {category_some: {slug: "featured"}}) {
          id
          name
          price
          image
          slug
        }
      }
    `,
    variables: {
      locale
    }
  });
  console.log(data);
  let homePage = data.page;

  if (homePage.localizations.length > 0) {
    homePage = {
      ...homePage,
      ...homePage.localizations[0]
    }
  }
  const products = data.products
  return {
    props: {
      homePage,
      products
    }
  }
}