import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Appbar,
  Subheading,
  List,
  Divider,
  Button,
  Text
} from 'react-native-paper';
import useStore from '../../hooks/useStore';
import DialogEditToken from '../../components/Dialog/EditToken';
import DialogEditApiInstance from '../../components/Dialog/EditApiInstance';
import DialogEditUsername from '../../components/Dialog/EditUsername';
import useBackup from '../../hooks/useBackup';

interface Props {
  navigation: any;
}

const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const store = useStore();
  const [showDialogToken, setShowDialogToken] = useState(false);
  const [showDialogApiInstance, setShowDialogApiInstance] = useState(false);
  const [showDialogUsername, setShowDialogUsername] = useState(false);
  const { backupData, importData } = useBackup();

  const toggleDialogToken = () => setShowDialogToken(!showDialogToken);
  const toggleDialogApiInstance = () =>
    setShowDialogApiInstance(!showDialogApiInstance);
  const toggleDialogUsername = () => setShowDialogUsername(!showDialogUsername);

  return (
    <View style={styles.container}>
      <Appbar accessibilityStates={[]}>
        <Appbar.BackAction
          accessibilityStates={[]}
          icon="archive"
          onPress={(): void => navigation.goBack()}
        />
        <Appbar.Content title="Settings" accessibilityStates={[]} />
      </Appbar>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>API</Subheading>
        <List.Item
          accessibilityStates={[]}
          title="Invidious instance"
          description={store.instance}
          onPress={toggleDialogApiInstance}
        />
        <Divider accessibilityStates={[]} />
        <List.Item
          accessibilityStates={[]}
          title="Token"
          description={store.token}
          onPress={toggleDialogToken}
        />
        <Divider accessibilityStates={[]} />
      </View>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>APPLICATION</Subheading>
        <List.Item
          accessibilityStates={[]}
          title="Username"
          description={store.username}
          onPress={toggleDialogUsername}
        />
        <Divider accessibilityStates={[]} />
      </View>
      <View style={styles.content}>
        <Subheading style={styles.subheading}>DATA</Subheading>
        <View style={{ height: 15 }} />
        <View
          style={{
            paddingHorizontal: 15
          }}>
          <Text>Import or export your playlists and favoris</Text>
        </View>
        <View style={{ height: 15 }} />
        <View
          style={{
            paddingHorizontal: 9,
            flexDirection: 'row',
            width: '100%'
          }}>
          <Button
            style={{ flex: 1, marginHorizontal: 7 }}
            mode="contained"
            onPress={backupData}>
            Export
          </Button>
          <Button
            style={{ flex: 1, marginHorizontal: 7 }}
            mode="contained"
            onPress={importData}>
            Import
          </Button>
        </View>
      </View>
      <DialogEditToken
        label="Edit token"
        value={store.token as string}
        visible={showDialogToken}
        onDismiss={toggleDialogToken}
        toggleDialog={toggleDialogToken}
      />
      <DialogEditApiInstance
        value={store.instance as string}
        visible={showDialogApiInstance}
        onDismiss={toggleDialogApiInstance}
        toggleDialog={toggleDialogApiInstance}
      />
      <DialogEditUsername
        value={store.username as string}
        visible={showDialogUsername}
        onDismiss={toggleDialogUsername}
        toggleDialog={toggleDialogUsername}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6f9',
    flex: 1
  },
  content: {
    flexDirection: 'column',
    backgroundColor: '#f5f6f9'
  },
  switchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 16,
    paddingTop: 10
  },
  subheading: {
    fontWeight: 'bold',
    padding: 16,
    paddingBottom: 0
  }
});

export default SettingsScreen;
