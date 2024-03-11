import React from 'react';
import styles from '../inputStyle.module.scss';
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';

let SliderTransparent = styled(Slider)({
  color: 'rgba(0, 0, 0, 0)',
  disabled: {
    color: 'rgba(0, 0, 0, 0)',
  },
  '&.Mui-disabled': {
    color: 'rgba(0, 0, 0, 0)',
  },

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

export default function InteractiveChange({
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
    <div
      style={{ opacity: mainParams.generationType !== 1 ? 0.5 : 1 }}
      className={styles.hidden_input}
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart
          data={mainParams.scatterAmount.map((item: number) => {
            return { value: item };
          })}
        >
          <YAxis
            hide={true}
            type="number"
            domain={[-mainParams.NY, mainParams.NY]}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="rgb(240, 74, 74)"
            strokeWidth={2}
            animationDuration={100}
          />
        </LineChart>
      </ResponsiveContainer>
      <div className={styles.hidden_input__sliders}>
        {Array.apply(null, Array(3)).map((_, index) =>
          index !== 0 ? (
            <SliderTransparent
              key={index}
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: 'vertical writing-mode',
                },
              }}
              orientation="vertical"
              defaultValue={30}
              aria-label="Temperature"
              valueLabelDisplay="auto"
              min={-mainParams.NY}
              max={mainParams.NY}
              value={mainParams[name][index]}
              onChange={(e) => onChangingParams(e, name, index)}
              disabled={mainParams.generationType !== 1}
            />
          ) : (
            <div
              style={{ width: '30px' }}
              key={index}
            ></div>
          )
        )}
      </div>
    </div>
  );
}
