export enum ApplicationState {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export type Application = {
  id: string;
  state: ApplicationState;
  jobOfferId: string;
  candidateId: string;
  createdAt: string;
  updatedAt: string;
};
