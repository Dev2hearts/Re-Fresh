import React from "react";
import { useState } from "react";
import { ItemBox } from "../style/FirstItemCss";
import { InputNumber, Input, Space, Select } from "antd";

const FirstItem = () => {
  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = value => {
    console.log(`Selected: ${value}`);
  };
  return (
    <ItemBox>
      <div>
        <Space direction="vertical" style={{ width: "100%" }}>
          <Select
            size="middle"
            defaultValue="a1"
            onChange={handleChange}
            style={{ width: 200 }}
            options={options}
          />
        </Space>
      </div>

      <div>
        <Input placeholder="Basic usage" />
        <InputNumber defaultValue={100} />
      </div>

      <div className="flex items-center">
        <button>Save</button>
        <button>Cancle</button>
      </div>
    </ItemBox>
  );
};

export default FirstItem;
