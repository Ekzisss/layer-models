'use client';
import React from 'react';
import styles from './style.module.scss';
import { Montserrat } from 'next/font/google';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Item from '@mui/material/Stack';

import { styled } from '@mui/material/styles';

const montserrat = Montserrat({ subsets: ['latin'] });

interface Types {
  name: string;
  desc: string;
  type: number;
  default: any;
}

export default function ParamsField({
  sectionName,
  params,
  colorForSlider,
}: {
  sectionName: string;
  params: Types[];
  colorForSlider: string;
}) {
  const [mainParams, setMainParams] = React.useState<any>({
    N: 10,
    multiprocess: false,
    withoutShift: false,
    NX: 60,
    NY: 30,
    numberOfLayers: 3,
    layerThickness: [10, 30, 1000000],
    scatterMaxValue: 5,
    scatterPeriod: 2,
    smoothness: false,
    scatterAmount: [],
    sole: [],
    center: 0,
    angle: 0,
    shiftForce: 10,
    side: 0,
    shiftType: 0,
    shiftCount: 1,
  });

  const SliderStyle = styled(Slider)({
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

  console.log(mainParams);

  const layerCount = 3;
  const arr = Array.from(Array(layerCount));

  function chanheChoice(value: any, name: string) {
    const temp: any = { ...mainParams };
    temp[name] = value;
    setMainParams(temp);
  }

  function onChangingParams(e: any, name: string) {
    const val: number = +e.target.value;

    const temp: any = { ...mainParams };
    temp[name] = val;
    setMainParams(temp);
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
                className={mainParams[name] ? styles.active : ''}
                onClick={() => chanheChoice(true, name)}
              >
                True
              </span>
              /
              <span
                onClick={() => chanheChoice(false, name)}
                className={!mainParams[name] ? styles.active : ''}
              >
                False
              </span>
            </p>
          </div>
        );
      case 2:
        return (
          <div className={styles.input_array}>
            {arr.map((_, index) => (
              <>
                <input
                  type="text"
                  name=""
                  id=""
                />
                {index == arr.length - 1 ? '' : <span>,</span>}
              </>
            ))}
          </div>
        );
      case 3:
        return (
          <div className={styles.input_array}>
            {arr.map((_, index) => (
              <div key={`${name} ${index}`}>
                <input
                  type="text"
                  name=""
                  id=""
                />
                <input
                  type="text"
                  name=""
                  id=""
                />
                {index == arr.length - 1 ? '' : <span>,</span>}
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className={styles.inputSliderContaier}>
            <Item width={20}>
              <input
                className={styles.inputWithSlider}
                type="text"
                name=""
                id=""
                value={mainParams[name]}
                onChange={(e) => onChangingParams(e, name)}
              />
            </Item>
            <Item flexGrow="1">
              <SliderStyle
                defaultValue={30}
                valueLabelDisplay="off"
                min={20}
                max={45}
                value={typeof mainParams[name] === 'number' ? mainParams[name] : 0}
                onChange={(e) => onChangingParams(e, name)}
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
                className={!mainParams[name] ? styles.active : ''}
              >
                {name == 'side' ? 'left' : 'up'}
              </span>
              /
              <span
                onClick={() => chanheChoice(1, name)}
                className={mainParams[name] ? styles.active : ''}
              >
                {name == 'side' ? 'right' : 'down'}
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
