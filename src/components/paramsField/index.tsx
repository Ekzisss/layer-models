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
  color: 'rgb(240, 74, 74)',
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
  onChange,
}: {
  sectionName: string;
  params: Types[];
  colorForSlider: string;
  mainParams: any;
  setMainParams: React.Dispatch<any>;
  onChange: Function;
}) {
  const [sliderKey, setSliderKey] = React.useState('aaa');

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

  useEffect(() => {
    console.log(mainParams);
    onChange();
  }, [mainParams]);

  for (const item in mainParams) {
    const borders = params.find((o) => o.name === item)?.borders;
    if (!borders) {
      getUpdatingBorders(item);
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

  function getUpdatingBorders(name: string) {
    if (name === 'L') {
      if (
        (mainParams.side === 0 && mainParams.shiftType === 1) ||
        (mainParams.side === 1 && mainParams.shiftType === 0)
      ) {
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

  function changeChoice(value: any, name: string) {
    const temp: any = { ...mainParams };
    temp[name] = value;
    setMainParams(temp);
  }

  function onChangingParams(
    e: any,
    name: string,
    valueNumber: number = 0,
    soleNumber: number | undefined = undefined
  ) {
    if (Number.isNaN(+e.target.value)) {
      return;
    }

    const val: number = +e.target.value;

    const temp: any = {};

    if (mainParams[name] instanceof Array) {
      if (soleNumber !== undefined) {
        const tempArr = mainParams[name];
        if (soleNumber === 0) {
          tempArr[valueNumber] = [val, tempArr[valueNumber]?.at(1)];
        } else {
          tempArr[valueNumber] = [tempArr[valueNumber]?.at(0), val];
        }
        temp[name] = tempArr;
      } else {
        const tempArr = mainParams[name];
        tempArr[valueNumber] = val;
        temp[name] = tempArr;
      }

      console.log(onChange);
    } else {
      temp[name] = val;
    }

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
            value={mainParams.N}
            onChange={(e) => onChangingParams(e, name)}
          />
        );
      case 1:
        return (
          <div className={styles.input_choice}>
            <p>
              <span
                className={mainParams[name] ? styles.active : styles.inactive}
                onClick={() => changeChoice(true, name)}
              >
                True
              </span>
              /
              <span
                onClick={() => changeChoice(false, name)}
                className={!mainParams[name] ? styles.active : styles.inactive}
              >
                False
              </span>
            </p>
          </div>
        );
      case 2:
        return (
          <div className={styles.input_array}>
            {Array.from(Array(name === 'scatterAmount' ? 3 : mainParams.layerCount)).map((_, index) => (
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
                  min={0}
                  max={10}
                  value={mainParams[name][index]}
                  onChange={(e) => onChangingParams(e, name, index)}
                  className={styles.inputWithSlider}
                />
                {index ==
                (name === 'scatterAmount' ? 2 : Array.from(Array(mainParams.layerCount)).length - 1) ? (
                  ''
                ) : (
                  <span>,</span>
                )}
              </div>
            ))}
          </div>
        );
      case 3:
        return (
          <div className={styles.input_array}>
            {Array.from(Array(mainParams.layerCount)).map((_, index) => (
              <div
                // className={styles.input_array}
                key={`${name} ${index}`}
              >
                <input
                  type="text"
                  name=""
                  id=""
                  disabled={
                    params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
                    params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
                    false
                  }
                  onChange={(e) => onChangingParams(e, name, index, 0)}
                  className={styles.inputWithSlider}
                  // value={mainParams[name][index][0]}
                />
                <span>-</span>
                <input
                  type="text"
                  name=""
                  id=""
                  disabled={
                    params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
                    params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
                    false
                  }
                  onChange={(e) => onChangingParams(e, name, index, 1)}
                  className={styles.inputWithSlider}
                  // value={mainParams[name][index][1]}
                />
                {index == Array.from(Array(mainParams.layerCount)).length - 1 ? '' : <span>,</span>}
              </div>
            ))}
          </div>
        );
      case 4:
        return (
          <div className={styles.inputSliderContainer}>
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
                onClick={() => changeChoice(0, name)}
                className={!mainParams[name] ? styles.active : styles.inactive}
              >
                {name == 'side' ? 'left' : 'down'}
              </span>
              /
              <span
                onClick={() => changeChoice(1, name)}
                className={mainParams[name] ? styles.active : styles.inactive}
              >
                {name == 'side' ? 'right' : 'up'}
              </span>
            </p>
          </div>
        );
      case 6:
        return (
          <div className={styles.input_choice}>
            <p>
              <span
                onClick={() => changeChoice(0, name)}
                className={mainParams[name] === 0 ? styles.active : styles.inactive}
              >
                scatter
              </span>
              /
              <span
                onClick={() => changeChoice(1, name)}
                className={mainParams[name] === 1 ? styles.active : styles.inactive}
              >
                smooth
              </span>
              /
              <span
                onClick={() => changeChoice(2, name)}
                className={mainParams[name] === 2 ? styles.active : styles.inactive}
              >
                sole
              </span>
            </p>
          </div>
        );
      case 7:
        return (
          <div className={styles.inputSliderContainer}>
            <Item flexGrow="1">
              <SliderStyle
                defaultValue={params.find((o) => o.name === name)?.default[0] || 0}
                valueLabelDisplay="off"
                min={
                  (name === 'shiftForce' && 1) ||
                  (name === 'Y' && 1) ||
                  (name === 'L' &&
                    ((mainParams.side === 0 && mainParams.shiftType === 1) ||
                      (mainParams.side === 1 && mainParams.shiftType === 0)) &&
                    1) ||
                  -45
                }
                max={mainParams[name][1] || 45}
                value={mainParams || typeof mainParams[name][0] === 'number' ? mainParams[name][0] : 0}
                onChange={(e) => onChangingParams(e, name, 0)}
                key={sliderKey}
              ></SliderStyle>
            </Item>
            <Item
              display={'flex'}
              flexDirection={'row'}
              gap={'3px'}
            >
              <Item
                height={'100%'}
                display={'flex'}
              >
                <input
                  className={styles.inputWithSlider}
                  type="text"
                  name=""
                  value={mainParams[name][0]}
                  onChange={(e) => onChangingParams(e, name, 0)}
                />
              </Item>
              -
              <Item
                height={'100%'}
                display={'flex'}
              >
                <input
                  className={styles.inputWithSlider}
                  type="text"
                  name=""
                  id="1"
                  value={mainParams[name][1]}
                  onChange={(e) => onChangingParams(e, name, 1)}
                />
              </Item>
            </Item>

            <Item flexGrow="1">
              <SliderStyle
                defaultValue={params.find((o) => o.name === name)?.default[1] || 0}
                valueLabelDisplay="off"
                min={mainParams[name][0] || -45}
                max={
                  (name === 'shiftForce' && mainParams.NY) ||
                  (name === 'Y' && mainParams.NX) ||
                  (name === 'L' &&
                    ((mainParams.side === 0 && mainParams.shiftType === 1) ||
                      (mainParams.side === 1 && mainParams.shiftType === 0)) &&
                    45) ||
                  -1
                }
                value={mainParams || typeof mainParams[name][1] === 'number' ? mainParams[name][1] : 0}
                onChange={(e) => onChangingParams(e, name, 1)}
                key={sliderKey}
              ></SliderStyle>
            </Item>
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
            {typeSwitch(item.type, item.name)}
          </Stack>
        ))}
      </ul>
    </div>
  );
}
