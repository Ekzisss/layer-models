import React from 'react';
import styles from '../inputStyle.module.scss';
import Slider from '@mui/material/Slider';
import Item from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

let SliderStyle = styled(Slider)({
  color: 'rgba(240, 74, 74)',
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

export default function SliderInput({
  mainParams,
  name,
  onChangingParams,
  params,
}: {
  mainParams: any;
  name: string;
  onChangingParams: Function;
  params: any;
}) {
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
          onChange={(e: any) => onChangingParams(e, name)}
          disabled={
            params.find((o: any) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
            params.find((o: any) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
            false
          }
        />
      </Item>
      <Item flexGrow="1">
        <SliderStyle
          defaultValue={params.find((o: any) => o.name === name)?.default || 0}
          valueLabelDisplay="off"
          min={params.find((o: any) => o.name === name)?.borders?.at(0) || (name == 'center' && 0) || 20}
          max={
            params.find((o: any) => o.name === name)?.borders?.at(1) ||
            (name == 'center' && mainParams.NX) ||
            45
          }
          value={mainParams || typeof mainParams[name] === 'number' ? mainParams[name] : 0}
          onChange={(e: any) => onChangingParams(e, name)}
          disabled={
            params.find((o: any) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
            params.find((o: any) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
            false
          }
          // key={sliderKey}
        ></SliderStyle>
      </Item>
    </div>
  );
}
