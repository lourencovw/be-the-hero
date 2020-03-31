import React, { useState } from 'react';
import './style.css';
import logoImg from '../../assets/logo.svg';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import api from '../../services/api';


export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {title,description, value};
        try {
           await  api.post('incidents', data, { headers: { Authorization : ongId}});
           history.push('/profile')            
        } catch (error) {
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (

        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>New case</h1>

                    <p>Describe the case in order to find a hero to solve it.</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                    value={title}
                    onChange={ e => setTitle(e.target.value)}
                    placeholder="Case title"/>
                    <textarea 
                    value={description}
                    onChange={ e => setDescription(e.target.value)}
                    placeholder="Description"/>
                    <input 
                    value={value}
                    onChange={ e => setValue(e.target.value)}
                    placeholder="Value(BRL)"/>

                    <button className="button" type="submit">Add</button>
                </form>
            </div>
        </div>
    )
}
