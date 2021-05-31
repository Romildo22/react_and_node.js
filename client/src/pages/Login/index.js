import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi';
import api from '../../services/api'

import './style.css';

export default function Login(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    const data = {
      email,
      senha,
    }

    try {
      const response = await api.post('sessions', data)

      alert(`Login realizado com sucesso!`)
      localStorage.setItem('user_id', response.data.id);

      history.push('/inicio')
    } catch (error) {
      alert('Erro ao realizar o login, tente novamente.')
    }
  }

  return (
    <div className="logo-container">
      <section className="form">
        <form onSubmit={handleLogin} >
          <h1>Faça seu login</h1>
          <input type="email" placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} />
           <input type="password" placeholder="Sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)} />
          <button className="button" type="submit">Entrar</button>

          <Link className="back-link" to="/cadastro">
            <FiLogIn size={16} color="#0abffc" />
            Não tenho cadastro.
          </Link>
        </form>
      </section>
    </div>
  );
}