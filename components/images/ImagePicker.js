import React from "react";
import {
  View,
  ScrollView,
  ImageBackground,
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
  Image
} from "react-native";
import {
  Icon
} from "react-native-elements";
import * as  Picker from "expo-image-picker";
import { getPermission } from "../../utils/permissions";
import Colors from "../../constants/Colors";
import Sizes from "../../constants/Sizes";

const ImagePicker = ({setData=null, data=null, param = 'image'}) => {
  const [image, setImage] = React.useState(null);
  const [isManip, setManip] = React.useState(false);

  const handleSet = React.useCallback((result) => {
    setImage(result);
    if(data && setData) {
      setData({...data, [param]: result })
    }
  }, [data, setData, param, setImage])

  const _pickImage = async () => {
    const result = await Picker.launchImageLibraryAsync({
      mediaTypes: Picker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });
    handleSet(result);
  }

  React.useEffect(() => {
    getPermission('CAMERA_ROLL');
  }, []);

  if(image && image.uri) {
    const dimensions = Dimensions.get('window')
    const imgWidth = parseInt(dimensions.width)
    const imgHeight = parseInt((dimensions.width * image.height) / image.width)

    return (
      <View style={styles.container}>
        <ImageBackground source = {{uri: image.uri}} style={{ height: imgHeight, width: imgWidth}} resizeMode='cover'>
          <TouchableOpacity onPress = { () => handleSet(null) } style={styles.crossContainer}>
            <Icon name="clear" color={Colors.white}/>
          </TouchableOpacity>
        </ImageBackground>
      </View>
    )
    }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress = {_pickImage} style={ styles.container }>
        <View style={styles.pickerView}>
          <Icon name='folder' color={ Colors.tintColor }/>
          <Text style={styles.text}>Ajouter une image</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: Colors.darkGrey,
    fontWeight: 'bold',
    fontSize: Sizes.default,
  },
  crossContainer: {
    flexDirection: 'row-reverse',
  },
})

export default ImagePicker;
