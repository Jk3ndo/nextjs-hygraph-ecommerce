import Link from 'next/link';
import { useSnipcart } from 'use-snipcart';
import { FaShoppingCart } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Container from '@components/Container';

import styles from './Header.module.scss';

const Header = () => {
  const { locale: activeLocale, locales, asPath } = useRouter();
  const availableLocales = locales.filter(locale => locale !== activeLocale);

  const { cart = {} } = useSnipcart();
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            Tiny Store
          </Link>
        </p>
        <ul className={styles.headerLinks}>
          <li>
            <Link href="/categories/vetement">
              Vêtements
            </Link>
          </li>
          <li>
            <Link href="/categories/accessoires">
              Accessoires
            </Link>
          </li>
          <li>
            <Link href="/stores">
              Find a store
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
          {availableLocales.map((locale) => {
            return (
              <>
                <li key={locale}>
                  <Link href={asPath} locale={locale}>
                      {locale.toUpperCase()}
                  </Link>
                </li>
              </>
            )
          })}
        </ul>
      </Container>
    </header>
  )
}

export default Header;