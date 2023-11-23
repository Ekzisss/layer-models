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

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

// types
// 0 - textbox
// 1 - checkbox
// 2 - array
// 3 - array of array1
// 4 - slider
// 5 - choice
// 6 - 3 choice
// 7 - 2 sliders

export default function Home() {
  const axios = require('axios').default;
  const [opacityMode, setOpacityMode] = useState(false);
  const [currentTheme, setCurrentTheme] = useState(0);
  const [colorForSlider, setColorForSlider] = useState('rgb(240, 74, 74)');
  const [dataForChart, setDataForChart] = useState<any>([]);

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
    scatterAmount: [],
    sole: [],
    Y: [30, 30],
    L: [-10, 10],
    shiftForce: [5, 15],
    side: 0,
    shiftType: 0,
    shiftCount: 1,
  });

  // N = 1, NY=60, NX=120, layerCount = None, layerThickness=[], layerValues=[],
  //                 scatterMaxValue=5, scatterPeriod=5, smoothness=False, Y=None, L=None, shiftForce=None,
  //                 side = None, shiftType = None, shiftCount = 1, multiprocess=False, scatterAmount = [], sole=None, withoutShift=False

  useEffect(() => {
    const root = document.documentElement;
    setColorForSlider(themes[currentTheme % themes.length].color);

    root?.style.setProperty('--primary', themes[currentTheme % themes.length].color);
  }, [currentTheme]);

  async function updateGraph() {
    try {
      const response = await axios.post('http://127.0.0.1:8000/', mainParams);
      const receivedData = response.data.result[0];

      console.log(receivedData);

      const NX = 100;

      const dataPerLayer = [
        receivedData.slice(0, -mainParams.NX * 2 - 4),
        receivedData.slice(mainParams.NX, -mainParams.NX - 4),
        receivedData.slice(mainParams.NX * 2, -4),
      ];

      console.log(dataPerLayer);

      const data = dataPerLayer[0].map((item: any, index: number) => {
        return { 'layer 0': item };
      });

      for (let i = 1; i < dataPerLayer.length; i++) {
        dataPerLayer[i].map((item: any, index: number) => {
          data[index][`layer ${i}`] = item - dataPerLayer[i - 1][index];
          // return { value: item };
        });
      }

      console.log(data);
      console.log(getAllValues(dataPerLayer, 0, 1));

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

  const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 2400, amt: 2400 },
    { name: 'Page C', uv: 230, pv: 2400, amt: 2400 },
    { name: 'Page D', uv: 96, pv: 2400, amt: 2400 },
  ];

  const data2 = [{ nv: 10 }, { nv: 20 }, { nv: 40 }, { nv: -10 }];

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
                  ></ParamsField>
                ))}
              </section>
            </div>
            <div className={`${styles.leftSide__down} ${styles.leftSide__down_real} ${styles.real}`}>
              <button
                onClick={updateGraph}
                className={styles.leftSide__down__submit}
              >
                Сгенерировать
              </button>
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
                  <AreaChart data={dataForChart}>
                    <Tooltip />
                    <Area
                      dataKey="layer 0"
                      stroke="#8884d8"
                      fill="#8884d8"
                      stackId="1"
                    ></Area>
                    <Area
                      dataKey="layer 1"
                      stroke="#82ca9d"
                      fill="#82ca9d"
                      stackId="1"
                    ></Area>
                    <Area
                      dataKey="layer 2"
                      stroke="#ffc658"
                      fill="#ffc658"
                      stackId="1"
                    ></Area>
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    <XAxis
                      stroke="#ccc"
                      dataKey="name"
                    />
                    <YAxis
                      stroke="#ccc"
                      reversed={true}
                    />
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
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
