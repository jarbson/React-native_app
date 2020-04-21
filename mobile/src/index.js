import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import api from './services/api';

export default function App() {

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);

        });

    }, []);

    async function handleAddProjects() {
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'jarbson Costa'
        });
        const project = response.data
        setProjects([...projects, project])


    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <StatusBar barStyle="light-content" backgroundColor="#7159c1" />

                <FlatList
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project }) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                />
            </SafeAreaView>

            <TouchableOpacity
                activeOpacity={0.6}
                style={styles.button}
                onPressIn={handleAddProjects}>
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#FFF',
        fontSize: 20,
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});