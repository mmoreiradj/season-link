type JobOfferType = {
  id: string;
  jobId: string;
  fromDate: string;
  toDate: string;
  currency: string;
  hourlySalary: number;
  hoursPerWeek: number;
  description: string;
  address: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
};

export default JobOfferType;
