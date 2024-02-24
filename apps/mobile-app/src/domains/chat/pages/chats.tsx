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
    <View>
      <Appbar.Header>
        <Appbar.Content title='Applications' />
      </Appbar.Header>
      <Divider />

      <View>
        <FlatList
          data={applications}
          keyExtractor={(app) => app.id}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

export default ChatPage;
