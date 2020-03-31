import React, { useState, useEffect } from 'react'
import './style.css';
import logoImg from '../../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();
    console.log(ongId);
    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
            console.log(response);
        }).catch(error => console.log(error))
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });
            setIncidents(incidents.filter(incident => incident.id !== id));

        } catch (error) {

        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Welcome, {ongName}</span>
                <Link className="button" to="/incidents/new">New Case</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Cases</h1>
            <ul>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASE:</strong>
                        <p>{incident.title}</p>

                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>


                        <strong>VALUE(BRL):</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="a8a8b3" />
                        </button>
                    </li>

                ))}
            </ul>
        </div>
    )
}
