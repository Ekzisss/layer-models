import Image from 'next/image';
import styles from './page.module.scss';
import { Montserrat } from 'next/font/google';
import ParamsField from '../components/paramsField';
import './globals.scss';
import params from '../../public/params.json';

const montserrat = Montserrat({ subsets: ['latin'] });

import DarkModeIcon from '@mui/icons-material/DarkMode';

// types
// 0 - textbox
// 1 - checkbox
// 2 - array
// 3 - array of array1
// 4 - slider
// 5 - choice

export default function Home() {
  // const params = [
  //   {
  //     sectionName: 'Основные',
  //     params: [
  //       { name: 'number of models', desc: '', type: 0, default: 10 },
  //       { name: 'multiprocess', desc: '', type: 1, default: 'False' },
  //       { name: 'withoutShift', desc: '', type: 1, default: 'False' },
  //     ],
  //   },
  // ];

  return (
    <div className={styles.base}>
      <div className={styles.bg}>
        <div className={`${styles.main} ${styles.main_decoration}`}>
          <div className={styles.leftSide}>
            <div className={styles.leftSide__up}></div>
            <div className={styles.leftSide__down}></div>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.rightSide__up}></div>
            <div className={styles.rightSide__down}></div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.leftSide}>
            <div className={`${styles.leftSide__up} ${styles.leftSide__up_real} ${styles.real}`}>
              <h1 className={styles.params__title_main}>Параметры</h1>
              <section className={styles.params}>
                {params.map((item, index) => (
                  <ParamsField
                    key={index}
                    sectionName={item.sectionName}
                    params={item.params}
                  ></ParamsField>
                ))}
              </section>
            </div>
            <div className={`${styles.leftSide__down} ${styles.real}`}></div>
          </div>
          <div className={styles.rightSide}>
            <div className={`${styles.rightSide__up} ${styles.rightSide__up_real} ${styles.real}`}>
              <div className={styles.circle}>
                <p>?</p>
              </div>
              <div className={styles.elipse}>
                <p>
                  <span className={styles.languageActive}>ru</span> / <span>en</span>
                </p>
              </div>
              <div className={styles.circle}>
                <DarkModeIcon className={styles.darkMode}></DarkModeIcon>
              </div>
            </div>
            <div className={`${styles.rightSide__down} ${styles.rightSide__down_real}  ${styles.real}`}>
              <div className={styles.display}>
                <div className={styles.display__mask}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
