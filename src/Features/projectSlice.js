import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projectData: [],
  projectByUserID: [],
  projectLoading: false,
  projectSuccess: null,
  projectError: null,
  projectMedia: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    projectReq: (state, action) => {
      state.projectLoading = true;
      state.projectSuccess = null;
      state.projectError = null;
      state.projectByUserID = [];

    },

    projectFetch: (state, action) => {
      state.projectLoading = false;
      state.projectData = action.payload;
    },
    fetchByUserID: (state, action) => {
      state.projectLoading = false;
      state.projectByUserID = action.payload;
    },
    projectSuccess: (state, action) => {
      state.projectLoading = false;
      state.projectSuccess = action.payload;
    },
    projectMedia: (state, action) => {
      state.projectMedia = action.payload;
    },
    projectFail: (state, action) => {
      state.projectLoading = false;
      state.projectSuccess = null;
      state.projectError = action.payload;
    },
  },
});

export const {
  projectReq,
  projectFetch,
  fetchByUserID,
  projectSuccess,
  projectFail,
  projectMedia
} = projectSlice.actions;
export default projectSlice.reducer;
