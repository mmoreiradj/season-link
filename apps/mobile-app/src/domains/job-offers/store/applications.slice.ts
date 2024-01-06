import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Application } from '../types/applications.type';

export const APPLICATIONS_SLICE_REDUCER_KEY = 'applicationsApi';

export interface ApplicationState {
  list: Application[];
  selectedApplication: Application | null;
}

const initialState: ApplicationState = {
  list: [],
  selectedApplication: null,
};

export const applicationsSlice = createSlice({
  name: APPLICATIONS_SLICE_REDUCER_KEY,
  initialState,
  reducers: {
    setApplications: (
      state: ApplicationState,
      action: PayloadAction<Application[]>
    ) => {
      state.list = action.payload;
    },
    setSelectedApplication: (
      state: ApplicationState,
      action: PayloadAction<Application | null>
    ) => {
      state.selectedApplication = action.payload;
    },
  },
});

export const {
  setApplications: setJobOffers,
  setSelectedApplication: setSelectedJobOffer,
} = applicationsSlice.actions;

export default applicationsSlice.reducer;
