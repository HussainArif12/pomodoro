import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import {
  SessionContext,
  BreakContext,
  LongBreakContext,
} from "../Display/SesAndBreakTimer.js";
import sessionEndedAudio from "../Audio/alert_simple.wav";
import breakEndedAudio from "../Audio/notification_simple-01.wav";
import Button from "@material-ui/core/Button";

export default function Timer() {
  const [timerOn, setTimerOn] = useState(false);
  const [timerDone, setTimerDone] = useState(false);
  const [timerLength, setTimerLength] = useState(0);

  const [sessionType, setSessionType] = useState("Work");

  const BreakLength = useContext(BreakContext);
  const SessionLength = useContext(SessionContext);
  const LongBreak = useContext(LongBreakContext);

  const [breakLength, setBreakLength] = useState(0);
  const [sessionLength, setSessionLength] = useState(0);

  const sessionEnded = new Audio(sessionEndedAudio);
  const breakEnded = new Audio(breakEndedAudio);

  const [sessionNumber, setSessionNumber] = useState(1);

  useEffect(() => {
    console.log("The timers are: ", breakLength, sessionLength);
    setBreakLength(BreakLength);
    setSessionLength(SessionLength);

    if (sessionType === "Work") {
      setTimerLength(SessionLength);
    }
    if (sessionType === "Break") {
      setTimerLength(BreakLength);
    }
    if (sessionType === "Long Break") {
      setTimerLength(LongBreak);
    }
  }, [BreakLength, SessionLength, LongBreak, sessionType]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timerOn) {
        setTimerLength((timerLength) => timerLength - 1);
      }
    }, 500);

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

  //get changes for sessionType
  useEffect(() => {
    // .........
    if (sessionType === "Work") {
      setTimerLength(SessionLength);
    } else if (sessionType === "Break") {
      setTimerLength(BreakLength);
    } else {
      setTimerLength(LongBreak);
    }
    if (sessionType === "Work" && timerDone) {
      setSessionNumber((sessionNumber) => sessionNumber + 1);
    }
  }, [sessionType, timerDone, sessionType]);

  useEffect(() => {
    if (timerDone) {
      sessionEnded.play();
    }
  }, [timerDone]);

  useEffect(() => {
    if (sessionNumber > 2) {
      console.log("reached limit");
      setSessionNumber(1);
      setSessionType("Long Break");
    }
  }, [sessionNumber]);

  return (
    <>
      <div className="flex flex-col text-center text-xl">
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => {
            breakEnded.play();
            setTimerOn(!timerOn);
          }}
        >
          {timerOn ? "Pause" : "Turn on Timer"}
        </Button>
        {/*   </div>
      <div className="text-center  text-xl">
        */}
        <p className="tracking-widest">
          {moment("1900-01-01 00:00:00")
            .add(timerLength, "seconds")
            .format("HH:mm:ss")}
        </p>
        <p>{timerDone ? "Done" : "Wait.."}</p>
        <p>
          Break {breakLength} Session: {sessionLength} Long Break : {LongBreak}
        </p>
        <p>Session Number: {sessionNumber}</p>
        <p>{sessionType}</p>
      </div>
    </>
  );
}
