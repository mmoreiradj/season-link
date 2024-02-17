import { Button, Card, Text } from 'react-native-paper';
import ExperienceType from '../types/experience';
import { useEffect, useState } from 'react';
import { useGetJobQuery } from 'domains/job-offers/store/jobs.api';

type ExperienceCardProps = {
  experience: ExperienceType;
  actionEnabled: boolean;
  onDelete: (uuid: string) => void;
};

export const ExperienceCard = (props: ExperienceCardProps) => {
  const [isExtended, setExtended] = useState(false);

  const { data, error } = useGetJobQuery(props.experience.job_id);

  useEffect(() => {
    console.log({ data, error });
  }, [data, error]);

  return (
    <Card
      onPress={() => setExtended((previousValue) => !previousValue)}
      style={{ marginBottom: 10 }}
    >
      <Card.Content>
        <Text variant='titleLarge'>
          {data?.title ?? props.experience.job_id}
        </Text>
        <Text variant='titleMedium'>{props.experience.company_name}</Text>
        <Text style={{ fontStyle: 'italic' }}>
          {props.experience.start_time} - {props.experience.end_time}
        </Text>
        <Text>{props.experience.description}</Text>
      </Card.Content>
      <Card.Actions>
        {isExtended && props.actionEnabled ? (
          <Button onPress={() => props.onDelete(props.experience.id)}>
            Delete
          </Button>
        ) : (
          ''
        )}
      </Card.Actions>
    </Card>
  );
};
