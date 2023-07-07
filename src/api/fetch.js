import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api/refresh",
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
const getUserPatch = async (_nm, _birth) => {
  try {
    let data = {
      nm: _nm,
      birth: _birth,
    };

    const res = await axiosInstance.patch(`/user/user update`, data);
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
// 그룹 관련 정보
const getGroupAll = async () => {
  try {
    const res = await axiosInstance.get("/group/all");
    const result = res.data;
    return result;
  } catch (err) {
    console.log(err);
    return [
      { igroup: 1, iuser: 1, unm: "wonhee", gnm: "A" },
      { igroup: 1, iuser: 2, unm: "haeun", gnm: "A" },
      { igroup: 1, iuser: 3, unm: "jjjungmin", gnm: "A" },
      { igroup: 1, iuser: 30, unm: "jungminy", gnm: "A" },
      { igroup: 1, iuser: 31, unm: "2hearts", gnm: "A" },
      { igroup: 1, iuser: 32, unm: "hojin", gnm: "A" },
      { igroup: 2, iuser: 1, unm: "wonhee", gnm: "B" },
      { igroup: 3, iuser: 3, unm: "jjjungmin", gnm: "C" },
      { igroup: 3, iuser: 30, unm: "jungminy", gnm: "C" },
      { igroup: 3, iuser: 31, unm: "2hearts", gnm: "C" },
      { igroup: 3, iuser: 32, unm: "hojin", gnm: "C" },
    ];
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
    console.log("grop", _group, "plan", _plan);
    return [];
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
    const result = res.data;
    return result;
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
const patchCompleteList = async _iproduct => {
  try {
    const res = await axiosInstance.patch(`/pdt/finish?iproduct=${_iproduct}`);
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
  getUserPatch,
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
  patchCompleteList,
};
