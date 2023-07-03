import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.144:5007/api/refresh",
  timeout: 1000,
  headers: {
    "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    Accept: "*/*",
  },
});

const getCate = async () => {
  try {
    const res = await axiosInstance.get("/category");
    const result = res.data;
    const updateCate = result.map(item => {
      return {
        value: item.icate,
        label: item.nm,
      };
    });
    return updateCate;
  } catch (err) {
    console.log(err);
  }
};
const getUnit = async () => {
  try {
    const res = await axiosInstance.get("unit");
    const result = res.data;
    const updateUnit = result.map(item => {
      return {
        value: item.iunit,
        label: item.nm,
      };
    });
    return updateUnit;
  } catch (err) {
    console.log(err);
  }
};

// 사용자 정보 관련 API
const getUserLogin = async () => {
  try {
    const res = await axiosInstance.get("/user/all");
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
const getUserAll = async () => {
  try {
    const res = await axiosInstance.get("/user/all/{igroup}");
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
const getGroupAll = async () => {
  try {
    const res = await axiosInstance.get("/group/all");
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};

export { getCate, getUnit, getUserLogin, getGroupAll, getUserAll };
=======
// 날짜, 아이템
const getPlan = async () => {
  try {
    const res = await axiosInstance.get("/plan");
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
const getItemList = async () => {
  try {
    const res = await axiosInstance.get(`/pdt?igroup=1&iplan=6`);
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
export { getCate, getUnit, getUserAll, getGroupAll, getPlan, getItemList };

