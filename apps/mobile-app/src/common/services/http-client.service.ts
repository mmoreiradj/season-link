// TODO: Use rtk-query for this service
import axios from 'axios';
import applyCaseMiddleware from 'axios-case-converter';

const httpClient = applyCaseMiddleware(
  axios.create({
    timeout: 2000,
  })
);

export default httpClient;
