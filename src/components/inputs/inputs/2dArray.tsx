import React from 'react';
import styles from '../inputStyle.module.scss';

export default function Array2dInput({
  mainParams,
  name,
  onChangingParams,
}: {
  mainParams: any;
  name: string;
  onChangingParams: Function;
}) {
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
            // disabled={
            //   params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
            //   params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
            //   false
            // }
            onChange={(e) => onChangingParams(e, name, index, 0)}
            className={styles.inputWithSlider}
            // value={mainParams[name][index][0]}
          />
          <span>-</span>
          <input
            type="text"
            name=""
            id=""
            // disabled={
            //   params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
            //   params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
            //   false
            // }
            onChange={(e) => onChangingParams(e, name, index, 1)}
            className={styles.inputWithSlider}
            // value={mainParams[name][index][1]}
          />
          {index == Array.from(Array(mainParams.layerCount)).length - 1 ? '' : <span>,</span>}
        </div>
      ))}
    </div>
  );
}
