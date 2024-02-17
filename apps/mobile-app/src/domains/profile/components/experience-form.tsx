import { Formik } from 'formik';
import ExperienceType from '../types/experience';
import {
  Button,
  Dialog,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import { StyleProp, View, ViewStyle } from 'react-native';
import {
  useGetJobCategoriesQuery,
  useGetJobsFromCategoryQuery,
} from 'domains/job-categories/store/job-category.api';
import { DatePickerInput } from 'react-native-paper-dates';
import { useEffect, useState } from 'react';
import { PaperSelect } from 'react-native-paper-select';
import { ListItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import uuid from 'react-native-uuid';
import { toSimpleISOString } from 'common/utils/date';

export type ExperienceFormProps = {
  experience: ExperienceType | null;
  visible: boolean;
  onSubmit: (experience: ExperienceType) => void;
  onCancel?: () => void;
};

// Private intermidairy type
type FormExperience = {
  id?: string;
  company_name: string;
  job_id: string;
  start_time: Date;
  end_time: Date;
  description: string;
};

// Convert FormExperience to ExperienceType
function toExperienceType(formExperience: FormExperience): ExperienceType {
  return {
    ...formExperience,
    id: formExperience.id ?? (uuid.v4() as string),
    start_time: toSimpleISOString(formExperience.start_time),
    end_time: toSimpleISOString(formExperience.end_time),
  };
}

export const ExperienceForm = (props: ExperienceFormProps) => {
  const [jobCategory, setJobCategory] = useState<ListItem>({
    _id: 'job category id',
    value: 'Job Category',
  });

  const { data: jobCategories, error: jobCategoriesError } =
    useGetJobCategoriesQuery();
  const { data: jobs, error: jobsError } = useGetJobsFromCategoryQuery(
    jobCategory?._id ?? ''
  );

  useEffect(() => {
    console.log({ jobs, jobsError });
  }, [jobs, jobsError]);

  const initialExperience: FormExperience = {
    id: props.experience?.id,
    company_name: props.experience?.company_name ?? '',
    job_id: props.experience?.job_id ?? '',
    start_time: new Date(props.experience?.start_time ?? Date.now()),
    end_time: new Date(props.experience?.end_time ?? Date.now()),
    description: props.experience?.description ?? '',
  };

  return (
    <Portal>
      <Formik
        initialValues={initialExperience}
        onSubmit={(values) => console.log(values)}
      >
        {(formikProps) => (
          <Dialog visible={props.visible} onDismiss={props.onCancel}>
            <Dialog.Title>Experience Form</Dialog.Title>
            <Dialog.Content>
              <View>
                {/* Company textInput */}
                <TextInput
                  label='Company'
                  value={formikProps.values.company_name}
                  onChangeText={formikProps.handleChange('company_name')}
                  mode='outlined'
                />

                {/* Job categories dropdown */}
                <PaperSelect
                  label='Job Category'
                  arrayList={
                    jobCategories?.map((jobCategory) => ({
                      value: jobCategory.title,
                      _id: jobCategory.id,
                    })) ?? []
                  }
                  value={jobCategory?.value ?? ''}
                  onSelection={(itemValue) => {
                    setJobCategory(itemValue.selectedList[0]);
                  }}
                  multiEnable={false}
                  selectedArrayList={[jobCategory]}
                  textInputMode='outlined'
                />

                {/* Job dropdown */}
                <PaperSelect
                  label='Job'
                  arrayList={
                    jobs?.map((job) => ({
                      value: job.title,
                      _id: job.id,
                    })) ?? []
                  }
                  value={
                    (
                      jobs?.find(
                        (job) => job.id === formikProps.values.job_id
                      ) ?? { title: 'Job', id: 'job id' }
                    ).title
                  }
                  onSelection={(itemValue) => {
                    formikProps.setFieldValue(
                      'job_id',
                      itemValue.selectedList[0]._id
                    );
                  }}
                  multiEnable={false}
                  selectedArrayList={[
                    {
                      _id: formikProps.values.job_id,
                      value: formikProps.values.job_id,
                    },
                  ]}
                  textInputMode='outlined'
                />

                <View style={{ height: 70 }}>
                  <DatePickerInput
                    locale='en'
                    label='From'
                    value={formikProps.values.start_time}
                    onChange={(d) => formikProps.setFieldValue('start_time', d)}
                    inputMode='start'
                    mode='outlined'
                  />
                </View>

                <View style={{ height: 70 }}>
                  <DatePickerInput
                    locale='en'
                    label='To'
                    value={formikProps.values.end_time}
                    onChange={(d) => formikProps.setFieldValue('end_time', d)}
                    inputMode='start'
                    mode='outlined'
                  />
                </View>

                <TextInput
                  label='Description'
                  value={formikProps.values.description}
                  onChangeText={formikProps.handleChange('description')}
                  mode='outlined'
                />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={props.onCancel}>Cancel</Button>
              <Button
                onPress={() =>
                  props.onSubmit(toExperienceType(formikProps.values))
                }
              >
                Submit
              </Button>
            </Dialog.Actions>
          </Dialog>
        )}
      </Formik>
    </Portal>
  );
};
