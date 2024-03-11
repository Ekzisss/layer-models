import React from 'react';
import styles from '../inputStyle.module.scss';

export default function ArrayInput({
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
      {Array.from(Array(name === 'scatterAmount' ? 3 : mainParams.layerCount)).map((_, index) => (
        <div key={`${name} ${index} 1`}>
          <input
            type="text"
            name=""
            id=""
            // disabled={
            //   params.find((o) => o.name === name)?.disabled?.at(0) === mainParams.generationType ||
            //   params.find((o) => o.name === name)?.disabled?.at(1) === mainParams.generationType ||
            //   false
            // }
            min={0}
            max={10}
            value={mainParams[name][index]}
            onChange={(e) => onChangingParams(e, name, index)}
            className={styles.inputWithSlider}
          />
          {index == (name === 'scatterAmount' ? 2 : Array.from(Array(mainParams.layerCount)).length - 1) ? (
            ''
          ) : (
            <span>,</span>
          )}
        </div>
      ))}
    </div>
  );
}
