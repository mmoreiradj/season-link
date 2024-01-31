import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import JobCategoryType from '../types/job-category.type';

export const JOB_CATEGORIES_SLICE_REDUCER_KEY = 'jobCategoriesApi';

export interface JobCategoriesState {
  list: JobCategoryType[];
}

const initialState: JobCategoriesState = {
  list: [],
};

export const jobCategoriesSlice = createSlice({
  name: JOB_CATEGORIES_SLICE_REDUCER_KEY,
  initialState,
  reducers: {
    setJobCategories: (
      state: JobCategoriesState,
      action: PayloadAction<JobCategoryType[]>
    ) => {
      state.list = action.payload;
    },
  },
});

export const { setJobCategories } = jobCategoriesSlice.actions;
