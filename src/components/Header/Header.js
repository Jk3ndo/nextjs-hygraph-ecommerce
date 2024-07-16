import Link from 'next/link';
import { useSnipcart } from 'use-snipcart';
import { FaShoppingCart } from 'react-icons/fa';

import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  const { cart = {} } = useSnipcart();
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Tiny Store</a>
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/categories/vetement">
              <a>Vêtements</a>
            </Link>
          </li>
          <li>
            <Link href="/categories/accessoires">
              <a>Accessoires</a>
            </Link>
          </li>
          <li>
            <Link href="/stores">
              <a>Find a store</a>
            </Link>
          </li>
        </ul>
        <p className={styles.headerCart}>
          <button className='snipcart-checkout'>
            <FaShoppingCart />
            <span>
              {cart.subtotal} XAF
            </span>
          </button>
        </p>
        <ul className={styles.headerLocales}>
          <li>
            <Link href="#">
              <a>
                DK
              </a>
            </Link>
          </li>
        </ul>
      </Container>
    </header>
  )
}

export default Header;