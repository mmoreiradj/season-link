import userReducer from 'domains/profile/store/userSlice';
import authReducer from './auth/authSlice';
import jobOffersReducer from 'domains/job-offers/store/job-offers.slice';
import { configureStore } from '@reduxjs/toolkit';
import { jobOffersApi } from 'domains/job-offers/store/job-offers.api';
import { jobsApi } from 'domains/job-offers/store/jobs.api';
import { companiesApi } from 'domains/job-offers/store/companies.api';
import { applicationsApi } from 'domains/job-offers/store/applications.api';
import { jobCategoriesApi } from 'domains/job-categories/store/job-category.api';
import { profilesApi } from 'domains/profile/store/profile.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobOffers: jobOffersReducer,
    [jobOffersApi.reducerPath]: jobOffersApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [applicationsApi.reducerPath]: applicationsApi.reducer,
    [jobCategoriesApi.reducerPath]: jobCategoriesApi.reducer,
    [profilesApi.reducerPath]: profilesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobOffersApi.middleware)
      .concat(jobsApi.middleware)
      .concat(companiesApi.middleware)
      .concat(applicationsApi.middleware)
      .concat(jobCategoriesApi.middleware)
      .concat(profilesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
