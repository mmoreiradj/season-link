import { useGetJobCategoriesQuery } from 'domains/job-categories/store/job-category.api';
import JobCategoryType from 'domains/job-categories/types/job-category.type';
import { Formik } from 'formik';
import { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Button, List, Switch, Text, TextInput } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import { PaperSelect } from 'react-native-paper-select';
import { ListItem } from 'react-native-paper-select/lib/typescript/interface/paperSelect.interface';
import CandidateType from '../types/candidate';
import { useGetCandidateQuery } from '../store/profile.api';
import uuid from 'react-native-uuid';
import { useGetJobsQuery } from 'domains/job-offers/store/jobs.api';

export type BasicInfoFormProps = {
  onSubmit: (values: CandidateType) => void;
};

const inlineFormViewStyle: StyleProp<ViewStyle> = {
  flexDirection: 'row',
  gap: 5,
  justifyContent: 'space-evenly',
};
const inlineFormItemViewStyle: StyleProp<ViewStyle> = {
  flex: 1,
};

const settingSectionViewStyle: StyleProp<ViewStyle> = {
  marginBottom: 20,
};

type BasicFormType = Omit<
  CandidateType,
  'birth_date' | 'available_from' | 'available_to'
> & {
  birth_date: Date;
  available_from: Date;
  available_to: Date;
};

function toCandidateType(formValues: BasicFormType): CandidateType {
  return {
    ...formValues,
    birth_date: formValues.birth_date.toISOString(),
    available_from: formValues.available_from.toISOString(),
    available_to: formValues.available_to.toISOString(),
  };
}

export const BasicInfoForm = (props: BasicInfoFormProps) => {
  const { data: jobData, error, isLoading } = useGetJobsQuery();

  const { data: candidate, error: profileError } = useGetCandidateQuery();

  const initialValues: BasicFormType = {
    id: candidate?.id ?? (uuid.v4() as string),
    first_name: candidate?.first_name ?? '',
    last_name: candidate?.last_name ?? '',
    birth_date: new Date(Date.parse(candidate?.birth_date ?? Date())),
    nationality_country_id: candidate?.nationality_country_id ?? '',
    description: candidate?.description ?? '',
    email: candidate?.email ?? '',
    phone_number: candidate?.phone_number ?? '',
    address: candidate?.address ?? '',
    gender: candidate?.gender ?? 0,
    is_available: candidate?.is_available ?? false,
    available_from: new Date(Date.parse(candidate?.available_from ?? Date())),
    available_to: new Date(Date.parse(candidate?.available_to ?? Date())),
    place: candidate?.place ?? '',
    job_id: candidate?.job_id ?? '',
  };

  //console.log({ initialValues, props });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={(values) => console.log(values)}
    >
      {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
        <View style={{ padding: 20 }}>
          {/* Basic info part */}
          <Text variant='titleLarge'>Profile</Text>
          <View style={settingSectionViewStyle}>
            <View style={inlineFormViewStyle}>
              <TextInput
                style={inlineFormItemViewStyle}
                label={'First Name'}
                onChangeText={handleChange('first_name')}
                onBlur={handleBlur('first_name')}
                value={values.first_name}
                mode='outlined'
              />

              <TextInput
                style={inlineFormItemViewStyle}
                label={'Last Name'}
                onChangeText={handleChange('last_name')}
                onBlur={handleBlur('last_name')}
                value={values.last_name}
                mode='outlined'
              />
            </View>
            <View style={inlineFormViewStyle}>
              <DatePickerInput
                style={inlineFormItemViewStyle}
                locale='en'
                label='birth_date'
                value={values.birth_date}
                onChange={(d) => setFieldValue('birth_date', d)}
                inputMode='start'
                mode='outlined'
              />

              <TextInput
                style={inlineFormItemViewStyle}
                label={'Nationality'}
                onChangeText={handleChange('nationality_country_id')}
                onBlur={handleBlur('nationality_country_id')}
                value={values.nationality_country_id}
                mode='outlined'
              />
            </View>

            <TextInput
              label={'Some words about you'}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.description}
              mode='outlined'
            />
          </View>

          {/* Contact info part */}
          <Text variant='titleLarge'>Contact</Text>
          <View style={settingSectionViewStyle}>
            <View style={inlineFormViewStyle}>
              <TextInput
                style={inlineFormItemViewStyle}
                label={'Email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                mode='outlined'
              />

              <TextInput
                style={inlineFormItemViewStyle}
                label={'Phone Number'}
                onChangeText={handleChange('phone_number')}
                onBlur={handleBlur('phone_number')}
                value={values.phone_number}
                mode='outlined'
                keyboardType='phone-pad'
              />
            </View>

            <TextInput
              label={'Address'}
              onChangeText={handleChange('address')}
              onBlur={handleBlur('address')}
              value={values.address}
              mode='outlined'
            />
          </View>

          {/* Work availability part */}
          <Text variant='titleLarge'>Work</Text>
          <View style={settingSectionViewStyle}>
            <View style={inlineFormViewStyle}>
              <Text
                variant='bodyLarge'
                style={{
                  flex: 3,
                  textAlignVertical: 'center',
                  textAlign: 'left',
                }}
              >
                Are you available ?
              </Text>
              <Switch
                style={inlineFormItemViewStyle}
                value={values.is_available}
                onValueChange={(e) => {
                  setFieldValue('is_available', e);
                }}
              />
            </View>

            {values.is_available && (
              <>
                <View style={{ height: 70, flexDirection: 'row', gap: 5 }}>
                  <DatePickerInput
                    locale='en'
                    label='From'
                    value={values.available_from}
                    onChange={(d) => setFieldValue('available_from', d)}
                    inputMode='start'
                    mode='outlined'
                  />

                  <DatePickerInput
                    locale='en'
                    label='To'
                    value={values.available_to}
                    onChange={(d) => setFieldValue('available_to', d)}
                    inputMode='end'
                    mode='outlined'
                  />
                </View>

                <PaperSelect
                  label='Job'
                  arrayList={
                    jobData?.map((category) => ({
                      value: category.title,
                      _id: category.id,
                    })) ?? []
                  }
                  value={
                    (
                      jobData?.find(
                        (category) => category.id === values.job_id
                      ) ?? { id: 'job id', title: 'Job' }
                    ).title
                  }
                  onSelection={(itemValue) => {
                    setFieldValue('job_id', itemValue.selectedList[0]._id);
                  }}
                  multiEnable={false}
                  selectedArrayList={[
                    {
                      _id: values.job_id,
                      value: values.job_id,
                    },
                  ]}
                  textInputMode='outlined'
                />
              </>
            )}
          </View>

          {/* Action part */}
          <View>
            <Button
              mode='contained'
              onPress={() => props.onSubmit?.(toCandidateType(values))}
            >
              Save
            </Button>
          </View>
        </View>
      )}
    </Formik>
  );
};
