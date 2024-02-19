
  import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
  import { getApi } from "../../config/configAxios";
  
// Async action to get properties with pagination
export const getActiveProperties = createAsyncThunk(
  "properties/getActiveProperties",
  async ({ page =1, pageSize = 20 }, { rejectWithValue }) => {
    try {
      const response = await getApi(`/getActiveProperties?page=${page}&pageSize=${pageSize}`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

  
  const initialState = {
    properties: [],
    status: "idle",
    error: null,
    currentPage: 1,
    pageSize: 23, 
    totalPages: 1,
  };
  
  const propertySlice = createSlice({
    name: "properties",
    initialState,
    reducers: {
      setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getActiveProperties.pending, (state) => {
          state.status = "loading";
          state.error = null;
        })
        .addCase(getActiveProperties.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.properties = action.payload.activeProperties;
          state.totalPages = action.payload.totalPages;
        })
        .addCase(getActiveProperties.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });
  
  export const { setCurrentPage } = propertySlice.actions;
  
  export default propertySlice.reducer;
  
