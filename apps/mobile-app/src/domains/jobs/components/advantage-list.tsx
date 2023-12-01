import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Advantage from '../types/advantage.type';
import { useTranslation } from 'react-i18next';
import AdvantageType from '../types/avantage-type.enum';

type Props = {
  advantages: Advantage[];
};

export default function AdvantageList({ advantages }: Props) {
  const { t } = useTranslation();

  return (
    <View style={style.advantagesContainer}>
      <Text>{t('jobOffers:detail:advantages')}:&nbsp;</Text>
      <View style={style.iconsContainer}>
        {advantages.map((advantage, index) => {
          switch (advantage.type) {
            case AdvantageType.HEALTH:
              return <Avatar.Icon key={index} size={32} icon='home' />;
            case AdvantageType.FOOD:
              return <Avatar.Icon key={index} size={32} icon='food' />;
            case AdvantageType.HOUSING:
              return <Avatar.Icon key={index} size={32} icon='home' />;
            case AdvantageType.TRANSPORT:
              return <Avatar.Icon key={index} size={32} icon='bus' />;
            default:
              return null;
          }
        })}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  advantagesContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  additionalInfoContainer: {
    flexDirection: 'column',
    width: '60%',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
