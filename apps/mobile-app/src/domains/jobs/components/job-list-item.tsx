import { Avatar, Card, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';
import JobOfferType from '../types/job-offer.type';
import { useGetJobQuery } from '../store/jobs.api';
import { t } from 'i18next';
import { useGetCompanyQuery } from '../store/companies.api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedJobOffer } from '../store/job-offers.slice';

type Props = {
  jobOffer: JobOfferType;
};

export default function JobListItem({ jobOffer }: Props) {
  const dispatch = useDispatch();
  const { data: job, error: jobError } = useGetJobQuery(jobOffer.jobId);
  const { data: company, error: companyError } = useGetCompanyQuery(
    jobOffer.companyId
  );

  useEffect(() => {
    if (jobError) {
      console.error(jobError);
    }

    if (companyError) {
      console.error(companyError);
    }
  }, [jobError, companyError]);

  if (job && company) {
    return (
      <TouchableRipple
        onPress={() => dispatch(setSelectedJobOffer(jobOffer))}
        rippleColor='rgba(0, 0, 0, .1)'
      >
        <Card.Title
          title={`${job.title} ${t('jobOffers:list:cardSeparator')}`}
          subtitle={company.name}
          left={(props) => <Avatar.Icon {...props} icon='domain' />}
        />
      </TouchableRipple>
    );
  } else if (jobError || companyError) {
    return (
      <Card.Title
        title={t('jobOffers:detail:jobError')}
        subtitle={t('jobOffers:detail:jobErrorMessage')}
        left={(props) => <Avatar.Icon {...props} icon='domain' />}
      />
    );
  } else {
    return (
      <View>
        <Card.Title
          title={t('jobOffers:detail:jobLoading')}
          subtitle={t('jobOffers:detail:jobLoading')}
          left={(props) => <Avatar.Icon {...props} icon='domain' />}
        />
      </View>
    );
  }
}
