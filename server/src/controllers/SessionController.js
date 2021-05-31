const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    const { email } = request.body;
    const { senha } = request.body;

    const userEmail = await connection('users')
      .where('email', email)
      .select('id')
      .first();

    if(!userEmail)
    {
      return response.status(400).json({ error: 'Email não encontrado.'})
    }

    const userSenha = await connection('users')
      .where('senha', senha)
      .select('nome')
      .first();

    if(!userSenha)
    {
      return response.status(400).json({ error: 'Senha incorreta.'})
    }

    return response.json(userEmail);
  }
}