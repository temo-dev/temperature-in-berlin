import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
} from "react";

type TemperatureState = {
  isLoading: boolean;
};
type TemperatureAction =
  | {
      type: "GET_TEMPERATURE";
    }
  | {
      type: "GET_TEMPERATURE_SUCCESS";
    }
  | {
      type: "GET_TEMPERATURE_FAILURE";
    };

const initialState: TemperatureState = {
  isLoading: false,
};

const TemperatureStateContext = createContext<TemperatureState>(initialState);
const TemperatureDispatchContext = createContext<Dispatch<TemperatureAction>>(
  () => null
);

const reducer = (state: TemperatureState, action: TemperatureAction) => {
  switch (action.type) {
    case "GET_TEMPERATURE":
      return {
        ...state,
        isLoading: true,
      };
    case "GET_TEMPERATURE_SUCCESS":
      return {
        ...state,
        isLoading: false,
      };
    case "GET_TEMPERATURE_FAILURE":
      return {
        ...state,
        isLoading: false,
      };
    default:
      throw new Error(`Unknown action: ${JSON.stringify(action)}`);
  }
};

type TemperatureProviderProps = {
  children: ReactNode;
  initialValue?: TemperatureState;
};

export const TemperatureProvider = ({
  children,
  initialValue = initialState,
}: TemperatureProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialValue);
  return (
    <TemperatureDispatchContext.Provider value={dispatch}>
      <TemperatureStateContext.Provider value={state}>
        {children}
      </TemperatureStateContext.Provider>
    </TemperatureDispatchContext.Provider>
  );
};

export const useStateTemperature = () => useContext(TemperatureStateContext);
export const useDispatchTemperature = () =>
  useContext(TemperatureDispatchContext);
