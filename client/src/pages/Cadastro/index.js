import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './style.css'

export default function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [contato, setContato] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  async function handleCadastro(e) {
    e.preventDefault();

    const data = {
      nome,
      email,
      contato,
      senha,
    }

    try {
      const response = await api.post('users', data)

      alert(`${response.data.nome}, cadastro realizado com sucesso!`)
      history.push('/')
    } catch (error) {
      alert('Erro ao realizar o cadastro, tente novamente.')
    }
  }

  return (
    <div className="register-container">

      <div className="content">
        <section>
          <h1>Cadastro</h1>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#0abffc" />
            Voltar para o login.
          </Link>
        </section>

        <form onSubmit={handleCadastro} >
          <input
            placeholder="Seu nome"
            value={nome}
            onChange={e => setNome(e.target.value)} />
          <input type="email" placeholder="Seu e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)} />
          <input type="phone" placeholder="Seu contato"
            value={contato}
            onChange={e => setContato(e.target.value)} />
          <input type="password" placeholder="Sua senha"
            value={senha}
            onChange={e => setSenha(e.target.value)} />

          <button className="button" type="submit" >Cadastrar</button>
        </form>
      </div>

    </div>
  )
}