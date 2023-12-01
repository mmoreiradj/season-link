import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import JobList from '../components/job-list';
import { StyleSheet } from 'react-native';

const JobPage = () => {
  const { t } = useTranslation();

  return (
    <View style={style.container}>
      <View>
        <Text variant='displayMedium'>{t('jobOffers:title')}</Text>
      </View>
      <JobList />
    </View>
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
