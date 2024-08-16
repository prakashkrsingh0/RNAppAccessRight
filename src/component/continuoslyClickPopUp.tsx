import React, {useState, useEffect} from 'react';
import {View, Text, Modal, TouchableOpacity, StyleSheet} from 'react-native';

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
            <Text style={styles.modalText}>{props.TextData}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '96%',
    borderColor: '#000',
    marginHorizontal: '1%',
    height: 50,
    marginTop: '2%',
    borderWidth: 1,
  },
  buttonText: {
    color: '#CA8C2B',
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
  },
});

export default ContinuousClickPopup;
