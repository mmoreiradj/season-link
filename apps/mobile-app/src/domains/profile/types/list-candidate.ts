export enum SubscriptionLevel {
  Free = 'Free',
  Silver = 'Silver',
  Gold = 'Gold',
  Platinium = 'Platinium',
}

type ListCandidateType = {
  job_id: string;
  start_date: string;
  end_date: string;
  subscription_level: SubscriptionLevel;
};

export default ListCandidateType;
