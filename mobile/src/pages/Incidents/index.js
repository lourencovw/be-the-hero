import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import {Feather} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api';

export default function Incidents() {
    const [incidents, setIncidents] = useState([])
    const navigation = useNavigation();

    function navigationToDetail() {
        navigation.navigate('Detail');
    }

    async function loadIncidents() {
        const response = await api.get('incidents?page=1');
        setIncidents(response.data)
    }
    useEffect(() => {
        loadIncidents();
    }, [incidents])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>0 casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList style={styles.incidentList} data={incidents} keyExtractor={ incident => String(incident.id)} showsVerticalScrollIndicator={false} 
            renderItem={ ({item: incident}) => (
                <View style={styles.incident}>

                    <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name}</Text>


                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title}</Text>


                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>{incident.value}</Text>

                    <TouchableOpacity style={styles.detailsButton} onPress={navigationToDetail}>
                        <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={16} color="#e02041"/>
                    </TouchableOpacity>

                </View>

            )}/>

        </View>
    )
}
