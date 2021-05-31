import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiEdit, FiPower } from 'react-icons/fi';
import api from '../../services/api'

import './style.css';

export default function Login() {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const user_id = localStorage.getItem('user_id');
  const id = user_id

  if(user_id == null)
  {
    history.push('/')
  }

  useEffect(() => {
    api.get(`users/${id}`, {}).then(response => {
      setUsers(response.data)
    })
  }, [user_id])

  async function handleEditarTarefa() {
    history.push('/alterar')
  }

  function handleLogout() {
    localStorage.clear();

    history.push('/')
  }

  return (
    <div className="profile-container">
      <header>
        <span>Spotify</span>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <ul>
        <h1>Dados do usuário</h1>
        {users.map(users => (
          <li key={users.id}>
            <strong>Nome:</strong>
            <p> - {users.nome}</p>

            <strong>Email:</strong>
            <p> - {users.email}</p>

            <strong>Contato:</strong>
            <p> - {users.contato}</p>

            <button onClick={() => handleEditarTarefa()} type='button' >
              <FiEdit size={20} color="#a8ab3" />
            </button>
          </li>
        ))}
      </ul>

    </div>
  );
}