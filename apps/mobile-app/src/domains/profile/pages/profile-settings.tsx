import { useGetJobCategoriesQuery } from 'domains/job-categories/store/job-category.api';
import JobCategoryType from 'domains/job-categories/types/job-category.type';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Button, List, Switch, Text, TextInput } from 'react-native-paper';
import { DatePickerInput, DatePickerModal, it } from 'react-native-paper-dates';

const SettingsPage = () => {
  const { data, error, isLoading } = useGetJobCategoriesQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return BasicInfoForm(data);
};

const ExperienceForm = () => {};

const BasicInfoForm = (data: JobCategoryType[] | undefined) => {
  <Formik
    initialValues={{
      firstName: '',
      lastName: '',
      birthDate: new Date(Date.now()),
      nationality: '',
      description: '',
      email: '',
      phoneNumber: '',
      address: '',
      gender: 0,
      isAvailable: false,
      availableFrom: new Date(Date.now()),
      availableTo: new Date(Date.now()),
      place: '',
      jobId: '',
    }}
    onSubmit={(values) => console.log(values)}
  >
    {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => (
      <List.AccordionGroup>
        {/* Basic info part */}
        <List.Accordion title='Accordion 1' id='1'>
          <View>
            <TextInput
              label={'First Name'}
              onChangeText={handleChange('firstName')}
              onBlur={handleBlur('firstName')}
              value={values.firstName}
            />

            <TextInput
              label={'Last Name'}
              onChangeText={handleChange('lastName')}
              onBlur={handleBlur('lastName')}
              value={values.lastName}
            />

            <View style={{ height: 70 }}>
              <DatePickerInput
                locale='en'
                label='Birthdate'
                value={values.birthDate}
                onChange={(d) => setFieldValue('birthDate', d)}
                inputMode='start'
                style={{ width: 400 }}
                mode='flat'
              />
            </View>

            <TextInput
              label={'Nationality'}
              onChangeText={handleChange('nationality')}
              onBlur={handleBlur('nationality')}
              value={values.nationality}
            />

            <TextInput
              label={'Some words about you'}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              value={values.nationality}
            />
          </View>
        </List.Accordion>
        <List.Accordion title='Accordion 2' id='2'>
          <View>
            <View>
              <Text>Are you available ?</Text>
              <Switch
                value={values.isAvailable}
                onValueChange={(e) => {
                  setFieldValue('isAvailable', e);
                }}
              />
            </View>

            <View style={{ height: 70 }}>
              <DatePickerInput
                locale='en'
                label='From'
                value={values.availableFrom}
                onChange={(d) => setFieldValue('availableFrom', d)}
                inputMode='start'
                style={{ width: 400 }}
              />
            </View>

            <View style={{ height: 70 }}>
              <DatePickerInput
                locale='en'
                label='To'
                value={values.availableTo}
                onChange={(d) => setFieldValue('availableTo', d)}
                inputMode='start'
                style={{ width: 400 }}
              />
            </View>

            <TextInput
              label={'Place'}
              onChangeText={handleChange('place')}
              onBlur={handleBlur('place')}
              value={values.place}
            />

            {data ? (
              <View>
                <Dropdown
                  data={data.map((jobCategory) => ({
                    label: jobCategory.title,
                    value: jobCategory.id,
                  }))}
                  labelField={'label'}
                  valueField={'value'}
                  onChange={(item) => {
                    setFieldValue('jobId', item.value);
                  }}
                  value={values.jobId}
                />
              </View>
            ) : (
              ''
            )}
          </View>
        </List.Accordion>
        <View>
          <List.Accordion title='Accordion 3' id='3'>
            <List.Item title='Item 3' />
          </List.Accordion>
        </View>
      </List.AccordionGroup>
    )}
  </Formik>;
};

export default SettingsPage;
