type CandidateType = {
  id: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  nationality_country_id?: string;
  description: string;

  email: string;
  phone_number: string;
  address: string;
  gender: number;

  is_available: boolean;
  available_from: string;
  available_To: string;
  place: string;
  job_id: string;
};

export default CandidateType;
