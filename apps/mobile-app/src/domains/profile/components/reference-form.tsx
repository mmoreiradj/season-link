import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import ReferenceType from '../types/reference';
import { Formik } from 'formik';
import uuid from 'react-native-uuid';

export type ReferenceFormProps = {
  reference: ReferenceType | null;
  visible: boolean;
  onSubmit: (reference: ReferenceType) => void;
  onCancel?: () => void;
};

export const ReferenceForm = (props: ReferenceFormProps) => {
  const initialValues: ReferenceType = {
    id: props.reference?.id ?? '',
    first_name: props.reference?.first_name ?? '',
    last_name: props.reference?.last_name ?? '',
    email: props.reference?.email ?? '',
    phone_number: props.reference?.phone_number ?? '',
    company_name: props.reference?.company_name ?? '',
  };

  return (
    <Portal>
      <Formik initialValues={initialValues} onSubmit={console.log}>
        {(formikProps) => (
          <Dialog visible={props.visible} onDismiss={props.onCancel}>
            <Dialog.Title>Reference Form</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label='First Name'
                value={formikProps.values.first_name}
                onChangeText={formikProps.handleChange('first_name')}
                mode='outlined'
              />

              <TextInput
                label='Last Name'
                value={formikProps.values.last_name}
                onChangeText={formikProps.handleChange('last_name')}
                mode='outlined'
              />

              <TextInput
                label='Email'
                value={formikProps.values.email}
                onChangeText={formikProps.handleChange('email')}
                mode='outlined'
              />

              <TextInput
                label='Phone Number'
                value={formikProps.values.phone_number}
                onChangeText={formikProps.handleChange('phone_number')}
                mode='outlined'
                keyboardType='phone-pad'
              />

              <TextInput
                label='Company'
                value={formikProps.values.company_name}
                onChangeText={formikProps.handleChange('company_name')}
                mode='outlined'
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={props.onCancel}>Cancel</Button>
              <Button
                onPress={() => {
                  const submittedReference: ReferenceType = {
                    ...formikProps.values,
                    id:
                      formikProps.values.id.length > 0
                        ? formikProps.values.id
                        : (uuid.v4() as string),
                  };
                  props.onSubmit(submittedReference);
                }}
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
