import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Tts from 'react-native-tts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { BlurView } from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';

const HomeScreen = ({ setIsLoggedIn }) => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks) setTasks(JSON.parse(savedTasks));
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!task.trim()) return;

    if (editingId) {
      setTasks(tasks.map(t => t.id === editingId ? { ...t, text: task } : t));
      setEditingId(null);
    } else {
      setTasks([...tasks, { id: Date.now().toString(), text: task, completed: false }]);
    }

    setTask('');
  };

  const editTask = (id, text) => {
    setTask(text);
    setEditingId(id);
  };

  const toggleComplete = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = id => {
    setTasks(tasks.filter(t => t.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setTask('');
    }
  };

  const readTask = text => {
    Tts.speak(text);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('loggedIn');
    setIsLoggedIn(false);
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#084c61', '#177e89']} style={StyleSheet.absoluteFill} />
      
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.title}>Voice Todo</Text>

        <View style={styles.glassWrapper}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="light"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={task}
              placeholder="Enter a task"
              placeholderTextColor="#ccc"
              onChangeText={setTask}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Icon name={editingId ? "check" : "add"} size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.tasksContainer}>
          <FlatList
            data={tasks}
            keyExtractor={item => item.id}
            style={styles.taskList}
            contentContainerStyle={styles.taskListContent}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <TouchableOpacity style={styles.taskTextContainer} onPress={() => toggleComplete(item.id)}>
                  <View style={[styles.checkbox, item.completed && styles.checkboxChecked]}>
                    {item.completed && <Icon name="check" size={14} color="#fff" />}
                  </View>
                  <Text style={[styles.taskText, item.completed && styles.taskTextCompleted]}>
                    {item.text}
                  </Text>
                </TouchableOpacity>
                <View style={styles.taskButtons}>
                  <TouchableOpacity style={styles.iconButton} onPress={() => readTask(item.text)}>
                    <Icon name="volume-up" size={22} color="#177e89" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => editTask(item.id, item.text)}>
                    <Icon name="edit" size={22} color="#fdd835" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconButton} onPress={() => deleteTask(item.id)}>
                    <Icon name="delete-outline" size={22} color="#ff5252" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>

        {editingId && (
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: '#888' }]}
            onPress={() => {
              setEditingId(null);
              setTask('');
            }}
          >
            <Text style={styles.logoutText}>Cancel Edit</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  glassWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    marginBottom: 20,
    marginHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  addButton: {
    backgroundColor: '#177e89',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  tasksContainer: {
    flex: 1,
    marginBottom: 10,
  },
  taskList: {
    paddingHorizontal: 16,
  },
  taskListContent: {
    paddingBottom: 10,
  },
  taskItem: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  taskTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.6)',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#177e89',
    borderColor: '#177e89',
  },
  taskText: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.7,
  },
  taskButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 5,
    marginLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    width: 34,
    height: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: 'rgba(255,59,48,0.7)',
    paddingVertical: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 16
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
