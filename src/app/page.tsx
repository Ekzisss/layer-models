import Image from 'next/image';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div>
      <div className={styles.bg}>
        {' '}
        <main className={`${styles.main} ${styles.main_decoration}`}>
          <div className={styles.leftSide}>
            <div className={styles.leftSide__up}></div>
            <div className={styles.leftSide__down}></div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.rightSide__up}></div>
            <div className={styles.rightSide__down}></div>
          </div>
        </main>
      </div>
    </div>
  );
}
