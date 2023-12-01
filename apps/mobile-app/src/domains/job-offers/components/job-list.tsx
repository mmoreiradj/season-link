import { useTranslation } from 'react-i18next';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useGetJobOffersQuery } from '../store/job-offers.api';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setJobOffers } from '../store/job-offers.slice';
import JobListItem from './job-list-item';
import SelectedJobModal from './selected-job-modal';

export default function JobList() {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetJobOffersQuery();
  const jobOffers = useSelector((state: RootState) => state.jobOffers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setJobOffers(data));
    }
  }, [data]);

  if (isLoading) {
    return (
      <View style={style.loadingContainer}>
        <ActivityIndicator size='large' color='white' />
        <Text style={style.loadingMessageContainer}>
          {t('jobOffers:list:loadingMessage')}
        </Text>
      </View>
    );
  } else if (error) {
    return (
      <View style={style.loadingContainer}>
        <Text style={style.loadingMessageContainer}>
          {t('common:errorMessage')}
        </Text>
      </View>
    );
  } else if (jobOffers.list.length === 0) {
    return (
      <View style={style.loadingContainer}>
        <Text style={style.loadingMessageContainer}>
          {t('jobOffers:list:empty')}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={style.container}>
        {jobOffers.list.map((jobOffer) => (
          <JobListItem key={jobOffer.id} jobOffer={jobOffer} />
        ))}
        {jobOffers.selectedJobOffer && (
          <SelectedJobModal jobOffer={jobOffers.selectedJobOffer} />
        )}
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMessageContainer: {
    alignItems: 'center',
  },
});
