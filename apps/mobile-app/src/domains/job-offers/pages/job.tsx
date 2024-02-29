import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import JobList from '../components/job-list';
import { StyleSheet } from 'react-native';
import { useGetJobOffersQuery } from '../store/job-offers.api';
import { EmptyState } from 'common/components/empty-state';
import { LoadingState } from 'common/components/loading-state';

const JobPage = () => {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetJobOffersQuery();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={t('jobOffers:title')} />
      </Appbar.Header>
      <Divider />

      {/* Empty state */}
      {!isLoading && data?.length == 0 && (
        <EmptyState title='Come back later' />
      )}

      {/* Loading state */}
      {isLoading && (
        <LoadingState title={"We're sure you're working hard as well !"} />
      )}

      {/* Full state */}
      {data && <JobList jobOffers={data} />}
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
