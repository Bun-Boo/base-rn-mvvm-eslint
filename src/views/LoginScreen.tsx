import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import useUserViewModel from '../viewmodels/useUserViewModel';

const LoginScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { user, loading, error, login } = useUserViewModel();

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {user ? <Text>Welcome, {user.name}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});

export default LoginScreen;
