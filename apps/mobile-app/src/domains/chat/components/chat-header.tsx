import JobListItem from 'domains/job-offers/components/job-list-item';
import { useGetJobOfferQuery } from 'domains/job-offers/store/job-offers.api';
import { Application } from 'domains/job-offers/types/applications.type';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

type Props = {
  application: Application;
};

export default function ChatHeader({ application }: Props) {
  const { t } = useTranslation();
  const {
    data: jobOffer,
    error: jobOfferError,
    isLoading: isJobOfferLoading,
  } = useGetJobOfferQuery(application.jobOfferId);

  useEffect(() => {
    if (jobOfferError) console.log(jobOfferError);
  }, [jobOfferError]);

  return (
    <View style={style.container}>
      {jobOffer && <JobListItem jobOffer={jobOffer!} onSelected={() => {}} />}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '80%',
    alignItems: 'stretch',
    flexDirection: 'column',
  },
});
