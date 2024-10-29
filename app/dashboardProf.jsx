// dashboardProf.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Import useNavigation

// Drawer Navigator
const Drawer = createDrawerNavigator();

const InstructorDashboard = () => (
    <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to the Instructor Dashboard!</Text>
    </View>
);

const ScheduleManagement = () => (
    <View style={styles.container}>
        <Text style={styles.sectionHeader}>Schedule Management</Text>
        <Text>Manage your schedule here.</Text>
    </View>
);

const CourseManagement = () => (
    <View style={styles.container}>
        <Text style={styles.sectionHeader}>Course Management</Text>
        <Text>Manage your courses and assignments here.</Text>
    </View>
);

const ProfileScreen = ({ navigation, name, onProfileUpdate }) => {
    const [editName, setEditName] = useState(name);

    const handleSave = () => {
        onProfileUpdate(editName);
        Alert.alert("Profile Updated", "Your profile has been updated successfully.", [
            {
                text: "OK",
                onPress: () => navigation.navigate('Home'),
            },
        ]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionHeader}>Profile</Text>
            <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                <Text style={styles.submitButtonText}>Save Profile</Text>
            </TouchableOpacity>
        </View>
    );
};

// Custom Drawer Content to include Logout button
const CustomDrawerContent = (props) => {
    const navigation = useNavigation(); // Use useNavigation to access navigation instance

    const { onLogout } = props;

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <View style={styles.logoutContainer}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.logoutButtonText}>Log Out</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
};

const DashboardProf = ({ name, onProfileUpdate }) => {
    return (
        <NavigationContainer independent={true}>
            <Drawer.Navigator
                initialRouteName="Instructor Dashboard"
                drawerContent={(props) => <CustomDrawerContent {...props} />}
            >
                <Drawer.Screen name="Instructor Dashboard" component={InstructorDashboard} />
                <Drawer.Screen name="Schedule Management" component={ScheduleManagement} />
                <Drawer.Screen name="Course Management" component={CourseManagement} />
                <Drawer.Screen name="Profile">
                    {({ navigation }) => (
                        <ProfileScreen
                            navigation={navigation}
                            name={name}
                            onProfileUpdate={onProfileUpdate}
                        />
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    sectionHeader: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    welcomeText: {
        fontSize: 20,
        margin: 20,
        textAlign: 'center',
    },
    submitButton: {
        backgroundColor: '#276630',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    submitButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    logoutContainer: {
        marginTop: 500, // Adjust as needed
        paddingHorizontal: 20,
        
        borderColor: '#ccc',
    },
    logoutButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default DashboardProf;
