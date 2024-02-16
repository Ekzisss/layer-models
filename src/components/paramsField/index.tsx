'use client';
import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { Montserrat } from 'next/font/google';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

import { styled } from '@mui/material/styles';
import Inputs from '../inputs';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Types {
  name: string;
  desc: string;
  type: number;
  default: any;
  borders?: number[];
  disabled?: number[];
}

export default function ParamsField({
  sectionName,
  params,
  colorForSlider,
  mainParams,
  setMainParams,
}: {
  sectionName: string;
  params: Types[];
  colorForSlider: string;
  mainParams: any;
  setMainParams: React.Dispatch<any>;
}) {
  const [sliderKey, setSliderKey] = React.useState('aaa');

  // useEffect(() => {
  //   setSliderKey((sliderKey) => sliderKey + 'b');
  //   SliderStyle = styled(Slider)({
  //     color: colorForSlider,
  //     '& .MuiSlider-thumb': {
  //       height: 15,
  //       width: 15,
  //       backgroundColor: '#fff',
  //       border: '2px solid currentColor',
  //       '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
  //         boxShadow: 'inherit',
  //       },
  //       '&:before': {
  //         display: 'none',
  //       },
  //       '&:after': {
  //         display: 'none',
  //       },
  //     },
  //   });
  // }, [colorForSlider]);

  // for (const item in mainParams) {
  //   const borders = params.find((o) => o.name === item)?.borders;
  //   if (!borders) {
  //     getUpdatingBorders(item);
  //     continue;
  //   }
  //   if (mainParams[item] < borders[0]) {
  //     const temp: any = {};
  //     temp[item] = borders[0];
  //     setMainParams({ ...mainParams, ...temp });
  //   }
  //   if (mainParams[item] > borders[1]) {
  //     const temp: any = {};
  //     temp[item] = borders[1];
  //     setMainParams({ ...mainParams, ...temp });
  //   }
  // }

  function getUpdatingBorders(name: string) {
    if (name === 'L') {
      if ((!mainParams.side && mainParams.shiftType) || (mainParams.side && !mainParams.shiftType)) {
        if (mainParams[name][0] < 1) {
          mainParams[name][0] = 1;
        }
        if (mainParams[name][1] > 45) {
          mainParams[name][1] = 45;
        }
        if (mainParams[name][1] < mainParams[name][0] && mainParams[name][1] < 1) {
          mainParams[name][1] = mainParams[name][0];
        }
        if (mainParams[name][0] > mainParams[name][1] && mainParams[name][0] > 45) {
          mainParams[name][0] = mainParams[name][1];
        }
      } else {
        if (mainParams[name][0] < -45) {
          mainParams[name][0] = -45;
        }
        if (mainParams[name][1] > -1) {
          mainParams[name][1] = -1;
        }
        if (mainParams[name][1] < mainParams[name][0] && mainParams[name][1] < -45) {
          mainParams[name][1] = mainParams[name][0];
        }
        if (mainParams[name][0] > mainParams[name][1] && mainParams[name][0] > -1) {
          mainParams[name][0] = mainParams[name][1];
        }
      }
    }
    if (name === 'Y') {
      if (mainParams[name][1] < mainParams[name][0] && mainParams[name][1] < 1) {
        mainParams[name][1] = mainParams[name][0];
      }
      if (mainParams[name][0] > mainParams[name][1] && mainParams[name][0] > mainParams.NX) {
        mainParams[name][0] = mainParams[name][1];
      }

      if (mainParams[name][1] > mainParams.NX) {
        mainParams[name][1] = mainParams.NX;
      }
      if (mainParams[name][0] < 1) {
        mainParams[name][0] = 1;
      }
    }

    if (name === 'shiftForce') {
      if (mainParams[name][1] < mainParams[name][0] && mainParams[name][1] < 1) {
        mainParams[name][1] = mainParams[name][0];
      }
      if (mainParams[name][0] > mainParams[name][1] && mainParams[name][0] > mainParams.NY) {
        mainParams[name][0] = mainParams[name][1];
      }

      if (mainParams[name][1] > mainParams.NY) {
        mainParams[name][1] = mainParams.NY;
      }
      if (mainParams[name][0] < 1) {
        mainParams[name][0] = 1;
      }
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
            key={`${item.name} ${index}`}
          >
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
              <div
                id={item.name}
                style={{ opacity: 0 }}
                className={styles.description}
              >
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
            />
          </Stack>
        ))}
      </ul>
    </div>
  );
}
