import { useGetCompanyQuery } from 'domains/job-offers/store/companies.api';
import { useGetJobOfferQuery } from 'domains/job-offers/store/job-offers.api';
import { useGetJobQuery } from 'domains/job-offers/store/jobs.api';
import {
  Application,
  ApplicationState,
} from 'domains/job-offers/types/applications.type';
import { useTranslation } from 'react-i18next';
import { Avatar, Card, TouchableRipple } from 'react-native-paper';

export type ApplicationItemProps = {
  application: Application;
  onSelected: (application: Application) => void;
};

export function toAvatarIcon(
  state: ApplicationState,
  size: number
): JSX.Element {
  switch (state) {
    case ApplicationState.PENDING:
      return (
        <Avatar.Icon
          icon='clock'
          size={size}
          color='white'
          style={{ backgroundColor: 'orange' }}
        />
      );
    case ApplicationState.APPROVED:
      return (
        <Avatar.Icon
          icon='check'
          size={size}
          style={{ backgroundColor: 'green' }}
        />
      );
    case ApplicationState.REJECTED:
      return (
        <Avatar.Icon
          icon='skull'
          size={size}
          style={{ backgroundColor: 'red' }}
        />
      );
  }
}

export const ApplicationItem = (props: ApplicationItemProps) => {
  const { t } = useTranslation();
  const { data: jobOffer, error: jobOfferError } = useGetJobOfferQuery(
    props.application.jobOfferId
  );
  const { data: job, error: jobError } = useGetJobQuery(jobOffer?.jobId ?? '', {
    skip: !jobOffer,
  });
  const { data: company, error: companyError } = useGetCompanyQuery(
    jobOffer?.companyId ?? '',
    {
      skip: !jobOffer,
    }
  );

  return (
    <TouchableRipple
      onPress={() => props.onSelected(props.application)}
      rippleColor='rgba(0, 0, 0, .1)'
    >
      <Card.Title
        title={`${job?.title} ${t('jobOffers:list:cardSeparator')}`}
        subtitle={`${company?.name} `}
        left={(p) => toAvatarIcon(props.application.state, p.size)}
      />
    </TouchableRipple>
  );
};
