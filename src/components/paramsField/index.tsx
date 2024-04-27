'use client';
import React from 'react';
import styles from './style.module.scss';
import { Montserrat } from 'next/font/google';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

import Inputs from '../inputs';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Types {
  name: string;
  desc: string;
  default: any;
  borders?: number[];
  disabled?: number[];
}

export default function ParamsField({
  sectionName,
  params,
  mainParams,
  setMainParams,
  shiftNumber = 1,
}: {
  sectionName: string;
  params: Types[];
  colorForSlider: string;
  mainParams: any;
  setMainParams: React.Dispatch<any>;
  shiftNumber?: Number;
}) {
  for (const item in mainParams) {
    const borders = params.find((o) => o.name === item)?.borders;
    if (!borders) {
      continue;
    }
    if (mainParams[item] < borders[0]) {
      const temp: any = {};
      temp[item] = borders[0];
      setMainParams({ ...mainParams, ...temp });
    }
    if (mainParams[item] > borders[1]) {
      const temp: any = {};
      temp[item] = borders[1];
      setMainParams({ ...mainParams, ...temp });
    }
  }

  return (
    <div>
      <h2 className={`${montserrat.className} ${styles.params__title}`}>{sectionName}</h2>
      <ul className={styles.params__section}>
        {params.map((item, index) => (
          <Stack direction="row" gap="20px" alignItems="center" key={`${item.name} ${index}`}>
            <Item
              width="160px"
              flexShrink={0}
              onMouseEnter={(Item: any) => {
                Item.target.parentElement.firstChild.style.opacity = 1;
              }}
              onMouseLeave={(Item: any) => {
                Item.target.parentElement.firstChild.style.opacity = 0;
              }}
              className={styles.description__parent}
            >
              <div id={item.name} style={{ opacity: 0 }} className={styles.description}>
                {item.desc}
              </div>
              <p>{item.name}</p>
            </Item>
            <div>-</div>
            <Inputs
              mainParams={mainParams}
              name={item.name}
              setMainParams={setMainParams}
              params={params}
              shiftNumber={shiftNumber}
            />
          </Stack>
        ))}
      </ul>
    </div>
  );
}
