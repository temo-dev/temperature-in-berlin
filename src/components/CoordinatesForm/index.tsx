import { useState } from "react";
import { Button, Form, InputNumber } from "antd";
import style from "styled-components";
import { getTemperature } from "../../core/api";
import { useDispatchTemperature, useStateTemperature } from "../Context/index";

const StyledForm = style(Form)`
min-width: 300px;
background-color: #fff;
padding: 10px 5px;
`;

const CoordinatesForm = () => {
  const dispatch = useDispatchTemperature();
  const isLoading = useStateTemperature().isLoading;
  const [latitude, setLatitude] = useState(0.0);
  const [longitude, setLongitude] = useState(0.0);

  const onFinish = async () => {
    dispatch({
      type: "GET_TEMPERATURE",
    });
    const response = await getTemperature(latitude, longitude);
    if (response.code === 0) {
      dispatch({
        type: "GET_TEMPERATURE_SUCCESS",
      });
    } else {
      dispatch({
        type: "GET_TEMPERATURE_FAILURE",
      });
    }
  };

  const onChangeLongitude = (value: any) => {
    setLongitude(value);
  };

  const onChangeLatitude = (value: any) => {
    setLatitude(value);
  };

  return (
    <>
      <StyledForm
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Latitude"
          name="latitude"
          initialValue={latitude}
          rules={[{ required: true, message: "Please input your latitude!" }]}
        >
          <InputNumber
            min={-89}
            max={89}
            step="0.01"
            onChange={onChangeLatitude}
            value={latitude}
            disabled={isLoading}
          />
        </Form.Item>

        <Form.Item
          label="Longitude"
          name="longitude"
          initialValue={longitude}
          rules={[{ required: true, message: "Please input your longitude!" }]}
        >
          <InputNumber
            min={-179}
            max={179}
            step="0.01"
            onChange={onChangeLongitude}
            value={longitude}
            disabled={isLoading}
          />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" disabled={isLoading}>
            Search
          </Button>
        </Form.Item>
      </StyledForm>
    </>
  );
};

export default CoordinatesForm;
