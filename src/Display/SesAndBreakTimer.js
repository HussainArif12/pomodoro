import { createContext, useState } from "react";
import Timer from "../Timers/Timer";
import Button from "@material-ui/core/Button";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

export const BreakContext = createContext();
export const SessionContext = createContext();
export const LongBreakContext = createContext();

export function SesAndBreakTimer(props) {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(10);
  const [longBreak, setLongBreakLength] = useState(15);
  function decrementBreakLength() {
    setBreakLength((breakLength) => (breakLength === 0 ? 0 : breakLength - 1));
  }
  function incrementBreakLength() {
    setBreakLength((breakLength) => breakLength + 1);
  }
  function incrementSessionLength() {
    setSessionLength((sessionLength) => sessionLength + 1);
  }
  function decrementSessionLength() {
    setSessionLength((sessionLength) =>
      sessionLength === 0 ? 0 : sessionLength - 1
    );
  }
  function decrementLongBreakLength() {
    setLongBreakLength((longBreakLength) =>
      longBreakLength === 0 ? 0 : longBreakLength - 1
    );
  }
  function incrementLongBreakLength() {
    setLongBreakLength((longBreakLength) => longBreakLength + 1);
  }
  return (
    <>
      <BreakContext.Provider value={breakLength}>
        <SessionContext.Provider value={sessionLength}>
          <LongBreakContext.Provider value={longBreak}>
            <Timer />
          </LongBreakContext.Provider>
        </SessionContext.Provider>
      </BreakContext.Provider>
      {/*   <div className="flex flex-col justify-center items-center sm:space-x-8 sm:flex-row space-y-8 sm:space-y-0 ">
       */}
      <div className="flex flex-col items-center sm:grid text-lg text-secondary mt-8  sm:grid-cols-3 gap-8 sm:justify-items-center">
        <div>
          <h1 class="">
            <FreeBreakfastOutlinedIcon />
            Break: {breakLength}
          </h1>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={incrementBreakLength}
            startIcon={<AddIcon />}
            disableElevation
          ></Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={decrementBreakLength}
            startIcon={<RemoveIcon />}
            disableElevation
          ></Button>
        </div>
        <div>
          <h2>
            <LaptopChromebookOutlinedIcon />
            Session : {sessionLength}
          </h2>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={incrementSessionLength}
            startIcon={<AddIcon />}
            disableElevation
          ></Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={decrementSessionLength}
            startIcon={<RemoveIcon />}
            disableElevation
          ></Button>
        </div>
        <div>
          <h2>
            <LocalHotelOutlinedIcon />
            Long Break : {longBreak}
          </h2>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={incrementLongBreakLength}
            startIcon={<AddIcon />}
            disableElevation
          ></Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={decrementLongBreakLength}
            startIcon={<RemoveIcon />}
            disableElevation
          ></Button>
        </div>
      </div>
    </>
  );
}
