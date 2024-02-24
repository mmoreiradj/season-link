import { Avatar, Card, TouchableRipple } from 'react-native-paper';
import { View } from 'react-native';
import JobOfferType from '../types/job-offer.type';
import { useGetJobQuery } from '../store/jobs.api';
import { t } from 'i18next';
import { useGetCompanyQuery } from '../store/companies.api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedJobOffer } from '../store/job-offers.slice';
import JobCategoryType from 'domains/job-categories/types/job-category.type';
import {
  useGetJobCategoriesQuery,
  useGetJobCategoryQuery,
} from 'domains/job-categories/store/job-category.api';

type JobListItemProps = {
  jobOffer: JobOfferType;
  onSelected: (jobOffer: JobOfferType) => void;
  height?: number;
};

function jobCategoryToIcon(jobCategory?: JobCategoryType) {
  for (const category of [
    ['Agriculture', 'leaf'],
    ['Hotel', 'bed'],
    ['Evenementiel', 'party-popper'],
    ['Casino', 'ticket'],
    ['Administration', 'briefcase'],
    ['Loisir', 'tree'],
    ['Montagne', 'image-filter-hdr'],
    ['Mer', 'waves'],
    ['Jardinerie', 'shovel'],
    ['Sécurité', 'security'],
    ['Logisitique', 'truck'],
    ['Baby', 'baby-face'],
    ['Commerce', 'store'],
    ['SPA', 'spa'],
    ['Arts', 'palette'],
    ['', 'domain'],
  ]) {
    if (jobCategory?.title.includes(category[0])) {
      return category[1];
    }
  }

  return 'domain';
}

export default function JobListItem(props: JobListItemProps) {
  const { data: job, error: jobError } = useGetJobQuery(props.jobOffer.jobId);
  const { data: company, error: companyError } = useGetCompanyQuery(
    props.jobOffer.companyId
  );
  const { data: jobCategory, error: jobCategoryError } = useGetJobCategoryQuery(
    job?.categoryId ?? '',
    {
      skip: !job,
    }
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
        style={{ height: props.height }}
        onPress={() => props.onSelected(props.jobOffer)}
        rippleColor='rgba(0, 0, 0, .1)'
      >
        <Card.Title
          title={`${job.title} ${t('jobOffers:list:cardSeparator')}`}
          subtitle={company.name}
          left={(props) => (
            <Avatar.Icon {...props} icon={jobCategoryToIcon(jobCategory)} />
          )}
        />
      </TouchableRipple>
    );
  }
}
