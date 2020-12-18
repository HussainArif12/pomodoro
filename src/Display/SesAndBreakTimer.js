import { createContext, useState } from "react";
import Timer from "../Timers/Timer";
import Button from "@material-ui/core/Button";

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
      <div className="flex flex-col items-center sm:grid sm:grid-cols-3 gap-4 sm:justify-items-center">
        <div>
          <h1>Break</h1>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={incrementBreakLength}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={decrementBreakLength}
          >
            -
          </Button>
        </div>
        <div>
          <h2>Session</h2>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={incrementSessionLength}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={decrementSessionLength}
          >
            -
          </Button>
        </div>
        <div>
          <h2>Long Break</h2>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={incrementLongBreakLength}
          >
            +
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={decrementLongBreakLength}
          >
            -
          </Button>
        </div>
      </div>
    </>
  );
}
