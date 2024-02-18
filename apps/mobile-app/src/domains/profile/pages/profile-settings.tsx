import { useGetJobCategoriesQuery } from 'domains/job-categories/store/job-category.api';
import JobCategoryType from 'domains/job-categories/types/job-category.type';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {
  Appbar,
  Button,
  Divider,
  List,
  Switch,
  Text,
  TextInput,
} from 'react-native-paper';
import {
  DatePickerInput,
  DatePickerModal,
  it,
  tr,
} from 'react-native-paper-dates';
import { ExperienceCard } from '../components/experience-card';
import {
  useCreateExperienceMutation,
  useCreateReferenceMutation,
  useDeleteExperienceMutation,
  useDeleteReferenceMutation,
  useGetCandidateQuery,
  useGetExperiencesQuery,
  useGetReferencesQuery,
  useHasCVQuery,
  useUploadCVMutation,
} from '../store/profile.api';
import { ReferenceCard } from '../components/reference-card';
import { ExperienceForm } from '../components/experience-form';
import { ReferenceForm } from '../components/reference-form';
import { BasicInfoForm } from '../components/basic-info-form';
import * as DocumentPicker from 'expo-document-picker';
import { use } from 'i18next';

const SettingsPage = () => {
  const [isExperienceFormVisible, setExperienceFormVisible] = useState(false);
  const { data: experienceData, error: experienceError } =
    useGetExperiencesQuery();
  const [deleteExperience, result] = useDeleteExperienceMutation();
  const [createExperience, createResult] = useCreateExperienceMutation();

  const [isReferenceFormVisible, setReferenceFormVisible] = useState(false);
  const { data: referenceData, error: referenceError } =
    useGetReferencesQuery();
  const [deleteReference, deleteReferenceResult] = useDeleteReferenceMutation();
  const [createReference, createReferenceResult] = useCreateReferenceMutation();

  const { data: hasCVData, error: hasCVError } = useHasCVQuery();
  const [uploadCV, uploadCVResult] = useUploadCVMutation();

  useEffect(() => {
    console.log(uploadCVResult);
  }, [uploadCVResult]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Settings' />
      </Appbar.Header>
      <Divider />

      <ScrollView>
        <BasicInfoForm onSubmit={console.log} />

        <Divider />

        {/* List of experiences, with the possibility to add/delete experience */}

        <Text variant='titleLarge' style={{ margin: 10 }}>
          Experiences
        </Text>

        <View style={{ margin: 20, marginTop: 0 }}>
          <Button
            onPress={() => setExperienceFormVisible(true)}
            mode='contained'
            style={{ marginBottom: 10 }}
          >
            Add new experience
          </Button>

          {experienceData?.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              actionEnabled={true}
              onDelete={(uuid) => {
                deleteExperience(uuid);
              }}
            />
          ))}
        </View>

        <Divider />

        {/* List of references, with the possibility to add/delete reference */}

        <Text variant='titleLarge' style={{ margin: 10 }}>
          References
        </Text>

        <View style={{ margin: 20, marginTop: 0 }}>
          <Button
            onPress={() => setReferenceFormVisible(true)}
            mode='contained'
            style={{ marginBottom: 10 }}
          >
            Add new reference
          </Button>

          {referenceData?.map((reference) => (
            <ReferenceCard
              key={reference.id}
              reference={reference}
              actionEnabled={true}
              onDelete={(uuid) => {
                deleteReference(uuid);
              }}
            />
          ))}
        </View>

        <Divider />

        {/* CV upload */}
        <Text variant='titleLarge' style={{ margin: 10 }}>
          CV
        </Text>

        <View style={{ margin: 20, marginTop: 0 }}>
          <Button
            onPress={() => {
              DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
              }).then((result) => {
                if (result.canceled === false) {
                  console.log(result.assets[0]);
                  const formData = new FormData();
                  formData.append('file', {
                    name: result.assets[0].name,
                    type: 'application/pdf',
                    uri: result.assets[0].uri,
                  } as any); // FIXME bad type

                  uploadCV(formData);
                }
              });
            }}
            mode='contained'
            style={{ marginBottom: 10 }}
          >
            Upload new CV
          </Button>
        </View>

        {/* Forms are at the bottom, display handled via states */}
        <ExperienceForm
          experience={null}
          visible={isExperienceFormVisible}
          onSubmit={(newExperience) => {
            createExperience(newExperience);
            setExperienceFormVisible(false);
          }}
          onCancel={() => {
            setExperienceFormVisible(false);
          }}
        />

        <ReferenceForm
          reference={null}
          visible={isReferenceFormVisible}
          onSubmit={(newReference) => {
            createReference(newReference);
            setReferenceFormVisible(false);
          }}
          onCancel={() => {
            setReferenceFormVisible(false);
          }}
        />
      </ScrollView>
    </>
  );
};

export default SettingsPage;
