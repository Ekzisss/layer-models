'use client';
import styles from './page.module.scss';
import './vars.css';
import ParamsField from '../components/paramsField';
import './globals.scss';
import params from '../../public/params.json';
import themes from '../../public/themes.json';
import { useState, useEffect } from 'react';

import PaletteIcon from '@mui/icons-material/Palette';
import OpacityIcon from '@mui/icons-material/Opacity';
import axios from 'axios';

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

const gradient = ['#fde725', '#b5de2b', '#6ece58', '#35b779', '#1f9e89', '#26828e', '#31688e', '#3e4989', '#482878', '#440154'];

function colorPicker(palette: string[], totalNumber: number) {
  const result: string[] = [];
  const modifier = 9 / (totalNumber - 1);
  for (let i = 0; i < totalNumber; i++) {
    result.push(palette[Math.round(i * modifier)]);
  }
  return result;
}

export default function Home() {
  const HOST = process.env.NEXT_PUBLIC_SERVER_IP;
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
    scatterAmount: [0, 0, 0],
    Y: [
      [10, 20],
      [10, 20],
      [10, 20],
      [10, 20],
      [10, 20],
    ],
    L: [
      [10, 30],
      [10, 30],
      [10, 30],
      [10, 30],
      [10, 30],
    ],
    shiftForce: [
      [5, 15],
      [5, 15],
      [5, 15],
      [5, 15],
      [5, 15],
    ],
    side: [true, true, true, true, true],
    shiftType: [false, false, false, false, false],
    shiftCount: 1,
  });

  useEffect(() => {
    async function updateGraph() {
      try {
        if (!HOST) return;
        const fastParams = { ...mainParams };
        fastParams.N = 1;
        fastParams.Y = fastParams.Y.slice(0, fastParams.shiftCount);
        fastParams.L = fastParams.L.slice(0, fastParams.shiftCount);
        fastParams.shiftForce = fastParams.shiftForce.slice(0, fastParams.shiftCount);
        fastParams.side = fastParams.side.slice(0, fastParams.shiftCount);
        fastParams.shiftType = fastParams.shiftType.slice(0, fastParams.shiftCount);
        const response = await axios.post(HOST, fastParams, {
          headers: { 'Content-Type': 'application/json' },
        });
        const receivedData = response.data.result[0];

        const dataPerLayer: any[] = [];

        for (let i = 0; i < mainParams.layerCount; i++) {
          dataPerLayer.push(
            receivedData.slice(i * mainParams.NX, -(mainParams.NX * (mainParams.layerCount - 1 - i)) - mainParams.shiftCount * 2)
          );
        }

        const data = dataPerLayer[0].map((item: any, _: number) => {
          return { 'layer 0': item };
        });
        for (let i = 1; i < dataPerLayer.length; i++) {
          dataPerLayer[i].map((item: any, index: number) => {
            data[index][`layer ${i}`] = item - dataPerLayer[i - 1][index];
          });
        }

        setChartColors(colorPicker(gradient, mainParams.layerCount));

        console.log(receivedData);
        console.log(data);

        setDataForChart(data);
      } catch (error) {
        console.log(error);
      }
    }

    updateGraph();
  }, [mainParams, HOST]);

  useEffect(() => {
    const root = document.documentElement;
    setColorForSlider(themes[currentTheme % themes.length].color);

    root?.style.setProperty('--primary', themes[currentTheme % themes.length].color);
  }, [currentTheme]);

  async function downloadModels() {
    if (!HOST) return;
    const fastParams = { ...mainParams };
    fastParams.Y = fastParams.Y.slice(0, fastParams.shiftCount);
    fastParams.L = fastParams.L.slice(0, fastParams.shiftCount);
    fastParams.shiftForce = fastParams.shiftForce.slice(0, fastParams.shiftCount);
    fastParams.side = fastParams.side.slice(0, fastParams.shiftCount);
    fastParams.shiftType = fastParams.shiftType.slice(0, fastParams.shiftCount);
    const response = await axios.post(HOST, fastParams, {
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

  console.log(mainParams);

  return (
    <div className={styles.base}>
      <div className={styles.bg}>
        <div className={`${styles.main} ${styles.main_decoration}`}>
          <div className={styles.leftSide}>
            <div style={opacityMode ? { opacity: 1 } : {}} className={styles.leftSide__up}></div>
            <div style={opacityMode ? { opacity: 1 } : {}} className={styles.leftSide__down}></div>
          </div>
          <div className={styles.rightSide}>
            <div style={opacityMode ? { opacity: 1 } : {}} className={styles.rightSide__up}></div>
            <div style={opacityMode ? { opacity: 0 } : {}} className={styles.rightSide__down}></div>
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
                    sectionName={item.sectionName !== 'Генерация разреза' ? item.sectionName : 'Генерация разреза №1'}
                    params={item.params}
                    colorForSlider={colorForSlider}
                    mainParams={mainParams}
                    setMainParams={setMainParams}
                  ></ParamsField>
                ))}
                {Array(mainParams.shiftCount - 1)
                  .fill(0)
                  .map((_, index) => (
                    <ParamsField
                      key={index}
                      sectionName={`${params[2].sectionName} №${index + 2}`}
                      params={params[2].params}
                      colorForSlider={colorForSlider}
                      mainParams={mainParams}
                      setMainParams={setMainParams}
                      shiftNumber={index + 2}
                    ></ParamsField>
                  ))}
              </section>
            </div>
            <div className={`${styles.leftSide__down} ${styles.leftSide__down_real} ${styles.real}`}>
              <button onClick={downloadModels} className={styles.leftSide__down__submit}>
                Скачать модели
              </button>
              <a id="download" target="_blank" rel="noreferrer"></a>
            </div>
          </div>
          <div className={styles.rightSide}>
            <div className={`${styles.rightSide__up} ${styles.rightSide__up_real} ${styles.real}`}>
              <div onClick={() => setOpacityMode(!opacityMode)} className={styles.circle}>
                <OpacityIcon className={styles.darkMode}></OpacityIcon>
              </div>
              <div onClick={() => setCurrentTheme(currentTheme + 1)} className={styles.circle}>
                <PaletteIcon className={styles.darkMode}></PaletteIcon>
              </div>
            </div>
            <div className={`${styles.rightSide__down} ${styles.rightSide__down_real}  ${styles.real}`}>
              <div style={opacityMode ? { backgroundColor: 'rgba(68, 68, 68, 1)' } : {}} className={styles.display}>
                <ResponsiveContainer width="100%" aspect={1}>
                  <AreaChart data={dataForChart} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
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
                        ></Area>
                      ))}
                    <XAxis stroke="#ccc" orientation="top" />
                    <YAxis stroke="#ccc" markerHeight={20} reversed={true} domain={[0, mainParams.NY]} />
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
