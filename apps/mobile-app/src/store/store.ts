import userReducer from './user/userSlice';
import authReducer from './auth/authSlice';
import jobOffersReducer from 'src/domains/jobs/store/job-offers.slice';
import { configureStore } from '@reduxjs/toolkit';
import { jobOffersApi } from 'domains/jobs/store/job-offers.api';
import { jobsApi } from 'domains/jobs/store/jobs.api';
import { companiesApi } from 'domains/jobs/store/companies.api';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    jobOffers: jobOffersReducer,
    [jobOffersApi.reducerPath]: jobOffersApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(jobOffersApi.middleware)
      .concat(jobsApi.middleware)
      .concat(companiesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
