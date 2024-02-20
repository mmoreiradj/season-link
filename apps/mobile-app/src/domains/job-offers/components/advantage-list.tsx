import { View, StyleSheet } from 'react-native';
import { Avatar, Text } from 'react-native-paper';
import Advantage from '../types/advantage.type';
import { useTranslation } from 'react-i18next';
import AdvantageType from '../types/avantage-type.enum';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

type AdvantageListProps = {
  advantages: Advantage[];
};

function toIconName(advantageType: string) {
  switch (advantageType) {
    case AdvantageType.HEALTH:
      return 'home';
    case AdvantageType.FOOD:
      return 'food';
    case AdvantageType.HOUSING:
      return 'home';
    case AdvantageType.TRANSPORT:
      return 'bus';
    default:
      return '';
  }
}

export default function AdvantageList({ advantages }: AdvantageListProps) {
  const { t } = useTranslation();

  return (
    <View style={style.advantagesContainer}>
      <Text variant='bodyMedium'>
        {t('jobOffers:detail:advantages')}:&nbsp;
      </Text>
      <View style={style.iconsContainer}>
        {advantages.map((advantage, index) => (
          <Avatar.Icon
            size={32}
            key={index}
            icon={toIconName(advantage.type)}
          />
        ))}
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  advantagesContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6750a4',
    borderRadius: 9999,
    paddingHorizontal: 2,
  },
});
