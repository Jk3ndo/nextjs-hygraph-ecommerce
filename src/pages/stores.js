import Head from 'next/head'
import { FaExternalLinkAlt } from 'react-icons/fa';

import Layout from '@components/Layout';
import Container from '@components/Container';
import Button from '@components/Button';

import styles from '@styles/Page.module.scss'

export default function Stores() {
  return (
    <Layout>
      <Head>
        <title>My little E-commerce app</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <Container>
        <h1>Locations</h1>

        <div className={styles.stores}>

          <div className={styles.storesLocations}>
            <ul className={styles.locations}>
              <li>
                <p className={styles.locationName}>
                  Name
                </p>
                <address>
                  Address
                </address>
                <p>
                  1234567890
                </p>
                <p className={styles.locationDiscovery}>
                  <button>
                    View on Map
                  </button>
                  <a href="https://www.google.com/maps/" target="_blank" rel="noreferrer">
                    Get Directions
                    <FaExternalLinkAlt />
                  </a>
                </p>
              </li>
            </ul>
          </div>

          <div className={styles.storesMap}>
            <div className={styles.storesMapContainer}>
              <div className={styles.map}>
                Map
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  )
}
