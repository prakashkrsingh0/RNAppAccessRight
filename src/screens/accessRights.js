// AccessRights.js
import React, {useState, useEffect} from 'react';
import {
  View,
  Button,
  Text,
  StyleSheet,
  Platform,
  Alert,
  FlatList,
  DevSettings,
} from 'react-native';
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

import {dataPermission} from '../common/commonData';
import ContinuousClickPopup from '../component/continuoslyClickPopUp';

const AccessRights = ({navigation}) => {
  const [cameraPermission, setCameraPermission] = useState(null);
  const [storagePermission, setStoragePermission] = useState(null);
  const [permissionsArray, setPermissionsArray] = useState();

  const checkPermissions = async () => {
    const cameraResult = await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
    );
    const storageResult = await check(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      }),
    );
    setCameraPermission(cameraResult);
    setStoragePermission(storageResult);
  };

  useEffect(() => {
    checkPermissions();

    DevSettings.addMenuItem('Show Secret Dev Screen', () => {
      Alert.alert('Showing secret dev screen!');
    });

    console.log('PERMISSIONS.ANDROID 12:34 ', PERMISSIONS.ANDROID);
    let permissionsArray = Object.keys(dataPermission).map(key => {
      return {
        key: key.replace(/_/g, ' '),
        value: dataPermission[key],
      };
    });
    setPermissionsArray(permissionsArray);
  }, []);

  const requestCameraPermission = async () => {
    const result = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      }),
    );
    if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
      Alert.alert(
        'Permission Needed',
        'To use this feature, please enable storage access in the app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: openAppSettings},
        ],
        {cancelable: false},
      );
    } else {
      setCameraPermission(result);
    }
  };

  const requestStoragePermission = async () => {
    const result = await request(
      Platform.select({
        android: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
      }),
    );
    if (result === RESULTS.BLOCKED || result === RESULTS.DENIED) {
      Alert.alert(
        'Permission Needed',
        'To use this feature, please enable storage access in the app settings.',
        [
          {text: 'Cancel', style: 'cancel'},
          {text: 'Open Settings', onPress: openAppSettings},
        ],
        {cancelable: false},
      );
    } else {
      setStoragePermission(result);
    }
  };

  const openAppSettings = () => {
    openSettings().catch(() => console.warn('cannot open settings'));
  };

  useEffect(() => {
    const subscription = navigation.addListener('focus', () => {
      // Screen was focused, re-check permissions
      checkPermissions();
    });
    return subscription;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text>Camera Permission: {cameraPermission}</Text>
      <Text>Storage Permission: {storagePermission}</Text>

      <View
        style={{
          marginVertical: 10,
        }}>
        <Button
          title="Request Camera Permission"
          onPress={requestCameraPermission}
        />
      </View>

      <View
        style={{
          marginVertical: 10,
        }}>
        <Button
          title="Request Read External Storage Permission"
          onPress={requestStoragePermission}
        />
      </View>

      <View
        style={{
          marginVertical: 10,
        }}>
        <Button
          title="Request Storage Permission"
          onPress={requestStoragePermission}
        />
      </View>

      <View
        style={{
          marginVertical: 10,
        }}>
        <Button title="Open App Settings" onPress={openAppSettings} />
      </View>

      {/* <View>
        
      </View> */}
      <FlatList
        data={permissionsArray}
        keyExtractor={(data, index) => index}
        getItemLayout={(data, index) => ({
          length: 50,
          offset: 50 * index,
          index,
        })}
        renderItem={({item, index}) => {
          return (
            <View>
              <ContinuousClickPopup
                keyData={item.key}
                TextData={item.value.trim()}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccessRights;
