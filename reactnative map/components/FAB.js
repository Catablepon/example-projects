import * as React from 'react';
import { StyleSheet} from 'react-native';
import { FAB, Modal, Portal, Button, Text, TextInput } from 'react-native-paper';


const MyFAB = ({ onAddCity }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => {
    setVisible(false);
    setText("")
  }
  const containerStyle = { 
    backgroundColor: 'lavender', 
    width: '80%',
    padding: 20,
    borderRadius: 10
  };

  const [text, setText] = React.useState("");
  

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text style={{fontSize: 24, paddingBottom: 5}}>Add a new city</Text>
              <TextInput
                label="City"
                value={text}
                onChangeText={text => setText(text)}
                />
                <Button onPress={hideModal}>Close</Button>
                <Button onPress={() => {onAddCity(text); hideModal();}}>Add</Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => {showModal()}}
      />
    </>
  )
}



const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: '85%',
  },
})

export default MyFAB;