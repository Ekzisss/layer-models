'use client';
import React from 'react';
import styles from './style.module.scss';
import { Montserrat } from 'next/font/google';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import vars from '../../../src/app/vars.module.scss';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Types {
  name: string;
  desc: string;
  type: number;
  default: any;
}

const SliderStyle = styled(Slider)({
  color: vars.primary,
});

export default function ParamsField({ sectionName, params }: { sectionName: string; params: Types[] }) {
  const layerCount = 3;
  const arr = Array.from(Array(layerCount));

  function typeSwitch(param: Number, name: string) {
    switch (param) {
      case 0:
        return (
          <input
            className={styles.input_text}
            type="text"
            name=""
            id=""
          />
        );
      case 1:
        return (
          <div className={styles.input_choice}>
            <p>
              <span>True</span>/<span>False</span>
            </p>
          </div>
        );
      case 2:
        return (
          <div className={styles.input_array}>
            {arr.map((_, index) => (
              <>
                <input
                  key={index}
                  type="text"
                  name=""
                  id=""
                />
                {index == arr.length - 1 ? '' : <span key={index}>,</span>}
              </>
            ))}
          </div>
        );
      case 3:
        return (
          <div className={styles.input_array}>
            {arr.map((_, index) => (
              <div key={index}>
                <input
                  key={index}
                  type="text"
                  name=""
                  id=""
                />
                <input
                  key={index}
                  type="text"
                  name=""
                  id=""
                />
                {index == arr.length - 1 ? '' : <span key={index}>,</span>}
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          // <input
          //   className={styles.input_range}
          //   type="range"
          //   name=""
          //   id=""
          // />
          <Item flexGrow="1">
            <SliderStyle
              defaultValue={30}
              valueLabelDisplay="auto"
              min={20}
              max={45}
            ></SliderStyle>
          </Item>
        );
      case 5:
        return (
          <div className={styles.input_choice}>
            <p>
              <span>{name == 'side' ? 'left' : 'up'}</span>/<span>{name == 'side' ? 'right' : 'down'}</span>
            </p>
          </div>
        );
      default:
        return (
          <input
            type="text"
            name=""
            id=""
          />
        );
    }
  }

  return (
    <div>
      <h2 className={`${montserrat.className} ${styles.params__title}`}>{sectionName}</h2>
      <ul className={styles.params__section}>
        {params.map((item, index) => (
          <Stack
            direction="row"
            gap="20px"
            alignItems="center"
            key={index}
          >
            <Item width="200px">{item.name}</Item>
            {/* <label
              key={index}
              htmlFor=""
            >
              {item.name}
            </label> */}
            <div key={index}>-</div>
            {typeSwitch(item.type, item.name)}
          </Stack>
          // <li key={index}>
          //   <label
          //     key={index}
          //     htmlFor=""
          //   >
          //     {item.name}
          //   </label>
          //   <div key={index}>-</div>
          //   {typeSwitch(item.type, item.name)}
          // </li>
        ))}
      </ul>
    </div>
  );
}
