import React from 'react';
import TextInput from './inputs/text';
import ChangeInput from './inputs/choice';
import ArrayInput from './inputs/array';
import SliderInput from './inputs/slider';
import RangedSlider from './inputs/rangedSlider';
import InteractiveChange from './inputs/InteractiveChange';

export default function Inputs({
  mainParams,
  name,
  setMainParams,
  params,
  shiftNumber,
}: {
  mainParams: any;
  name: string;
  setMainParams: Function;
  params?: any;
  shiftNumber: Number;
}) {
  function onChangingParams(e: any, name: string, valueNumber: number = 0) {
    if (Number.isNaN(+e.target.value)) {
      return;
    }

    const val: number = +e.target.value;

    const temp: any = {};
    console.log(name);
    console.log(val);

    if (mainParams[name] instanceof Array) {
      const tempArr = mainParams[name];
      tempArr[valueNumber] = val;
      temp[name] = tempArr;
    } else {
      temp[name] = val;
    }

    setMainParams({ ...mainParams, ...temp });
  }

  function changeChoice(value: any, name: string) {
    if (value === mainParams[name][shiftNumber.valueOf() - 1] || !shiftNumber) return;
    const temp: any = { ...mainParams };

    if (name === 'side' || name === 'shiftType') {
      temp.L[shiftNumber.valueOf() - 1] = [-temp.L[shiftNumber.valueOf() - 1][0], -temp.L[shiftNumber.valueOf() - 1][1]];
      temp[name][shiftNumber.valueOf() - 1] = value;
    } else temp[name] = value;

    setMainParams(temp);
  }

  function changeRangeSlider(e: any, name: string) {
    if (!shiftNumber) return;

    const val: any = e.target.value;

    const temp: any = { ...mainParams };
    temp[name][shiftNumber.valueOf() - 1] = val;
    setMainParams(temp);
  }

  function switchResult(name: any) {
    switch (name) {
      case 'N':
        return <TextInput mainParams={mainParams} name={name} onChangingParams={onChangingParams} />;
      case 'withoutShift':
      case 'side':
      case 'shiftType':
      case 'generationType':
        return (
          <ChangeInput
            mainParams={mainParams}
            name={name}
            onChangingParams={changeChoice}
            tripleChoice={name === 'generationType'}
            shiftNumber={shiftNumber}
          />
        );
      case 'layerThickness':
        return <ArrayInput mainParams={mainParams} name={name} onChangingParams={onChangingParams} />;
      case 'shiftCount':
      case 'NX':
      case 'NY':
      case 'layerCount':
      case 'scatterMaxValue':
      case 'scatterPeriod':
        return <SliderInput mainParams={mainParams} name={name} onChangingParams={onChangingParams} params={params} />;
      case 'Y':
      case 'L':
      case 'shiftForce':
        return (
          <RangedSlider
            mainParams={mainParams}
            name={name}
            onChangingParams={changeRangeSlider}
            params={params}
            shiftNumber={shiftNumber}
          />
        );
      case 'scatterAmount':
        return <InteractiveChange mainParams={mainParams} name={name} onChangingParams={onChangingParams} params={params} />;
    }
  }

  return switchResult(name);
}
