import { Alert, Calendar, Modal } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import locale from "antd/es/calendar/locale/ko_KR";
import "../style/schedule.css";
import FirstItem from "./FirstItem";

const Schedule = () => {
  const hi = [
    { date: "2023-06-20" },
    { date: "2023-06-03" },
    { date: "2023-06-10" },
    { date: "2023-06-29" },
  ];
  const [value, setValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(Date.now()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cellRender = date => {
    const dateString = date.format("YYYY-MM-DD");

    const result = hi.find(item => {
      if (item.date === dateString) {
        return item;
      }
    });
    if (result) {
      return <div>{"장보는날"}</div>;
    }
    return null;
  };
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onSelect = newValue => {
    setValue(newValue);
    setSelectedValue(newValue);
    const dateString = newValue.format("YYYY-MM-DD");
    const result = hi.find(item => {
      if (item.date === dateString) {
        return item;
      }
    });
    if (!result) {
      showModal();
    }
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = newValue => {
    setValue(newValue);
  };
  return (
    <div>
      <Modal
        title={`${selectedValue?.format("YYYY-MM-DD")}`}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <FirstItem />
      </Modal>
      <Calendar
        locale={locale}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        cellRender={cellRender}
      />
      {selectedValue?.format("YYYY-MM-DD")}
    </div>
  );
};

export default Schedule;
