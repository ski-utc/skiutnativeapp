import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView
} from "react-native";
import { ListItem } from "react-native-elements";
import Avatar from "../avatar/avatar";
import { Colors, Sizes } from "../../constants";
import { useSelector, useDispatch } from "react-redux";
import { users as usersAPI } from "../../api/state";

/**
 * Function to display autocomplete input
 * @param {function} onSelect - action to do on selection of an item
 * @param {array} filterList - list of items not to display
**/
const AutocompleteInput = ({ onSelect, filterList }) => {
  const dispatch = useDispatch();
  const { users } = useSelector(state => ({
    users: (filterList && filterList.length ) ?
    usersAPI.getValuesFromState(state).filter(value => !filterList.find(val => (val.getKey() === value.getKey())))
    : usersAPI.getValuesFromState(state)
  }));

  const [inputValue, setInputValue] = React.useState(null);

  const handleSelect = React.useCallback((value) => {
    onSelect(value);
    setInputValue(null);
  },[onSelect, setInputValue]);

  const autoComplete = React.useCallback((query) => {
    if(query && query.length) {
      dispatch(usersAPI.list({ parameters: { query: encodeURI(query) }}))
    }
    },[dispatch]);

  const clear = React.useCallback(() => dispatch(usersAPI.reset()), [dispatch]);

  React.useEffect(() => {
    return () => clear();  
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Cherches tes amis"
        value={inputValue}
        style={styles.input}
        onChangeText={ text => {setInputValue(text); autoComplete(text); }}
        />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        {
          (users && users.length) ? users.map(user => (
              <ListItem
                key={ user.getKey() }
                leftAvatar={ <Avatar user={ user }/> }
                title={`${user.getFirstname()} ${user.getLastname()}`}
                subtitle={ user.getKey() }
                bottomDivider
                onPress={ () => handleSelect(user) }
                />
          ))
            : null
          }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  scrollview: {
    maxHeight: 120,
  },
  input: {
    width: '100%',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.primaryBlue,
    marginBottom: 5,
    color: Colors.darkGrey
  },
});

export default AutocompleteInput;
