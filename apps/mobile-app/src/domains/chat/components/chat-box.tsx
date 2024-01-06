import { Application } from 'domains/job-offers/types/applications.type';
import { StyleSheet, View } from 'react-native';

type Props = {
  application: Application;
};

export default function ChatBox({ application }: Props) {
  return <View style={style.container}></View>;
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
    flexDirection: 'column',
    // TODO: REMOVE
    backgroundColor: 'red',
  },
});
