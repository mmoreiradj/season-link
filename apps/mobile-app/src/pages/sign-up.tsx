import { BigAppHeader } from 'common/components/big-app-header';
import { BasicInfoForm } from 'domains/profile/components/basic-info-form';
import {
  SignUpFormFields,
  SignupForm,
} from 'domains/profile/components/signup-form';
import { useCreateCandidateMutation } from 'domains/profile/store/profile.api';
import CreateCandidateType from 'domains/profile/types/create-candidate';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Text, TextInput, Checkbox, Button } from 'react-native-paper';
import { Link, useNavigate } from 'react-router-native';

const SignUpPage = () => {
  // Allows us to know when we go to the next form
  const [signupFields, setSignupFields] = useState<SignUpFormFields>();

  const [createCandidate, { isLoading }] = useCreateCandidateMutation();
  const navigate = useNavigate();

  return (
    <View
      style={{
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        padding: 20,
      }}
    >
      <BigAppHeader />
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100%',
          alignItems: 'stretch',
          gap: 20,
        }}
      >
        <Text
          variant='displaySmall'
          style={{
            textAlign: 'center',
          }}
        >
          Signup
        </Text>
        {!signupFields && (
          <SignupForm
            onSubmit={(values) => {
              setSignupFields(values);
            }}
          />
        )}
        {signupFields && (
          <ScrollView>
            <BasicInfoForm
              onSubmit={(formData) => {
                const createCandidateData: CreateCandidateType = {
                  ...formData,
                  email: signupFields.email,
                  password: signupFields.password,
                };

                createCandidate(createCandidateData).then((result) => {
                  navigate('/login');
                });
              }}
            />
          </ScrollView>
        )}

        <Link to='/login'>
          <Text
            variant='bodyLarge'
            style={{
              textAlign: 'center',
              fontStyle: 'italic',
            }}
          >
            Already have an account? Sign in
          </Text>
        </Link>
      </View>
    </View>
  );
};

export default SignUpPage;
