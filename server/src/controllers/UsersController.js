const connection = require('../database/connection');

module.exports = {
  async pesquisar(request, response) {
    
    if (request.query.email !== undefined) {
      var email = request.query.email;

      const user = await connection('users')
        .where('email', email)
        .select('*');

      if (!user) {
        return response.status(400).json({ error: 'Email não encontrado.' })
      }

      return response.json(user);

    }
    else {
      const users = await connection('users').select('*');

      return response.json(users);
    }
  },

  async inserir(request, response) {
    try {
      const { nome, email, contato, senha } = request.body;

      const { id } = await connection('users').insert({
        nome,
        email,
        contato,
        senha
      })

      return response.json({ id, nome });

    } catch (error) {
      return response.status(400).json({ error: 'Ocorreu algum problema no cadastro.' })
    }
  },

  async pesquisarUnicoId(request, response) {
    const { id } = request.params;

    const user = await connection('users')
      .where('id', id)
      .select('*');

    return response.json(user);
  },

  async alterar(request, response) {
    try {
      const { nome, email, contato, senha } = request.body;
      const id = request.params.id;

      await connection('users')
        .where('id', id)
        .update({
          'nome': nome,
          'email': email,
          'contato': contato,
          'senha': senha
        })

      return response.json('Alterado com sucesso!');

    } catch (error) {
      console.log("teste")
      console.log(error)
      return response.status(400).json({ error: error })
    }
  },

  async atualizar(request, response) {
    try {
      const { nome, email, contato, senha } = request.body;

      const { id } = await connection('users').insert({
        nome,
        email,
        contato,
        senha
      })

      return response.json({ id, nome });

    } catch (error) {
      return response.status(400).json({ error: 'Ocorreu algum problema no cadastro.' })
    }
  }
}