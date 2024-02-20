import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import JobList from '../components/job-list';
import { StyleSheet } from 'react-native';

const JobPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={t('jobOffers:title')} />
      </Appbar.Header>
      <Divider />

      <JobList />
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
