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

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

// types
// 0 - textbox
// 1 - checkbox
// 2 - array
// 3 - array of array1
// 4 - slider
// 5 - choice

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
    numberOfLayers: 3,
    layerThickness: [10, 30, 1000000],
    scatterMaxValue: 5,
    scatterPeriod: 2,
    scatterAmount: [],
    sole: [],
    center: 30,
    angle: 0,
    shiftForce: 10,
    side: 0,
    shiftType: 0,
    shiftCount: 1,
  });

  useEffect(() => {
    const root = document.documentElement;
    setColorForSlider(themes[currentTheme % themes.length].color);

    root?.style.setProperty('--primary', themes[currentTheme % themes.length].color);
  }, [currentTheme]);

  // useEffect(() => {
  //   axios
  //     .get('http://127.0.0.1:8000/')
  //     .then(function (response: any) {
  //       // handle success
  //       console.log(response);
  //     })
  //     .catch(function (error: any) {
  //       // handle error
  //       console.log(error);
  //     })
  //     .finally(function () {
  //       // always executed
  //     });

  //   // axios
  //   //   .post('http://127.0.0.1:8000/', {
  //   //     params: {
  //   //       N: 1,
  //   //       NX: 30,
  //   //       NY: 300,
  //   //       layerCount: 4,
  //   //       scatterPeriod: 1,
  //   //       sole: [
  //   //         [50, 74],
  //   //         [90, 99],
  //   //         [110, 114],
  //   //         [1000, 1000],
  //   //       ],
  //   //       shiftForce: [5, 15],
  //   //       side: 1,
  //   //       shiftType: 1,
  //   //     },
  //   //   })
  //   //   .then(function (response: any) {
  //   //     // handle success
  //   //     console.log(response);
  //   //   })
  //   //   .catch(function (error: any) {
  //   //     // handle error
  //   //     console.log(error);
  //   //   })
  //   //   .finally(function () {
  //   //     // always executed
  //   //   });
  // }, []);

  async function updateGraph() {
    // axios
    //   .get('http://127.0.0.1:8000/')
    //   .then(function (response: any) {
    //     // handle success
    //     console.log(response);
    //   })
    //   .catch(function (error: any) {
    //     // handle error
    //     console.log(error);
    //   })
    //   .finally(function () {
    //     // always executed
    //   });

    try {
      const response = await axios.get('http://127.0.0.1:8000/');
      const receivedData = response.data.result[0];

      const dataPerLayer = [
        receivedData.slice(0, -34),
        receivedData.slice(15, -19),
        receivedData.slice(30, -4),
      ];

      const data = dataPerLayer[0].map((item: any) => {
        return { value0: item };
      });

      for (let i = 1; i < dataPerLayer.length; i++) {
        dataPerLayer[i].map((item: any, index: number) => {
          data[index][`value${i}`] = item;
          // return { value: item };
        });
      }

      console.log(data);
      setDataForChart(data);
    } catch (error) {
      console.log(error);
    }
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
              <div className={styles.elipse}>
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
                  // height="100%"
                  aspect={1}
                  debounce={1}
                >
                  <AreaChart data={dataForChart}>
                    <Area
                      type="monotone"
                      dataKey="value0"
                      stroke="red"
                      fillOpacity={0.2}
                    ></Area>
                    <Area
                      type="monotone"
                      dataKey="value1"
                      stroke="red"
                      fillOpacity={0.2}
                    ></Area>
                    <Area
                      type="monotone"
                      dataKey="value2"
                      stroke="red"
                      fillOpacity={0.2}
                    ></Area>
                    {/* <CartesianGrid stroke="#ccc" /> */}
                    <XAxis
                      stroke="#ccc"
                      dataKey="name"
                    />
                    <YAxis stroke="#ccc" />
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
