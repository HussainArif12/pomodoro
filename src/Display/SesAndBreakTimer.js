import { createContext, useState } from "react";
import Timer from "../Timers/Timer";
import Button from "@material-ui/core/Button";
import LaptopChromebookOutlinedIcon from "@material-ui/icons/LaptopChromebook";
import FreeBreakfastOutlinedIcon from "@material-ui/icons/FreeBreakfast";
import LocalHotelOutlinedIcon from "@material-ui/icons/LocalHotel";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import { makeStyles } from "@material-ui/core/styles";

export const BreakContext = createContext();
export const SessionContext = createContext();
export const LongBreakContext = createContext();

export function SesAndBreakTimer() {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
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
  const useStyles = makeStyles({
    root: {
      background: "#2E3440",
    },
    gap: {
      paddingTop: "1.5rem",
      paddingBottom: "1.5rem",
      background: "#4C566A",
    },
  });
  const classes = useStyles();
  console.log(classes);
  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <BreakContext.Provider value={breakLength}>
            <SessionContext.Provider value={sessionLength}>
              <LongBreakContext.Provider value={longBreak}>
                <Timer />
              </LongBreakContext.Provider>
            </SessionContext.Provider>
          </BreakContext.Provider>
        </CardContent>
        <div className="flex flex-col items-center sm:flex-row text-lg text-secondary mt-8  sm:justify-evenly sm:gap-8  sm:space-y-0 space-y-8 ">
          <div>
            <h1 class="">
              <FreeBreakfastOutlinedIcon />
              Break: {breakLength}
            </h1>
            <CardActions>
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
            </CardActions>
          </div>
          <div>
            <h2>
              <LaptopChromebookOutlinedIcon />
              Session : {sessionLength}
            </h2>
            <CardActions>
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
            </CardActions>
          </div>
          <div>
            <h2>
              <LocalHotelOutlinedIcon />
              Long Break : {longBreak}
            </h2>
            <CardActions>
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
            </CardActions>
          </div>
        </div>
      </Card>
      <Card className={classes.gap}>
        <div className="bg-primary text-secondary">
          <h1 className=" text-xl  text-center">What is this?</h1>
          <p>Start the main Timer and work for {sessionLength} minutes.</p>
          <p>
            When that's done, now take a break for {breakLength} minutes. This
            concludes one Pomodoro session.
          </p>
          <p>
            After four pomodoro sessions, take a break for {longBreak} minutes
          </p>
        </div>
      </Card>
      <a className="text-red-700" href="https://medium.com/@hussainarifkl">
        Built By Hussain Arif.
      </a>
    </>
  );
}
