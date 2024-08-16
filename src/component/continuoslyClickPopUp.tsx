import React, {useState} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import {color} from '../assets/color';

interface ContinuousClickPopupProps {
  TextData: string;
  keyData: string;
}

const ContinuousClickPopup = (props: ContinuousClickPopupProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true);
  };
  const handlePressOut = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onLongPress={handlePress}
        onPressOut={handlePressOut}>
        <Text style={styles.buttonText}>{props.keyData}</Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text style={styles.modalHeaderText}>{props.keyData}</Text>
            </View>
            <View>
              <Text style={styles.modalText}>{props.TextData}</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: verticalScale(300),
    borderColor: color.white,
    marginHorizontal: '1%',
    height: verticalScale(50),
    marginTop: verticalScale(5),
    borderWidth: 3,
    borderRadius: verticalScale(10),
    backgroundColor: color.spanishBlue,
  },
  buttonText: {
    color: color.white,
    fontSize: verticalScale(13),
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: color.transparent,
    marginTop: verticalScale(35),
  },
  modalContent: {
    width: scale(330),
    padding: verticalScale(20),
    backgroundColor: color.spanishBlue,
    borderRadius: verticalScale(10),
  },
  modalText: {
    fontSize: verticalScale(16),
    color: color.white,
    textAlign: 'center',
  },
  modalHeaderText: {
    color: color.white,
    fontSize: verticalScale(18),
    fontWeight: 'bold',
  },
});

export default ContinuousClickPopup;
