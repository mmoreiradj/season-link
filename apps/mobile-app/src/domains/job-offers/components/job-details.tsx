import { View } from 'react-native';
import JobOfferType from '../types/job-offer.type';
import { Button, Text } from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import AdvantageList from './advantage-list';
import { useTranslation } from 'react-i18next';
import {
  useGetCompanyQuery,
  useGetCompanyRatingQuery,
} from '../store/companies.api';
import { useGetJobQuery } from '../store/jobs.api';
import { useGetJobOfferAdvantagesQuery } from '../store/job-offers.api';
import { useNavigate } from 'react-router-native';
import { useApplyMutation } from '../store/applications.api';
import { useEffect } from 'react';

export type JobDetailsProps = {
  jobOffer: JobOfferType;
};

export const JobDetails = (props: JobDetailsProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [apply, { isLoading: isApplicationLoading }] = useApplyMutation();

  const { data: company, error: companyError } = useGetCompanyQuery(
    props.jobOffer.companyId
  );
  const { data: job, error: jobError } = useGetJobQuery(props.jobOffer.jobId);
  const { data: advantages, error: advantagesError } =
    useGetJobOfferAdvantagesQuery(props.jobOffer.id);

  const { data: rating, error: ratingError } = useGetCompanyRatingQuery(
    props.jobOffer.companyId,
    { skip: !props.jobOffer.companyId }
  );

  // Generate an application then navigate to the chat
  const handleApply = async () => {
    const payload = await apply(props.jobOffer.id).unwrap();
    navigate(`/chat/${payload.id}`, {
      state: { applicationId: payload.id },
    });
  };

  return (
    <View style={{ margin: 10, marginHorizontal: 15 }}>
      <View>
        <Text variant='titleLarge'>{job?.title}</Text>

        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
          <Text variant='bodyLarge'>
            {`${t('jobOffers:detail:jobTitleSeparator')} ${company?.name}`}
          </Text>

          <Rating startingValue={rating ?? 0} readonly={true} imageSize={18} />
        </View>
      </View>
      <View>
        {/* Date from and to */}
        <Text>
          {t('jobOffers:detail:fromDatePrefix')}&nbsp;
          {new Date(props.jobOffer.fromDate).toLocaleDateString()} -{' '}
          {t('jobOffers:detail:toDatePrefix')}&nbsp;
          {new Date(props.jobOffer.toDate).toLocaleDateString()}
        </Text>
      </View>

      <Text variant='bodyLarge'>{props.jobOffer.address}</Text>

      {/* Advantage and salary */}
      <View>
        <AdvantageList advantages={advantages ?? []} />
        <View style={{ flexDirection: 'row' }}>
          <Text>{t('jobOffers:detail:salary')}: </Text>
          <Text>
            {props.jobOffer.hourlySalary}
            {props.jobOffer.currency}/{t('jobOffers:detail:hour')}
          </Text>
          <Text> - {props.jobOffer.hoursPerWeek} h/week</Text>
        </View>

        <Text
          variant='bodyLarge'
          style={{ marginTop: 20, marginBottom: 10, textAlign: 'center' }}
        >
          {t('jobOffers:detail:description')}
        </Text>
        <Text>{props.jobOffer.description}</Text>

        <Button
          mode='contained'
          style={{ marginTop: 20 }}
          onPress={handleApply}
        >
          {t('jobOffers:detail:apply')}
        </Button>
      </View>
    </View>
  );
};
