import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import api from '../../services/api';

export default function Incidents() {
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setpage] = useState(1);
    const [loading, setLoading] = useState(false)


    const navigation = useNavigation();


    function navigationToDetail(incident) {
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents() {
        if (loading) {
            return
        }

        if (total > 0 && incidents.length === total) {
            return
        }

        setLoading(true)
        const response = await api.get('incidents', {
            params: { page }
        });
        setIncidents([...incidents, ...response.data]);
        setTotal(response.headers['x-total-count']);
        setpage(page + 1);
        setLoading(false);
    }
    useEffect(() => {
        loadIncidents();
    }, [incidents])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total causes: <Text style={styles.headerTextBold}>{total}</Text>
                </Text>
            </View>

            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.description}>Choose one cause and save the day.</Text>

            <FlatList
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.4}
                style={styles.incidentList}
                data={incidents}
                keyExtractor={incident => String(incident.id)}
                // showsVerticalScrollIndicator={false}
                renderItem={({ item: incident }) => (
                    <View style={styles.incident}>

                        <Text style={styles.incidentProperty}>ONG:</Text>
                        <Text style={styles.incidentValue}>{incident.name}</Text>


                        <Text style={styles.incidentProperty}>CAUSE:</Text>
                        <Text style={styles.incidentValue}>{incident.title}</Text>


                        <Text style={styles.incidentProperty}>VALUE:</Text>
                        <Text style={styles.incidentValue}>
                            {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}
                        </Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigationToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>More details</Text>
                            <Feather name="arrow-right" size={16} color="#e02041" />
                        </TouchableOpacity>

                    </View>

                )} />

        </View>
    )
}
