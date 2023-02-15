import { useEffect } from "react";
import { Button, Space, Table } from "antd";
import style from "styled-components";
import { DataTypeTemperatue } from "../../core/types";
import Column from "antd/es/table/Column";
import { useStateTemperature } from "../Context/index";
import { getItemInLocal, setItemsInLocal } from "../../core/utils";
import { useState } from "react";

const StyledListItems = style(Table)`
`;

const TableListItems = () => {
  const isLoading = useStateTemperature().isLoading;
  const initialStateValue: DataTypeTemperatue[] = [];
  const [data, setData] = useState(initialStateValue);

  useEffect(() => {
    const dataListItem: DataTypeTemperatue[] =
      getItemInLocal("temperature") || [];
    if (dataListItem) {
      setData(dataListItem);
    }
  }, [isLoading]);

  const onDelete = (value: string) => {
    const newDataListItem = data.filter((item) => item.key !== value);
    setItemsInLocal("temperature", newDataListItem);
    setData(newDataListItem);
  };

  const onDeleteAll = () => {
    const newData: DataTypeTemperatue[] = [];
    setItemsInLocal("temperature", newData);
    setData(newData);
  };

  return (
    <>
      <Button
        type="primary"
        disabled={isLoading || !data.length}
        danger
        onClick={onDeleteAll}
      >
        Clear All Data
      </Button>
      <StyledListItems
        dataSource={data}
        bordered
        pagination={false}
        scroll={{ y: 240 }}
      >
        <Column
          title="Temperature"
          dataIndex="temperature"
          key="temperature"
          render={(text) => (
            <span>
              {text} <span>&#8451;</span>
            </span>
          )}
        />
        <Column title="Reality Latitude" dataIndex="latitude" key="latitude" />
        <Column
          title="Reality Longitude"
          dataIndex="longitude"
          key="longitude"
        />
        <Column title="TimeZone" dataIndex="timezone" key="timezone" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataTypeTemperatue) =>
            data.length > 0 ? (
              <Space size="middle">
                <Button
                  type="primary"
                  danger
                  disabled={isLoading}
                  onClick={() => onDelete(record.key)}
                >
                  Delete
                </Button>
              </Space>
            ) : null
          }
        />
      </StyledListItems>
    </>
  );
};

export default TableListItems;
