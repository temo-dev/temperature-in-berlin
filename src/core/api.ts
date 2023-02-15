import axios from "axios";
import { DataTypeTemperatue } from "./types";
import { v4 as uuidv4 } from "uuid";
import { setItemInLocal } from "./utils";
export const getTemperature = async (latitude: number, longitude: number) => {
  const valueLatitude = latitude.toString();
  const valueLongitude = longitude.toString();
  try {
    await axios
      .get(
        `https://api.open-meteo.com/v1/gem?latitude=${valueLatitude}&longitude=${valueLongitude}&current_weather=true&timezone=Europe%2FBerlin`
      )
      .then((res) => {
        const itemTemperature: DataTypeTemperatue = {
          key: uuidv4(),
          temperature: res.data.current_weather.temperature,
          latitude: res.data.latitude.toFixed(2),
          longitude: res.data.longitude.toFixed(2),
          timezone: res.data.timezone,
        };
        setItemInLocal("temperature", itemTemperature);
      });
    return {
      code: 0,
      message: "Success",
    };
  } catch (error) {
    return {
      code: 1,
      message: "error",
    };
  }
};
