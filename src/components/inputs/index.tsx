import React from 'react';
import TextInput from './inputs/text';
import ChangeInput from './inputs/choice';
import ArrayInput from './inputs/array';
import Array2dInput from './inputs/2dArray';
import SliderInput from './inputs/slider';
import RangedSlider from './inputs/rangedSlider';
import InteractiveChange from './inputs/InteractiveChange';

export default function Inputs({
  mainParams,
  name,
  setMainParams,
  params,
}: {
  mainParams: any;
  name: string;
  setMainParams: Function;
  params?: any;
}) {
  // React.useEffect(() => {
  //   console.log(mainParams);
  //   // onChange();
  // }, [mainParams]);

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
    console.log(name);
    console.log(val);

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
    } else {
      temp.scatterAmount = [
        Math.floor(name === 'NY' ? val / 2 : mainParams.NY / 2),
        ...mainParams.scatterAmount.slice(1),
      ];
      temp[name] = val;
    }

    setMainParams({ ...mainParams, ...temp });
  }

  function changeChoice(value: any, name: string) {
    if (value === mainParams[name]) return;
    const temp: any = { ...mainParams };
    temp[name] = value;

    if (name === 'side' || name === 'shiftType') {
      temp.L = [-temp.L[0], -temp.L[1]];
    }

    setMainParams(temp);
  }

  function changeRangeSlider(e: any, name: string) {
    console.log(e.target.value);

    const val = e.target.value;

    const temp: any = { ...mainParams };
    temp[name] = val;
    setMainParams(temp);
  }

  function switchResult(name: any) {
    switch (name) {
      case 'N':
        return (
          <TextInput
            mainParams={mainParams}
            name={name}
            onChangingParams={onChangingParams}
          />
        );
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
          />
        );
      case 'layerThickness':
        return (
          <ArrayInput
            mainParams={mainParams}
            name={name}
            onChangingParams={onChangingParams}
          />
        );
      case 'sole':
        return (
          <Array2dInput
            mainParams={mainParams}
            name={name}
            onChangingParams={onChangingParams}
          />
        );
      case 'shiftCount':
      case 'NX':
      case 'NY':
      case 'layerCount':
      case 'scatterMaxValue':
      case 'scatterPeriod':
        return (
          <SliderInput
            mainParams={mainParams}
            name={name}
            onChangingParams={onChangingParams}
            params={params}
          />
        );
      case 'Y':
      case 'L':
      case 'shiftForce':
        return (
          <RangedSlider
            mainParams={mainParams}
            name={name}
            onChangingParams={changeRangeSlider}
            params={params}
          />
        );
      case 'scatterAmount':
        return (
          <InteractiveChange
            mainParams={mainParams}
            name={name}
            onChangingParams={onChangingParams}
            params={params}
          />
        );
    }
  }

  return switchResult(name);
}
