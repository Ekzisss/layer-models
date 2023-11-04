import React from 'react';
import styles from './style.module.scss';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Types {
  name: string;
  desc: string;
  type: number;
  default: any;
}

export default function ParamsField({ sectionName, params }: { sectionName: string; params: Types[] }) {
  return (
    <div>
      <h2 className={`${montserrat.className} ${styles.params__title}`}>{sectionName}</h2>
      <ul className={styles.params__section}>
        {params.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}
