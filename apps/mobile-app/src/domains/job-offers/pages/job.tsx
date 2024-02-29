import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import JobList from '../components/job-list';
import { StyleSheet } from 'react-native';
import { useGetJobOffersQuery } from '../store/job-offers.api';
import { EmptyState } from 'common/components/empty-state';
import { LoadingState } from 'common/components/loading-state';
import { useGetJobsQuery } from '../store/jobs.api';
import { PaperSelect } from 'react-native-paper-select';
import JobType from '../types/job.type';
import { useEffect, useState } from 'react';

const JobPage = () => {
  const { t } = useTranslation();
  const [selectedJob, setSelectedJob] = useState<string>();
  const { data, error, isLoading } = useGetJobOffersQuery(selectedJob ?? '');
  const {
    data: jobData,
    error: jobError,
    isLoading: isJobsLoading,
  } = useGetJobsQuery();

  useEffect(() => {
    console.log(data, error, isLoading);
  });

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={t('jobOffers:title')} />
      </Appbar.Header>
      <Divider />

      {/* Empty state */}
      {!isLoading &&
        !isJobsLoading &&
        (data?.length == 0 || data == undefined) && (
          <EmptyState title='Come back later' />
        )}

      {/* Loading state */}
      {isLoading && !isJobsLoading && (
        <LoadingState title={"We're sure you're working hard as well !"} />
      )}

      {/* Full state */}
      {data && jobData && (
        <>
          <PaperSelect
            containerStyle={{ paddingHorizontal: 10 }}
            label='Job'
            arrayList={
              jobData?.map((category) => ({
                value: category.title,
                _id: category.id,
              })) ?? []
            }
            value={
              (
                jobData?.find((category) => category.id === selectedJob) ?? {
                  id: 'job id',
                  title: 'Job',
                }
              ).title
            }
            onSelection={(itemValue) => {
              console.log(itemValue);
              setSelectedJob(itemValue.selectedList[0]._id);
            }}
            multiEnable={false}
            selectedArrayList={[
              {
                _id: selectedJob ?? '',
                value: selectedJob ?? '',
              },
            ]}
            textInputMode='outlined'
          />
          <Divider />
          <JobList jobOffers={data} />
        </>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
});

export default JobPage;
