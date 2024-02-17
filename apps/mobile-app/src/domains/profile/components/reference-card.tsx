import { Button, Card, Text } from 'react-native-paper';
import ExperienceType from '../types/experience';
import { useEffect, useState } from 'react';
import { useGetJobQuery } from 'domains/job-offers/store/jobs.api';
import ReferenceType from '../types/reference';

type ExperienceCardProps = {
  reference: ReferenceType;
  actionEnabled: boolean;
  onDelete: (uuid: string) => void;
};

export const ReferenceCard = (props: ExperienceCardProps) => {
  const [isExtended, setExtended] = useState(false);

  /*
  const { data, error } = useGetJobQuery(props.reference.job_id);

  useEffect(() => {
    console.log({ data, error });
  }, [data, error]);
  */

  return (
    <Card
      onPress={() => setExtended((previousValue) => !previousValue)}
      style={{ marginBottom: 10 }}
    >
      <Card.Content>
        <Text variant='titleLarge'>
          {props.reference.first_name} {props.reference.last_name}
        </Text>
        <Text variant='titleMedium'>{props.reference.company_name}</Text>
        <Text style={{ fontStyle: 'italic' }}>
          {props.reference.phone_number}
        </Text>
        <Text>{props.reference.email}</Text>
      </Card.Content>
      <Card.Actions>
        {isExtended && props.actionEnabled ? (
          <Button onPress={() => props.onDelete(props.reference.id)}>
            Delete
          </Button>
        ) : (
          ''
        )}
      </Card.Actions>
    </Card>
  );
};
