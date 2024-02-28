import { useGetApplicationsQuery } from 'domains/job-offers/store/applications.api';
import { useTranslation } from 'react-i18next';
import { FlatList, View } from 'react-native';
import { Appbar, Divider, Text } from 'react-native-paper';
import { ApplicationItem } from '../components/application-item';
import { useCallback, useEffect, useMemo } from 'react';
import {
  Application,
  ApplicationState,
} from 'domains/job-offers/types/applications.type';
import React from 'react';
import { useNavigate } from 'react-router-native';
import { use } from 'i18next';
import { EmptyState } from 'common/components/empty-state';
import { LoadingState } from 'common/components/loading-state';

const ChatPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    data: applications,
    isLoading: isApplicationsLoading,
    error,
  } = useGetApplicationsQuery();

  useEffect(() => {
    console.log({ applications, isApplicationsLoading, error });
  }, [applications, isApplicationsLoading, error]);

  const renderItem = useCallback(({ item }: { item: Application }) => {
    return (
      <ApplicationItem
        application={item}
        onSelected={() => {
          navigate(`/chat/${item.id}`);
        }}
      />
    );
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title='Applications' />
      </Appbar.Header>
      <Divider />

      {/* Empty state */}
      {!isApplicationsLoading && applications?.length == 0 && (
        <EmptyState title='Try to apply some more !' />
      )}

      {/* Loading state */}
      {isApplicationsLoading && (
        <LoadingState title={'Make your best impression out there !'} />
      )}

      {/* Full state */}
      {applications && (
        <FlatList
          data={applications}
          keyExtractor={(app) => app.id}
          renderItem={renderItem}
        />
      )}
    </>
  );
};

export default ChatPage;
