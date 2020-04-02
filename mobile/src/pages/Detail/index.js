import React from 'react';
import { View, Image, TouchableOpacity, Text, Linking } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { Feather } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer'

export default function Detail() {
    const navigation = useNavigation();

    function sendEmail() {
        MailComposer.composeAsync({
            subject: 'Her[oi do caso: cadela atropelada',
            recipients: ['lourencovw@gmail.com'],
            body: 'whatever'
        });
    }

    function navigateBack() {
        navigation.goBack();
    }
    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=5527999315847&text=${'whatever'}`)
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>

            </View>
            <View style={styles.incident}>

                <Text style={[styles.incidentProperty, {marginTop: 0}]}>ONG:</Text>
                <Text style={styles.incidentValue}>Escolha um dos casos abaixo e salve o dia.</Text>


                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>CACHORRO ATROPELADO</Text>


                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>R$ 120,00</Text>

               

            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Be The Hero</Text>
                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text styles={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text styles={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </View>
    )
}
