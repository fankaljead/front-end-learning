import { useState, useEffect, useRef, useCallback } from "react";

interface IProps {
  mss: number;
}

type Fnc = () => void;
const noop = () => {};

export default function CountDown(props: IProps) {
  const { mss } = props;
  const [time, setTime] = useState(mss);
  const tickRef = useRef<Fnc>(noop);

  const tick = useCallback(() => {
    if (time > 0) setTime(time - 1);
  }, [time]);

  useEffect(() => {
    tickRef.current = tick;
  });

  useEffect(() => {
    const timer = setInterval(() => tickRef.current(), 1000);
    console.log("tick:", timer);
    return () => clearInterval(timer);
  }, []);

  // useEffect(() => {
  //   const tick = setInterval(() => {
  //     setTime(time - 1);
  //   }, 1000);
  //   console.log("tick", tick);
  //   return () => clearInterval(tick);
  // });

  return <p>{time.toString().padStart(2, "0")}</p>;
}

const useCountDown = (props: Partial<IProps>) => {
  const { mss } = props;
  const [time, setTime] = useState(mss || 0);
  const tickRef = useRef<Fnc>(noop);

  const tick = () => {
    if (time > 0) setTime(time - 1);
  };

  useEffect(() => {
    tickRef.current = tick;
  });

  useEffect(() => {
    const timer = setInterval(() => tickRef.current(), 1000);
    console.log("tick:", timer);
    return () => clearInterval(timer);
  }, []);

  return [time];
};

export function UseCountDownDemo(props: IProps) {
  const { mss } = props;
  const [time] = useCCountDown({ mss });
  return <p>{time.toString().padStart(2, "0")}</p>;
}

export function useCCountDown(props: IProps) {
  const { mss } = props;
  const [time, setTime] = useState(mss || 0);
  const tick = useCallback(() => time > 0 && setTime(time - 1), [time]);
  useEffect(() => {
    let timer = setInterval(() => {
      tick();
    }, 1000);
    return () => clearInterval(timer);
  });

  return [time];
}
