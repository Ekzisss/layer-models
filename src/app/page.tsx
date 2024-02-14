'use client';
import Image from 'next/image';
import styles from './page.module.scss';
import './vars.css';
import { Montserrat } from 'next/font/google';
import ParamsField from '../components/paramsField';
import './globals.scss';
import params from '../../public/params.json';
import themes from '../../public/themes.json';
import { useState, useEffect } from 'react';

const montserrat = Montserrat({ subsets: ['latin'] });

import PaletteIcon from '@mui/icons-material/Palette';
import OpacityIcon from '@mui/icons-material/Opacity';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

// types
// 0 - textbox
// 1 - checkbox
// 2 - array
// 3 - array of array1
// 4 - slider
// 5 - choice
// 6 - 3 choice
// 7 - 2 sliders
// 8 - hidden illustration

const gradient = [
  '#fde725',
  '#b5de2b',
  '#6ece58',
  '#35b779',
  '#1f9e89',
  '#26828e',
  '#31688e',
  '#3e4989',
  '#482878',
  '#440154',
];

function colorPicker(palette: string[], totalNumber: number) {
  const result: string[] = [];
  const modifier = 9 / (totalNumber - 1);
  for (let i = 0; i < totalNumber; i++) {
    result.push(palette[Math.round(i * modifier)]);
  }
  return result;
}
// console.log(colorPicker(gradient, 9));

const HOST = 'https://layer-backend.onrender.com/'
// const HOST = process.env.SERVER_IP || 'http://127.0.0.1:8000/';

export default function Home() {
  const axios = require('axios').default;
  const [opacityMode, setOpacityMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [colorForSlider, setColorForSlider] = useState('rgb(240, 74, 74)');
  const [dataForChart, setDataForChart] = useState<any>([]);
  const [chartColors, setChartColors] = useState([
    '#fde725',
    '#b5de2b',
    '#6ece58',
    '#35b779',
    '#1f9e89',
    '#26828e',
    '#31688e',
    '#3e4989',
    '#482878',
    '#440154',
  ]);

  const [mainParams, setMainParams] = useState<any>({
    N: 10,
    withoutShift: false,
    generationType: 0,
    NX: 60,
    NY: 30,
    layerCount: 3,
    layerThickness: [],
    scatterMaxValue: 5,
    scatterPeriod: 2,
    scatterAmount: [15, 0, 0],
    sole: [],
    Y: [30, 30],
    L: [-10, 10],
    shiftForce: [5, 15],
    side: 0,
    shiftType: 0,
    shiftCount: 1,
  });

  // const chartColor = colorPicker(gradient, mainParams.layerCount);

  useEffect(() => {
    const root = document.documentElement;
    setColorForSlider(themes[currentTheme % themes.length].color);

    root?.style.setProperty('--primary', themes[currentTheme % themes.length].color);
  }, [currentTheme]);

  async function downloadModels() {
    const response = await axios.post(HOST, mainParams, {
      headers: { 'Content-Type': 'application/json' },
    });
    const receivedData = response.data.result;

    let csvContent = 'data:text/csv;charset=utf-8,' + receivedData.map((e: any) => e.join(',')).join('\n');
    let encodedUri = encodeURI(csvContent);

    const link = document.getElementById('download');

    if (link) {
      link.setAttribute('download', 'Models');
      link.setAttribute('href', encodedUri);
      link.click();
    }
  }

  async function updateGraph() {
    try {
      const fastParams = { ...mainParams };
      fastParams.N = 1;
      const response = await axios.post(HOST, fastParams, {
        headers: { 'Content-Type': 'application/json' },
      });
      const receivedData = response.data.result[0];

      const dataPerLayer: any[] = [];

      for (let i = 0; i < mainParams.layerCount; i++) {
        dataPerLayer.push(
          receivedData.slice(i * mainParams.NX, -(mainParams.NX * (mainParams.layerCount - 1 - i)) - 4)
        );
      }

      const data = dataPerLayer[0].map((item: any, index: number) => {
        return { 'layer 0': item };
      });

      for (let i = 1; i < dataPerLayer.length; i++) {
        dataPerLayer[i].map((item: any, index: number) => {
          data[index][`layer ${i}`] = item - dataPerLayer[i - 1][index];
          // return { value: item };
        });
      }

      // const chartColor = colorPicker(gradient, mainParams.layerCount);
      setChartColors(colorPicker(gradient, mainParams.layerCount));

      setDataForChart(data);
    } catch (error) {
      console.log(error);
    }
  }

  function getAllValues(arr: any[], index: number, countTo: number = 0) {
    let sum = 0;
    for (let i = 0; i < countTo; i++) {
      sum += arr[i][index];
    }
    return sum;
  }

  return (
    <div className={styles.base}>
      <div
        style={{
          background: `url(${themes[currentTheme % themes.length].bg}) center/cover no-repeat`,
        }}
        className={styles.bg}
      >
        <div className={`${styles.main} ${styles.main_decoration}`}>
          <div className={styles.leftSide}>
            <div
              style={opacityMode ? { opacity: 1 } : {}}
              className={styles.leftSide__up}
            ></div>
            <div
              style={opacityMode ? { opacity: 1 } : {}}
              className={styles.leftSide__down}
            ></div>
          </div>
          <div className={styles.rightSide}>
            <div
              style={opacityMode ? { opacity: 1 } : {}}
              className={styles.rightSide__up}
            ></div>
            <div
              style={opacityMode ? { opacity: 0 } : {}}
              className={styles.rightSide__down}
            ></div>
          </div>
        </div>

        <div className={styles.main}>
          <div className={styles.leftSide}>
            <div className={`${styles.leftSide__up} ${styles.leftSide__up_real} ${styles.real}`}>
              <h1 className={styles.params__title_main}>Параметры</h1>
              <section className={styles.params}>
                {params.map((item, index) => (
                  <ParamsField
                    key={index}
                    sectionName={item.sectionName}
                    params={item.params}
                    colorForSlider={colorForSlider}
                    mainParams={mainParams}
                    setMainParams={setMainParams}
                    onChange={updateGraph}
                  ></ParamsField>
                ))}
              </section>
            </div>
            <div className={`${styles.leftSide__down} ${styles.leftSide__down_real} ${styles.real}`}>
              <button
                onClick={downloadModels}
                className={styles.leftSide__down__submit}
              >
                Скачать модели
              </button>
              <a
                id="download"
                target="_blank"
                rel="noreferrer"
              ></a>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={`${styles.rightSide__up} ${styles.rightSide__up_real} ${styles.real}`}>
              <div className={styles.circle}>
                <p>?</p>
              </div>
              <div className={styles.ellipse}>
                <p>
                  <span className={styles.languageActive}>ru</span> / <span>en</span>
                </p>
              </div>
              <div
                onClick={() => setOpacityMode(!opacityMode)}
                className={styles.circle}
              >
                <OpacityIcon className={styles.darkMode}></OpacityIcon>
              </div>
              <div
                onClick={() => setCurrentTheme(currentTheme + 1)}
                className={styles.circle}
              >
                <PaletteIcon className={styles.darkMode}></PaletteIcon>
              </div>
            </div>
            <div className={`${styles.rightSide__down} ${styles.rightSide__down_real}  ${styles.real}`}>
              <div
                style={opacityMode ? { backgroundColor: 'rgba(68, 68, 68, 1)' } : {}}
                className={styles.display}
              >
                <ResponsiveContainer
                  width="100%"
                  aspect={1}
                >
                  <AreaChart
                    data={dataForChart}
                    margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                  >
                    <Tooltip />
                    {dataForChart[0] &&
                      Object.keys(dataForChart[0]).map((key, index) => (
                        <Area
                          key={index}
                          dataKey={key}
                          stroke={chartColors[index]}
                          fill={chartColors[index]}
                          stackId="1"
                          animationDuration={500}
                          type="monotone"
                          // type="linear"
                        ></Area>
                      ))}
                    <XAxis
                      stroke="#ccc"
                      // dataKey="name"
                      orientation="top"
                    />
                    <YAxis
                      stroke="#ccc"
                      markerHeight={20}
                      reversed={true}
                      domain={[0, mainParams.NY]}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
