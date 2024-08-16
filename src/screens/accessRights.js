import React, {useState, useEffect, version} from 'react';
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
import {color} from '../assets/color';
import {verticalScale} from 'react-native-size-matters';

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
      checkPermissions();
    });
    return subscription;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.alignPermissionData}>
        <Text style={styles.permissionText}>Camera Permission</Text>
        <Text style={styles.permissionResponse}>{cameraPermission}</Text>
      </View>

      <View style={styles.alignPermissionData}>
        <Text style={styles.permissionText}>Storage Permission</Text>
        <Text style={styles.permissionResponse}>{storagePermission}</Text>
      </View>

      <View style={styles.marginTopStyle}>
        <Button
          title="Request Camera Permission"
          onPress={requestCameraPermission}
        />
      </View>

      <View style={styles.marginTopStyle}>
        <Button
          title="Request Read External Storage Permission"
          onPress={requestStoragePermission}
        />
      </View>

      <View style={styles.marginTopStyle}>
        <Button
          title="Request Storage Permission"
          onPress={requestStoragePermission}
        />
      </View>

      <View style={styles.marginTopStyle}>
        <Button title="Open App Settings" onPress={openAppSettings} />
      </View>

      <View style={styles.listOfAccessListContainer}>
        <Text style={styles.listOfAccessListText}>List Of Access Rights</Text>
      </View>
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
    paddingHorizontal: 10,
  },
  listOfAccessListText: {
    fontSize: 16,
    color: color.spanishBlue,
    fontWeight: 'bold',
  },
  listOfAccessListContainer: {
    marginVertical: 10,
    backgroundColor: color.white,
    paddingLeft: 5,
    borderRadius: 5,
  },
  marginTopStyle: {
    marginVertical: 10,
  },
  permissionText: {fontSize: verticalScale(14), color: color.spanishBlue},
  permissionResponse: {
    fontSize: verticalScale(14),
    color: '#000',
    textTransform: 'capitalize',
  },
  alignPermissionData: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AccessRights;
