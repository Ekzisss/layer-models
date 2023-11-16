'use client';
import React, { useEffect } from 'react';
import styles from './style.module.scss';
import { Montserrat } from 'next/font/google';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

import { styled } from '@mui/material/styles';

const montserrat = Montserrat({ subsets: ['latin'] });

let SliderStyle = styled(Slider)({
  color: '#f81dfd',
  '& .MuiSlider-thumb': {
    height: 15,
    width: 15,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },
    '&:before': {
      display: 'none',
    },
    '&:after': {
      display: 'none',
    },
  },
});

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

  // console.log(mainParams);

  useEffect(() => {
    setSliderKey((sliderKey) => sliderKey + 'b');
    SliderStyle = styled(Slider)({
      color: colorForSlider,
      '& .MuiSlider-thumb': {
        height: 15,
        width: 15,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
          boxShadow: 'inherit',
        },
        '&:before': {
          display: 'none',
        },
        '&:after': {
          display: 'none',
        },
      },
    });
  }, [colorForSlider]);

  // console.log(mainParams);
  // for (const [key, value] of Object.entries(mainParams)) {
  //   console.log(key, value);

  //   const borders = params.find((o) => o.name === key)?.borders;
  //   if (!borders) {
  //     return;
  //   }
  //   if (value < borders[0]) {
  //     const temp: any = {};
  //     temp[key] = value;
  //     setMainParams({ ...mainParams, ...temp });
  //   }
  //   return;
  // }

  for (const k in mainParams) {
    const borders = params.find((o) => o.name === k)?.borders;
    if (!borders) {
      continue;
    }
    if (mainParams[k] < borders[0]) {
      const temp: any = {};
      temp[k] = borders[0];
      setMainParams({ ...mainParams, ...temp });
    }
    if (mainParams[k] > borders[1]) {
      const temp: any = {};
      temp[k] = borders[1];
      setMainParams({ ...mainParams, ...temp });
    }
  }

  function chanheChoice(value: any, name: string) {
    const temp: any = { ...mainParams };
    temp[name] = value;
    setMainParams(temp);
  }

  function onChangingParams(e: any, name: string, ...rest: any[]) {
    const val: number = +e.target.value;

    const temp: any = {};
    temp[name] = val;

    setMainParams({ ...mainParams, ...temp });
  }

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
              <span
                className={mainParams[name] ? styles.active : styles.unactive}
                onClick={() => chanheChoice(true, name)}
              >
                True
              </span>
              /
              <span
                onClick={() => chanheChoice(false, name)}
                className={!mainParams[name] ? styles.active : styles.unactive}
              >
                False
              </span>
            </p>
          </div>
        );
      case 2:
        return (
          <div className={styles.input_array}>
            {Array.from(Array(mainParams.numberOfLayers)).map((_, index) => (
              <div key={`${name} ${index} 1`}>
                <input
                  type="text"
                  name=""
                  id=""
                  disabled={
                    params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
                    params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
                    false
                  }
                />
                {index == Array.from(Array(mainParams.numberOfLayers)).length - 1 ? '' : <span>,</span>}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className={styles.input_array}>
            {Array.from(Array(mainParams.numberOfLayers)).map((_, index) => (
              <div key={`${name} ${index}`}>
                <input
                  type="text"
                  name=""
                  id=""
                  disabled={
                    params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
                    params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
                    false
                  }
                />
                <input
                  type="text"
                  name=""
                  id=""
                  disabled={
                    params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
                    params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
                    false
                  }
                />
                {index == Array.from(Array(mainParams.numberOfLayers)).length - 1 ? '' : <span>,</span>}
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className={styles.inputSliderContaier}>
            <Item
              height={'100%'}
              display={'flex'}
            >
              <input
                className={styles.inputWithSlider}
                type="text"
                name=""
                id=""
                value={mainParams[name]}
                onChange={(e) => onChangingParams(e, name)}
                disabled={
                  params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
                  params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
                  false
                }
              />
            </Item>
            <Item flexGrow="1">
              <SliderStyle
                defaultValue={params.find((o) => o.name === name)?.default || 0}
                valueLabelDisplay="off"
                min={params.find((o) => o.name === name)?.borders?.at(0) || (name == 'center' && 0) || 20}
                max={
                  params.find((o) => o.name === name)?.borders?.at(1) ||
                  (name == 'center' && mainParams.NX) ||
                  45
                }
                value={mainParams || typeof mainParams[name] === 'number' ? mainParams[name] : 0}
                onChange={(e) => onChangingParams(e, name)}
                disabled={
                  params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
                  params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
                  false
                }
                key={sliderKey}
              ></SliderStyle>
            </Item>
          </div>
        );
      case 5:
        return (
          <div className={styles.input_choice}>
            <p>
              <span
                onClick={() => chanheChoice(0, name)}
                className={!mainParams[name] ? styles.active : styles.unactive}
              >
                {name == 'side' ? 'left' : 'up'}
              </span>
              /
              <span
                onClick={() => chanheChoice(1, name)}
                className={mainParams[name] ? styles.active : styles.unactive}
              >
                {name == 'side' ? 'right' : 'down'}
              </span>
            </p>
          </div>
        );
      case 6:
        return (
          <div className={styles.input_choice}>
            <p>
              <span
                onClick={() => chanheChoice(0, name)}
                className={mainParams[name] === 0 ? styles.active : styles.unactive}
              >
                scatter
              </span>
              /
              <span
                onClick={() => chanheChoice(1, name)}
                className={mainParams[name] === 1 ? styles.active : styles.unactive}
              >
                smooth
              </span>
              /
              <span
                onClick={() => chanheChoice(2, name)}
                className={mainParams[name] === 2 ? styles.active : styles.unactive}
              >
                sole
              </span>
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
            key={`${item.name} ${index}`}
          >
            <Item width="200px">{item.name}</Item>
            <div>-</div>
            {typeSwitch(item.type, item.name)}
          </Stack>
        ))}
      </ul>
    </div>
  );
}
