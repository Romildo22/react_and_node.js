import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './style.css'

export default function Alterar() {
  const history = useHistory();
  const [user, setUsers] = useState([]);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [contato, setContato] = useState('');
  const [senha, setSenha] = useState('');

  const user_id = localStorage.getItem('user_id');
  const id = user_id

  if(user_id == null)
  {
    history.push('/')
  }

  async function handleAlterar(e) {
    e.preventDefault();

    const data = {
      nome,
      email,
      contato,
      senha,
    }

    try {
      const response = await api.put(`users/${id}`, data)

      alert(`Alterar realizado com sucesso!`)
      history.push('/inicio')
    } catch (error) {
      console.log(error)
      alert('Erro ao realizar o alterar, tente novamente.')
    }
  }

  useEffect(() => {
    api.get(`users/${id}`, {}).then(response => {
      setUsers(response.data)
    })
  }, [user_id])

  if(nome == '' && email == '' && contato == '')
  {
    user.map(user => (
      setNome(user.nome),
      setEmail(user.email),
      setContato(user.contato)
    ))
  }

  return (
    <div className="register-container">

      <div className="content">
        <section>
          <h1>Alterar dados do usuário</h1>

          <Link className="back-link" to="/inicio">
            <FiArrowLeft size={16} color="#0abffc" />
            Voltar para a tela inicial.
          </Link>
        </section>

        <form onSubmit={handleAlterar} >
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
          <input type="password" placeholder="Nova senha"
            value={senha}
            onChange={e => setSenha(e.target.value)} />

          <button className="button" type="submit" >Alterar</button>
        </form>
      </div>

    </div>
  )
}