import { EmptyState } from 'common/components/empty-state';
import { LoadingState } from 'common/components/loading-state';
import { CompanyRatingForm } from 'domains/job-offers/components/company-rating-form';
import { ExecutedJob } from 'domains/job-offers/components/executed-job';
import {
  useGetApplicationsQuery,
  useGetExecutedJobOffersQuery,
} from 'domains/job-offers/store/applications.api';
import { useRateCompanyMutation } from 'domains/job-offers/store/companies.api';

import { ApplicationState } from 'domains/job-offers/types/applications.type';
import JobOfferType from 'domains/job-offers/types/job-offer.type';
import JobType from 'domains/job-offers/types/job.type';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import App from 'src/App';

const HistoryPage = () => {
  const [modalJobOffer, setModalJobOffer] = useState<JobOfferType | null>(null);

  const {
    data: executedJobs,
    isLoading: isExecutedJobLoading,
    error: executedJobsError,
  } = useGetExecutedJobOffersQuery();
  const [rate, { isLoading: isRating }] = useRateCompanyMutation();

  useEffect(() => {
    console.log({ executedJobs, executedJobsError });
  }, [executedJobs, executedJobsError]);

  const renderItem = ({ item }: { item: JobOfferType }) => {
    return (
      <ExecutedJob
        key={item.id}
        executedJobOffer={item}
        onRate={(jobOffer) => setModalJobOffer(jobOffer)}
      />
    );
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='History' />
      </Appbar.Header>
      <Divider />

      {/* Empty state */}
      {!isExecutedJobLoading && executedJobs?.length == 0 && (
        <EmptyState title='Try to get more jobs !' />
      )}

      {/* Loading state */}
      {isExecutedJobLoading && (
        <LoadingState title={"We're sure you're working hard as well !"} />
      )}

      {/* Full state */}
      {executedJobs && (
        <FlatList
          style={{ paddingHorizontal: 20 }}
          contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
          data={executedJobs ?? []}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Form is hidden by default */}
      <CompanyRatingForm
        companyId={modalJobOffer?.companyId}
        onSubmit={(createRating) => {
          rate({ companyId: modalJobOffer!.companyId, ...createRating });
          setModalJobOffer(null);
        }}
        onCancel={() => setModalJobOffer(null)}
      />
    </>
  );
};

export default HistoryPage;
