import React from 'react';
import styles from '../inputStyle.module.scss';

export default function ChangeInput({
  mainParams,
  name,
  onChangingParams,
  tripleChoice,
}: {
  mainParams: any;
  name: string;
  onChangingParams: Function;
  tripleChoice?: boolean;
}) {
  const values: any = {
    withoutShift: ['true', 'false'],
    side: ['left', 'right'],
    shiftType: ['up', 'down'],
    generationType: ['scatter', 'smooth', 'sole'],
  };
  if (tripleChoice)
    return (
      <div className={styles.input_choice}>
        <p>
          <span
            onClick={() => onChangingParams(0, name)}
            className={mainParams[name] === 0 ? styles.active : styles.inactive}
          >
            {values[name][0]}
          </span>
          /
          <span
            onClick={() => onChangingParams(1, name)}
            className={mainParams[name] === 1 ? styles.active : styles.inactive}
          >
            {values[name][1]}
          </span>
          /
          <span
            onClick={() => onChangingParams(2, name)}
            className={mainParams[name] === 2 ? styles.active : styles.inactive}
          >
            {values[name][2]}
          </span>
        </p>
      </div>
    );
  else
    return (
      <div className={styles.input_choice}>
        <p>
          <span
            className={mainParams[name] ? styles.active : styles.inactive}
            onClick={() => onChangingParams(true, name)}
          >
            {values[name][0]}
          </span>
          /
          <span
            onClick={() => onChangingParams(false, name)}
            className={!mainParams[name] ? styles.active : styles.inactive}
          >
            {values[name][1]}
          </span>
        </p>
      </div>
    );
}
