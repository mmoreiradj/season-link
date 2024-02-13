import { Formik } from 'formik';
import ExperienceType from '../types/experience';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useGetJobCategoriesQuery } from 'domains/job-categories/store/job-category.api';
import { useGetJobQuery } from 'domains/job-offers/store/jobs.api';

export type ExperienceFormProps = {
  experience: ExperienceType | null;
  onSubmit: (experience: ExperienceType) => void;
};

export const ExperienceForm = (props: ExperienceFormProps) => {
  const test = useGetJobQuery();

  const initialExperience = props.experience ?? {
    id: '',
    candidate_id: '',
    company_name: '',
    job_id: '',
    start_time: '',
    end_time: '',
    description: '',
  };

  return (
    <Formik
      initialValues={initialExperience}
      onSubmit={(values) => console.log(values)}
    >
      {(formikProps) => (
        <View>
          //TODO fetch companies to select from // TODO fetch job ids to select
          from
          <TextInput
            label='Description'
            value={formikProps.values.description}
            onChangeText={formikProps.handleChange('description')}
            mode='outlined'
          />
        </View>
      )}
    </Formik>
  );
};
