import Head from 'next/head'
import { FaExternalLinkAlt } from 'react-icons/fa';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Map from '@components/Map';

import styles from '@styles/Page.module.scss';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export default function Stores({ storeLocations }) {
  return (
    <Layout>
      <Head>
        <title>Our Stores</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1>Locations</h1>

        <div className={styles.stores}>

          <div className={styles.storesLocations}>
            <ul className={styles.locations}>
              { storeLocations.map(store => {
                return (
                  <li key={store.id}>
                    <p className={styles.locationName}>
                      {store.name}
                    </p>
                    <address>
                      {store.address}
                    </address>
                    <p>
                      {store.phoneNumber}
                    </p>
                    <p className={styles.locationDiscovery}>
                      <button>
                        View on Map
                      </button>
                      <a href={`https://www.google.com/maps/dir//${store.location.latitude},${store.location.longitude}/@${store.location.latitude},${store.location.longitude},17z/`} target="_blank" rel="noreferrer">
                        Get Directions
                        <FaExternalLinkAlt />
                      </a>
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className={styles.storesMap}>
            <div className={styles.storesMapContainer}>
                <Map className={styles.map}>
                  {({TileLayer, Marker, Popup}, map) => {
                    const position = [51.505, -0.09];
                    return (
                      <>
                        <TileLayer
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={position}>
                          <Popup>
                            A pretty CSS3 popup. <br /> Easily customizable.
                          </Popup>
                        </Marker>
                      </>
                    );
                  } }
                </Map>
            </div>
          </div>
        </div>
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
      query Locations {
        storeLocations {
          address
          id
          name
          phoneNumber
          location {
            latitude
            longitude
          }
        }
      }
    `
  });
  console.log(data);
  const storeLocations = data.storeLocations;

  return {
    props: {
      storeLocations
    }
  }
}