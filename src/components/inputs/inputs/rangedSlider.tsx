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

export default function RangedSlider({
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
  const borders: any = {
    Y: [0, 'NX'],
    L: [
      (!mainParams.side && !mainParams.shiftType) || (mainParams.side && mainParams.shiftType) ? -45 : 1,
      (!mainParams.side && !mainParams.shiftType) || (mainParams.side && mainParams.shiftType) ? -1 : 45,
    ],
    shiftForce: [0, 'NY'],
  };
  return (
    <SliderStyle
      getAriaLabel={() => 'Temperature range'}
      defaultValue={params.find((o: any) => o.name === name)?.default || 0}
      valueLabelDisplay="auto"
      value={mainParams[name]}
      min={typeof borders[name][0] === 'number' ? borders[name][0] : mainParams[borders[name][0]]}
      max={typeof borders[name][1] === 'number' ? borders[name][1] : mainParams[borders[name][1]]}
      // max={
      //   params.find((o: any) => o.name === name)?.borders?.at(1) ||
      //   (name == 'center' && mainParams.NX) ||
      //   45
      // }
      onChange={(e: any) => onChangingParams(e, name)}
      // key={sliderKey}
    ></SliderStyle>
  );
}
