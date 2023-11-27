import { applyCaseMiddleware } from './../../node_modules/axios-case-converter/src/middleware';
import axios from 'axios';

const httpClient = applyCaseMiddleware(
  axios.create({
    timeout: 2000,
  })
);

export default httpClient;
