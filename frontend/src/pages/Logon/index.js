import React, { useState } from 'react';
import './style.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { FiLogIn } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();
    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.Ong.name);
            history.push('/profile');
        } catch (error) {
            alert('Falha no login tente novamente.')
        }
    }
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero" />
                <form >
                    <h1>User login</h1>
                    <input placehoolder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" onClick={handleLogin} type="submit">Entrar</button>
                    <Link className="back-link" to="register">
                        <FiLogIn size={16} color="#E02041" />
                        Create account
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}
