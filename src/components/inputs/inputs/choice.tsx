import React from 'react';
import styles from '../inputStyle.module.scss';

export default function ChangeInput({
  mainParams,
  name,
  onChangingParams,
  tripleChoice,
  shiftNumber,
}: {
  mainParams: any;
  name: string;
  onChangingParams: Function;
  tripleChoice?: boolean;
  shiftNumber: Number;
}) {
  const values: any = {
    withoutShift: ['false', 'true'],
    side: ['left', 'right'],
    shiftType: ['down', 'up'],
    generationType: ['scatter', 'smooth'],
  };
  if (tripleChoice)
    return (
      <div className={styles.input_choice}>
        <p>
          <span onClick={() => onChangingParams(0, name)} className={mainParams[name] === 0 ? styles.active : styles.inactive}>
            {values[name][0]}
          </span>
          /
          <span onClick={() => onChangingParams(1, name)} className={mainParams[name] === 1 ? styles.active : styles.inactive}>
            {values[name][1]}
          </span>
        </p>
      </div>
    );
  else
    return (
      <div className={styles.input_choice}>
        <p>
          <span
            className={
              Array.isArray(mainParams[name])
                ? mainParams[name][shiftNumber.valueOf() - 1]
                  ? styles.inactive
                  : styles.active
                : mainParams[name]
                ? styles.inactive
                : styles.active
            }
            onClick={() => onChangingParams(false, name)}
          >
            {values[name][0]}
          </span>
          /
          <span
            onClick={() => onChangingParams(true, name)}
            className={
              Array.isArray(mainParams[name])
                ? !mainParams[name][shiftNumber.valueOf() - 1]
                  ? styles.inactive
                  : styles.active
                : !mainParams[name]
                ? styles.inactive
                : styles.active
            }
          >
            {values[name][1]}
          </span>
        </p>
      </div>
    );
}
