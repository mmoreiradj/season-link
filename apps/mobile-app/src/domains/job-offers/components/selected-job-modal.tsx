import JobOfferType from '../types/job-offer.type';
import { StyleSheet, View } from 'react-native';
import { Avatar, Button, Modal, Portal, Text } from 'react-native-paper';
import { useGetCompanyQuery } from '../store/companies.api';
import { useGetJobQuery } from '../store/jobs.api';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedJobOffer } from '../store/job-offers.slice';
import { useGetJobOfferAdvantagesQuery } from '../store/job-offers.api';
import { useTranslation } from 'react-i18next';
import AdvantageList from './advantage-list';
import { useNavigate } from 'react-router-native';
import { useApplyMutation } from '../store/applications.api';

type Props = {
  jobOffer: JobOfferType;
};

export default function SelectedJobModal({ jobOffer }: Props) {
  const { t } = useTranslation();

  const dispatch = useDispatch();

  const { data: company, error: companyError } = useGetCompanyQuery(
    jobOffer.companyId
  );
  const { data: job, error: jobError } = useGetJobQuery(jobOffer.jobId);
  const { data: advantages, error: advantagesError } =
    useGetJobOfferAdvantagesQuery(jobOffer.id);

  const navigate = useNavigate();

  const [apply, { isLoading: isApplicationLoading }] = useApplyMutation();

  const handleApply = async () => {
    const payload = await apply(jobOffer.id).unwrap();
    dispatch(setSelectedJobOffer(null));
    navigate(`/chat/${payload.id}`, {
      state: { applicationId: payload.id },
    });
  };

  useEffect(() => {
    if (companyError) {
      console.error(companyError);
    }

    if (jobError) {
      console.error(jobError);
    }

    if (advantagesError) {
      console.error(advantagesError);
    }
  }, [companyError, jobError, advantagesError]);

  return (
    <Portal>
      <Modal
        visible={true}
        onDismiss={() => dispatch(setSelectedJobOffer(null))}
        style={style.modalContainer}
      >
        {job && company && advantages ? (
          <View style={style.infoContainer}>
            <Text variant='displaySmall'>{job.title}</Text>

            <Text variant='bodyLarge'>
              {`${t('jobOffers:detail:jobTitleSeparator')} ${company.name}`}
            </Text>

            {/** TODO: Use API */}
            <View style={{ flexDirection: 'row' }}>
              <Avatar.Icon icon='star' size={24} color='orange' />
              <Avatar.Icon icon='star' size={24} color='orange' />
              <Avatar.Icon icon='star' size={24} color='orange' />
              <Avatar.Icon icon='star-half' size={24} color='orange' />
              <Avatar.Icon icon='star-outline' size={24} color='orange' />
            </View>

            <Text variant='bodyLarge'>{jobOffer.address}</Text>

            <Text>
              {t('jobOffers:detail:fromDatePrefix')}&nbsp;
              {new Date(jobOffer.fromDate).toLocaleDateString()}
            </Text>
            <Text>
              {t('jobOffers:detail:toDatePrefix')}&nbsp;
              {new Date(jobOffer.toDate).toLocaleDateString()}
            </Text>
            <View style={style.additionalInfoContainer}>
              <AdvantageList advantages={advantages} />
              <View style={style.smallInfoContainer}>
                <Text>{t('jobOffers:detail:salary')}: </Text>
                <Text>
                  {jobOffer.hourlySalary}
                  {jobOffer.currency}/{t('jobOffers:detail:hour')}
                </Text>
              </View>

              <View style={style.smallInfoContainer}>
                <Text>{t('jobOffers:detail:hoursPerWeek')}: </Text>
                <Text>{jobOffer.hoursPerWeek}</Text>
              </View>

              <Text
                variant='bodyLarge'
                style={{ marginTop: 20, marginBottom: 10, textAlign: 'center' }}
              >
                {t('jobOffers:detail:description')}
              </Text>
              <Text>{jobOffer.description}</Text>

              {!isApplicationLoading ? (
                <Button
                  mode='contained'
                  style={{ marginTop: 20 }}
                  onPress={handleApply}
                >
                  {t('jobOffers:detail:apply')}
                </Button>
              ) : (
                <Text>{t('common:loadingMessage')}</Text>
              )}
            </View>
          </View>
        ) : (
          <Text>{t('common:loadingMessage')}</Text>
        )}
      </Modal>
    </Portal>
  );
}

const style = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 50,
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  additionalInfoContainer: {
    flexDirection: 'column',
    width: '60%',
  },
  smallInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
