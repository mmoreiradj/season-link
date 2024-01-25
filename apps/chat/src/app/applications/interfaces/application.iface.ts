import ApplicationState from './application-state.enum';

export interface Application {
  id: string;
  state: ApplicationState;
  jobOfferId: string;
  candidateId: string;
  createdAt: string;
  updatedAt: string;
}

export default Application;
