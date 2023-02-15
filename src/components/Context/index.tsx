import { IconType } from "antd/es/notification/interface";
import {
  useReducer,
  useContext,
  createContext,
  ReactNode,
  Dispatch,
  Reducer,
} from "react";

type TemperatureState = {
  isLoading: boolean;
  message: IconType | "";
  descriptionMessage: string;
};
type TemperatureAction =
  | {
      type: "GET_TEMPERATURE";
    }
  | {
      type: "GET_TEMPERATURE_SUCCESS";
      payload: { descriptionMessage: string };
    }
  | {
      type: "GET_TEMPERATURE_FAILURE";
      payload: { descriptionMessage: string };
    }
  | {
      type: "RESET_MESSAGE";
    }
  | {
      type: "DELETE_TEMPERATURE_SUCCESS";
      payload: { descriptionMessage: string };
    };

const initialState: TemperatureState = {
  isLoading: false,
  message: "",
  descriptionMessage: "",
};

const TemperatureStateContext = createContext<TemperatureState>(initialState);
const TemperatureDispatchContext = createContext<Dispatch<TemperatureAction>>(
  () => null
);

const reducer: Reducer<TemperatureState, TemperatureAction> = (
  state: TemperatureState,
  action: TemperatureAction
) => {
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
        message: "success",
        descriptionMessage: action.payload.descriptionMessage,
      };
    case "GET_TEMPERATURE_FAILURE":
      return {
        ...state,
        isLoading: false,
        message: "error",
        descriptionMessage: action.payload.descriptionMessage,
      };
    case "RESET_MESSAGE":
      return {
        ...state,
        message: "",
        descriptionMessage: "",
      };
    case "DELETE_TEMPERATURE_SUCCESS":
      return {
        ...state,
        message: "success",
        descriptionMessage: action.payload.descriptionMessage,
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
