import { Col, Row, Spin } from "antd";
import style from "styled-components";
import CoordinatesForm from "./components/CoordinatesForm";
import TableListItems from "./components/TableListItems";
import { LoadingOutlined } from "@ant-design/icons";
import { useStateTemperature } from "./components/Context";

const StyledApp = style.div`
  display: flex;
  justify-content: center;
  center-content: center;
  position: relative;
`;
const StyledContainer = style(Row)`
`;

const StyledLoading = style(Spin)`
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
`;

function App() {
  const loadingIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
  const isLoading = useStateTemperature().isLoading;
  return (
    <>
      <h3>Find Temperature with Coordinates in Berlin</h3>
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
    </>
  );
}

export default App;
