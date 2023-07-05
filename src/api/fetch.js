import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://192.168.0.144:5007/api/refresh",
  timeout: 1000,
  headers: {
    "Content-type": "application/json",
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
    const res = await axiosInstance.get("/user/all/igroup");
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

// 날짜, 아이템
const getPlan = async _group => {
  try {
    const res = await axiosInstance.get(`/plan?igroup=${_group}`);
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};

// 아이템 관련
const getItemList = async (_group, _plan) => {
  try {
    const res = await axiosInstance.get(`/pdt?igroup=${_group}&iplan=${_plan}`);
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
// Post
const postPlan = async _planData => {
  try {
    const res = await axiosInstance.post("/plan", _planData);
    // console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const postItem = async _itemData => {
  try {
    const res = await axiosInstance.post("/pdt", _itemData);
    console.log(_itemData);
    return res.data;
  } catch (err) {
    console.log(err);
    // console.log(_itemData);
  }
};
const deleteItemList = async _iproduct => {
  try {
    const res = await axiosInstance.delete(`/pdt?iproduct=${_iproduct}`);
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
const deletePlan = async _iplan => {
  try {
    const res = await axiosInstance.delete(`/plan/{iplan}?iplan=${_iplan}`);
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
const patchItemList = async (_iproduct, _icate, _nm, _cnt, _iunit) => {
  try {
    let data = {
      iproduct: _iproduct,
      icate: _icate,
      nm: _nm,
      cnt: _cnt,
      iunit: _iunit,
    };

    const res = await axiosInstance.patch(`/pdt`, data);
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};
const patchPlan = async (_planPK, _date) => {
  try {
    const res = await axiosInstance.put(`/plan/{iplan}`, {
      iplan: _planPK,
      createdAt: _date,
    });
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
  }
};

export {
  getCate,
  getUnit,
  getUserLogin,
  getGroupAll,
  getUserAll,
  getPlan,
  getItemList,
  postPlan,
  postItem,
  patchItemList,
  deleteItemList,
  deletePlan,
  patchPlan,
};
