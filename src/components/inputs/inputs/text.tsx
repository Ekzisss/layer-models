import React from 'react';
import styles from '../inputStyle.module.scss';

export default function TextInput({
  mainParams,
  name,
  onChangingParams,
}: {
  mainParams: any;
  name: string;
  onChangingParams: Function;
}) {
  return (
    <input
      className={styles.input_text}
      type="text"
      name=""
      id=""
      value={mainParams[name]}
      onChange={(e) => onChangingParams(e, name)}
    />
  );
}
