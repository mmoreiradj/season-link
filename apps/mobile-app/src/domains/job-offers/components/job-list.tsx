import { useTranslation } from 'react-i18next';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import { useGetJobOffersQuery } from '../store/job-offers.api';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/store/store';
import { setJobOffers } from '../store/job-offers.slice';
import JobListItem from './job-list-item';
import App from 'src/App';
import JobOfferType from '../types/job-offer.type';
import BottomSheet from '@gorhom/bottom-sheet';
import { JobDetails } from './job-details';
import { LoadingState } from 'common/components/loading-state';
import { EmptyState } from 'common/components/empty-state';

const ITEM_HEIGHT = 70;

export default function JobList() {
  const { t } = useTranslation();
  const { data, error, isLoading } = useGetJobOffersQuery();
  const dispatch = useDispatch();
  const [selectedJobOffer, setSelectedJobOffer] = useState<JobOfferType>();

  useEffect(() => {
    if (data) {
      dispatch(setJobOffers(data));
    }
  }, [data]);

  // Data for the bottom sheet
  const snapPoints = useMemo(() => ['85%'], []);
  const sheetRef = useRef<BottomSheet>(null);

  // Cached rendering function to limit memory trashing
  const renderItem = useCallback(
    ({ item }: { item: JobOfferType }) => (
      <JobListItem
        height={ITEM_HEIGHT}
        jobOffer={item}
        onSelected={(jobOffer) => {
          setSelectedJobOffer(jobOffer);
        }}
      />
    ),
    []
  );

  // Cached layout function to limit memory trashing
  const getItemLayout = useCallback(
    (data: ArrayLike<JobOfferType> | null | undefined, index: number) => {
      return {
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      };
    },
    []
  );

  return (
    <>
      {/* Empty state */}
      {!isLoading && data?.length == 0 && (
        <EmptyState title='Come back later' />
      )}

      {/* Loading state */}
      {isLoading && (
        <LoadingState title={"We're sure you're working hard as well !"} />
      )}

      {/* Full state */}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        windowSize={5}
        getItemLayout={getItemLayout}
      />
      {selectedJobOffer && (
        <BottomSheet
          style={{ elevation: 10 }}
          ref={sheetRef}
          backgroundStyle={{ elevation: 10 }}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          onClose={() => setSelectedJobOffer(undefined)}
        >
          <Divider style={{ height: 1.5, marginHorizontal: 15 }} />
          <JobDetails jobOffer={selectedJobOffer} />
        </BottomSheet>
      )}
    </>
  );
}
