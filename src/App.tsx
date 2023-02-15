import { Col, notification, Row, Spin } from "antd";
import style from "styled-components";
import CoordinatesForm from "./components/CoordinatesForm";
import TableListItems from "./components/TableListItems";
import { LoadingOutlined } from "@ant-design/icons";
import { useStateTemperature } from "./components/Context";
import type { IconType } from "antd/es/notification/interface";
import React, { useEffect, useMemo } from "react";
import { useDispatchTemperature } from "./components/Context/index";

const StyledApp = style.div`
  display: flex;
  justify-content: center;
  center-content: center;
  position: relative;
  max-width: 1300px;
`;
const StyledContainer = style(Row)`
`;

const StyledLoading = style(Spin)`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
`;

const Context = React.createContext({ name: "Default" });
function App() {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const dispatch = useDispatchTemperature();
  const isLoading = useStateTemperature().isLoading;
  const message = useStateTemperature().message;
  const description = useStateTemperature().descriptionMessage;
  const [api, contextHolder] = notification.useNotification();
  const contextValue = useMemo(() => ({ name: "Admin" }), []);

  useEffect(() => {
    openNotification(message);
  }, [message]);

  const openNotification = (iconType: IconType | "") => {
    switch (iconType) {
      case "success":
        api.success({
          message: `Notification ${iconType}`,
          description: (
            <Context.Consumer>
              {({ name }) => `${name}: ${description}`}
            </Context.Consumer>
          ),
        });
        break;
      case "error":
        api.error({
          message: `Notification ${iconType}`,
          description: (
            <Context.Consumer>
              {({ name }) => `${name}: ${description}`}
            </Context.Consumer>
          ),
        });
        break;
      default:
        break;
    }
    dispatch({
      type: "RESET_MESSAGE",
    });
  };
  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <h3>Temperature with Coordinates - TimeZone: Berlin</h3>
        <StyledApp>
          {isLoading ? <StyledLoading indicator={loadingIcon} /> : null}
          <StyledContainer gutter={16} justify="space-evenly">
            <Col lg={6} xs={24}>
              <CoordinatesForm />
            </Col>
            <Col lg={18} xs={24}>
              <TableListItems />
            </Col>
          </StyledContainer>
        </StyledApp>
      </Context.Provider>
    </>
  );
}

export default App;
