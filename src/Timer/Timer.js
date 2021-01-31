import React, { useEffect, useState } from 'react';

import { Doughnut } from 'react-chartjs-2';
import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@material-ui/core';

import './Timer.css';

const Timer = ({ autoStart, step, time }) => {
  const [isActive, setIsActive] = useState(false);
  const [auto, setAuto] = useState(autoStart);
  const [currentTime, setCurrentTime] = useState(time);
  const [someValue, setSomeValue] = useState(0);
  const [infinite, setInfinite] = useState(false);

  const startTimer = () => {
    setIsActive((isActive) => !isActive);
  };

  const setAutoStart = () => {
    setAuto((auto) => !auto);
    setIsActive((isActive) => !isActive);
  };

  const setDefault = () => {
    setCurrentTime(currentTime);
    setIsActive(false);
    setAuto(false);
  };

  const setTime = (event) => {
    if (isActive) {
      setIsActive(false);
      setAutoStart(false);
    }
    setCurrentTime(+event.target.value);
    setSomeValue(+event.target.value);
  };

  useEffect(
    () => {
      let timer;
      if (isActive) {
        timer = setInterval(() => {
          setCurrentTime(currentTime > 0 ? currentTime - 1 : setDefault());
        }, step);
      } else if (currentTime !== 0 && isActive) {
        clearInterval(timer);
      } else {
        setCurrentTime(time);
        if (currentTime === 0 && infinite) {
          setTimeout(() => {
            setIsActive(true);
          }, step);
        }
      }
      return () => clearInterval(timer);
    },
    // eslint-disable-next-line
    [currentTime, isActive]
  );

  const graphValue = {
    labels: ['Passed', 'Remains'],
    datasets: [
      {
        backgroundColor: ['#ffffff', '#00A6B4'],
        data: [
          someValue ? someValue - currentTime : time - currentTime,
          someValue
            ? someValue - (someValue - currentTime)
            : time - (time - currentTime),
        ],
      },
    ],
  };

  return (
    <>
      <div className="component-wrapper">
        <Button
          variant="contained"
          color={isActive ? 'secondary' : 'primary'}
          onClick={startTimer}
        >
          {isActive ? 'Pause' : 'Start'}
        </Button>
      </div>

      <div className="component-wrapper">
        <TextField
          id="standard-basic"
          label="Time"
          defaultValue={time}
          onChange={setTime}
        />
      </div>

      <div className="component-wrapper">
        <FormControlLabel
          control={
            <Checkbox
              checked={auto}
              name="checkedB"
              color="primary"
              onChange={setAutoStart}
            />
          }
          label="Auto start"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={infinite}
              name="checkedB"
              color="primary"
              onChange={() => setInfinite((infinite) => !infinite)}
            />
          }
          label="Endless timer"
        />
      </div>
      <div className="graph-wrapper">
        <Doughnut
          data={graphValue}
          options={{
            title: {
              display: false,
            },
            legend: {
              display: false,
            },
          }}
        />
      </div>
      <h2>{`Time left - ${currentTime}s`}</h2>
    </>
  );
};

export default Timer;
