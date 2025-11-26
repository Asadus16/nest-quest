import { createSlice } from "@reduxjs/toolkit";

let HouseDetail = {
  startScroll: false,
  houseInfo: {},
  isLoading: true,
  isVisible: true,
};

const HouseDetailSlice = createSlice({
  name: "HouseDetail",
  initialState: HouseDetail,
  reducers: {
    setHouseInfo(state, action) {
      const { id, data, ...legacyPayload } = action.payload || {};

      // Legacy support: if no id/data provided, merge payload directly (previous behavior)
      if (!id || !data) {
        state.houseInfo = { ...state.houseInfo, ...legacyPayload };
        return;
      }

      const normalizedData = { ...data };
      if (
        normalizedData.price &&
        normalizedData.country &&
        normalizedData.country === "United States"
      ) {
        normalizedData.price = Math.ceil(normalizedData.price / 83);
      }

      state.houseInfo = {
        ...state.houseInfo,
        [id]: normalizedData,
      };
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setIsVisible(state, action) {
      state.isVisible = action.payload;
    },
  },
});

export const { setHouseInfo, setIsLoading, setIsVisible } =
  HouseDetailSlice.actions;

export default HouseDetailSlice.reducer;
