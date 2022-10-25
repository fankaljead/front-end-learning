import React, {
  PropsWithChildren,
  ReactElement,
  ValidationMap,
  WeakValidationMap,
  useState,
  useCallback,
  useMemo,
  useReducer,
  useRef,
} from "react";

const Container = ({
  visible = false,
  controller = () => {},
}: IContainerProps): JSX.Element => {
  return <p>zxh</p>;
};

export interface IContainerProps {
  visible: boolean;
  controller: () => void;
}

const Containerr: React.FC<IContainerProps> = ({
  visible = false,
  controller = () => {},
}: IContainerProps): JSX.Element => {
  return <p>zxh</p>;
};

interface FunctionComponent<P = {}> {
  (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  propTypes?: WeakValidationMap<P> | undefined;
  contextTypes?: ValidationMap<any> | undefined;
  defaultProps?: Partial<P> | undefined;
  displayName?: string | undefined;
}

interface ICellProps<TData> {
  field: keyof TData;
}

const Cell = <T extends Record<string, any>>(
  props: PropsWithChildren<ICellProps<T>>
) => {
  return <p></p>;
};

interface IDataStruct {
  name: string;
  age: number;
}

const App = () => {
  const [state1, setState1] = useState("zxh");
  const [state2, setState2] = useState<string>();

  const domRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<number>(10);

  const operateRef = () => {
    domRef.current?.getBoundingClientRect();
    valueRef.current += 1;
  };

  const hander1 = useCallback((input: number) => {
    return input > 100;
  }, []);

  const handler2 = useCallback<(input: number, compare: boolean) => boolean>(
    (input: number) => {
      return input > 24;
    },
    []
  );

  const result1 = useMemo(() => {
    return "ddd";
  }, []);

  const result2 = useMemo<{ name?: string }>(() => {
    return {};
  }, []);

  return (
    <div ref={domRef}>
      <Cell<IDataStruct> field="name"></Cell>
      <Cell<IDataStruct> field="age"></Cell>
    </div>
  );
};
