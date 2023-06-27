import { Alert, Calendar } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import locale from "antd/es/calendar/locale/ko_KR";

const Schedule = () => {
  const [value, setValue] = useState(() => dayjs(Date.now()));
  const [selectedValue, setSelectedValue] = useState(() => dayjs(Date.now()));
  const onSelect = newValue => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = newValue => {
    setValue(newValue);
  };
  return (
    <div>
      <Calendar
        locale={locale}
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
      <Alert
        message={`오늘의 날짜: ${selectedValue?.format("YYYY-MM-DD")}`}
      />
    </div>
  );
};

export default Schedule;
