import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import JobOfferType from '../types/job-offer.type';

export const JOB_OFFERS_SLICE_REDUCER_KEY = 'jobOffersApi';

export interface JobOffersState {
  list: JobOfferType[];
  selectedJobOffer: JobOfferType | null;
}

const initialState: JobOffersState = {
  list: [],
  selectedJobOffer: null,
};

export const jobOffersSlice = createSlice({
  name: JOB_OFFERS_SLICE_REDUCER_KEY,
  initialState,
  reducers: {
    setJobOffers: (
      state: JobOffersState,
      action: PayloadAction<JobOfferType[]>
    ) => {
      state.list = action.payload;
    },
    setSelectedJobOffer: (
      state: JobOffersState,
      action: PayloadAction<JobOfferType | null>
    ) => {
      state.selectedJobOffer = action.payload;
    },
  },
});

export const { setJobOffers, setSelectedJobOffer } = jobOffersSlice.actions;

export default jobOffersSlice.reducer;
