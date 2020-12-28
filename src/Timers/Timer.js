import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import Duration from "luxon/src/duration.js";
import {
  SessionContext,
  BreakContext,
  LongBreakContext,
} from "../Display/SesAndBreakTimer.js";
import sessionEndedAudio from "../Audio/alert_simple.wav";
import breakEndedAudio from "../Audio/notification_simple-01.wav";
import Button from "@material-ui/core/Button";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";

export default function Timer() {
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(true);
  const [timerLength, setTimerLength] = useState(0);

  const [sessionType, setSessionType] = useState("Work");

  const BreakLength = useContext(BreakContext);
  const SessionLength = useContext(SessionContext);
  const LongBreak = useContext(LongBreakContext);

  const sessionEnded = new Audio(sessionEndedAudio);
  const breakEnded = new Audio(breakEndedAudio);

  const [sessionNumber, setSessionNumber] = useState(0);

  const minuteMultiplier = 60;
  useEffect(() => {
    if (sessionType === "Work") {
      setTimerLength(SessionLength * minuteMultiplier);
    }
  }, [SessionLength, sessionType]);

  useEffect(() => {
    if (sessionType === "Break") {
      setTimerLength(BreakLength * minuteMultiplier);
    }
  }, [BreakLength, sessionType]);

  useEffect(() => {
    if (sessionType === "Long Break") {
      setTimerLength(LongBreak * minuteMultiplier);
    }
  }, [LongBreak, sessionType]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setTimerLength((timerLength) => timerLength - 1);
      }
    }, 200);

    if (timerOn) {
      setTimerDone(false);
    }
    return () => {
      clearInterval(interval);
    };
  }, [timerOn]);

  useEffect(() => {
    if (timerLength < 0) {
      setTimerOn(false);
      setTimerDone(true);
      setSessionType((prevType) => {
        if (prevType === "Work") return "Break";
        if (prevType === "Break") return "Work";
        if (prevType === "Long Break") return "Work";
      });
    }
  }, [timerLength]);

  //get changes for sessionType. If TimerDone, then increment session number
  useEffect(() => {
    // .........
    if (sessionType === "Work" && timerDone) {
      setSessionNumber((sessionNumber) => sessionNumber + 1);
    }
    if (timerDone) {
      sessionEnded.play();
    }
  }, [sessionType, timerDone]);
  /* 
  useEffect(() => {
    if (timerDone) {
      sessionEnded.play();
    }
  }, [timerDone]); */

  useEffect(() => {
    if (sessionNumber > 2) {
      console.log("reached limit");
      setSessionNumber(0);
      setSessionType("Long Break");
    }
  }, [sessionNumber]);

  return (
    <>
      <div className="flex flex-col text-center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          startIcon={timerOn ? <PauseIcon /> : <PlayArrowIcon />}
          onClick={() => {
            breakEnded.play();
            setTimerOn(!timerOn);
          }}
        >
          {timerOn ? "Pause" : "Play"}
        </Button>
        <p className="font-sans tracking-widest text-6xl text-primary">
          {Duration.fromObject({ seconds: timerLength }).toFormat("mm:ss")}
        </p>
        <p className="text-sessionNumber text-2xl">
          Session Number: {sessionNumber}
        </p>
        <div>
          {sessionType === "Break" && (
            <FreeBreakfastOutlinedIcon style={{ color: "white" }} />
          )}
          {sessionType === "Work" && (
            <LaptopChromebookOutlinedIcon style={{ color: "white" }} />
          )}
          {sessionType === "Long Break" && (
            <LocalHotelOutlinedIcon style={{ color: "white" }} />
          )}
        </div>
      </div>
    </>
  );
}
