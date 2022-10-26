import React, {
  useCallback,
  useState,
  useEffect,
  createContext,
  useMemo,
} from "react";
import { createBrowserHistory as createHistory } from "history";

const RooterContext = createContext();
let rootHistory = null;

function Router(props) {
  const history = useMemo(() => {
    rootHistory = createHistory();
    return rootHistory;
  }, []);

  const [location, setLocation] = useState(history.location);

  useEffect(() => {
    const unlisten = history.listen((location) => {
      setLocation(location);
    });
    return function () {
      unlisten && unlisten();
    };
  }, []);

  return (
    <RooterContext.Provider
      value={{
        location,
        history,
        match: {
          path: "/",
          url: "/",
          params: {},
          isExtract: location.pathname === "/",
        },
      }}
    >
      {props.children}
    </RooterContext.Provider>
  );
}
