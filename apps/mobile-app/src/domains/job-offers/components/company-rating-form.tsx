import { Formik } from 'formik';
import CompanyType from '../types/company.type';
import { CreateRatingDto } from '../types/create-company-rating';
import {
  Button,
  Dialog,
  Modal,
  Portal,
  Text,
  TextInput,
} from 'react-native-paper';
import { Rating } from 'react-native-ratings';
import { View } from 'react-native';
import { useGetCompanyQuery } from '../store/companies.api';

export type CompanyRatingFormProps = {
  companyId?: string;
  onSubmit: (rating: CreateRatingDto) => void;
  onCancel: () => void;
};

export const CompanyRatingForm = (props: CompanyRatingFormProps) => {
  const { data: company, error: companyError } = useGetCompanyQuery(
    props?.companyId ?? '',
    { skip: !props.companyId }
  );

  return (
    <Portal>
      <Dialog
        visible={!!company && !!props?.companyId}
        onDismiss={props.onCancel}
      >
        <Dialog.Title>Rate {company?.name}</Dialog.Title>
        <Formik
          initialValues={{ rating: 0, comment: '' }}
          onSubmit={props.onSubmit}
        >
          {({ values, handleChange, handleSubmit, setFieldValue }) => (
            <>
              <Dialog.Content>
                <Rating
                  type='star'
                  ratingCount={5}
                  imageSize={40}
                  onFinishRating={(rating: number) =>
                    setFieldValue('rating', rating)
                  }
                />

                <TextInput
                  label='Comment'
                  value={values.comment}
                  onChangeText={handleChange('comment')}
                  multiline
                  numberOfLines={4}
                  style={{ marginBottom: 20 }}
                  mode='outlined'
                />
              </Dialog.Content>
              <Dialog.Actions>
                <Button mode='outlined' onPress={() => handleSubmit()}>
                  Submit
                </Button>
              </Dialog.Actions>
            </>
          )}
        </Formik>
      </Dialog>
    </Portal>
  );
};
