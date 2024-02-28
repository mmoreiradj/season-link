import { Formik } from 'formik';
import { StyleProp, TextStyle, View } from 'react-native';
import { Text, TextInput, Checkbox, Button } from 'react-native-paper';
import * as Yup from 'yup';

export type SignUpFormFields = typeof initialValues;
export type SignUpFormProps = {
  onSubmit: (values: SignUpFormFields) => void;
};

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Required'),
  over18: Yup.boolean().oneOf([true], 'You must be over 18 years old'),
  terms: Yup.boolean().oneOf(
    [true],
    'You must accept the terms and conditions'
  ),
});

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  over18: false,
  terms: false,
};

export const SignupForm = (props: SignUpFormProps) => {
  return (
    <View>
      <Formik
        initialValues={initialValues}
        onSubmit={props.onSubmit}
        validationSchema={SignUpSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
          isValid,
          dirty,
        }) => (
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 10,
            }}
          >
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              mode='outlined'
              label={'Email'}
            />
            {errors.email && touched.email && (
              <Text style={errorFontStyle}>{errors.email}</Text>
            )}

            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              mode='outlined'
              label={'Password'}
              secureTextEntry
            />
            {errors.password && touched.password && (
              <Text style={errorFontStyle}>{errors.password}</Text>
            )}

            <TextInput
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              mode='outlined'
              label={'Confirm Password'}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <Text style={errorFontStyle}>{errors.confirmPassword}</Text>
            )}

            <Checkbox.Item
              label='I am over 18 years old'
              status={values.over18 ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('over18', !values.over18)}
            />

            <Checkbox.Item
              label='I accept the terms and conditions'
              status={values.terms ? 'checked' : 'unchecked'}
              onPress={() => setFieldValue('terms', !values.terms)}
            />

            <Button
              mode='contained'
              onPress={() => {
                handleSubmit();
              }}
              disabled={!(isValid && dirty)}
            >
              Submit
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const errorFontStyle: StyleProp<TextStyle> = {
  fontStyle: 'italic',
  color: 'red',
};
