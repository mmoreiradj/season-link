import { Button, Card, Paragraph, Text } from 'react-native-paper';
import JobOfferType from '../types/job-offer.type';
import { useGetJobQuery } from '../store/jobs.api';
import {
  useGetCompanyQuery,
  useGetIsCompanyRatedQuery,
} from '../store/companies.api';
import { useGetJobCategoryQuery } from 'domains/job-categories/store/job-category.api';
import { useEffect } from 'react';

export type ExecutedJobProps = {
  executedJobOffer: JobOfferType;
  onRate?: (jobOffer: JobOfferType) => void;
};

export const ExecutedJob = (props: ExecutedJobProps) => {
  //TODO a union type will all this info would not kill
  const { data: job, error: jobError } = useGetJobQuery(
    props.executedJobOffer.jobId
  );
  const { data: company, error: companyError } = useGetCompanyQuery(
    props.executedJobOffer.companyId
  );
  const { data: jobCategory, error: jobCategoryError } = useGetJobCategoryQuery(
    job?.categoryId ?? '',
    {
      skip: !job,
    }
  );

  const { data: hasRated, error: canRateError } = useGetIsCompanyRatedQuery(
    company?.id ?? '',
    {
      skip: !company,
    }
  );

  useEffect(() => {
    console.log({
      canRate: hasRated,
      canRateError,
    });
  }, [hasRated, canRateError]);

  return job && company && jobCategory ? (
    <Card>
      <Card.Title
        title={`${job.title} at ${company.name}`}
        style={{ marginBottom: -10 }}
      />
      <Card.Content>
        <Text variant='titleMedium'>{jobCategory.title}</Text>
        <Text style={{ fontStyle: 'italic' }}>
          {props.executedJobOffer.fromDate} - {props.executedJobOffer.toDate}
        </Text>
        <Paragraph>{props.executedJobOffer.address}</Paragraph>
      </Card.Content>
      {/* The undefined check is for the network query to finish */}
      {!hasRated && hasRated !== undefined && (
        <Card.Actions>
          <Button
            mode='outlined'
            onPress={() => {
              props?.onRate?.(props.executedJobOffer);
            }}
          >
            Rate company
          </Button>
        </Card.Actions>
      )}
    </Card>
  ) : (
    ''
  );
};
