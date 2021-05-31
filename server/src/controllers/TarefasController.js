const connection = require('../database/connection');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    let data = new Date().toISOString().replace(/:/g, '-');
    cb(null, file.originalname + "_" + data);
  }

})

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  }
 })

module.exports = {
  async pesquisar(request, response) {

    if (request.query.title !== undefined) {

      var title = request.query.title;

      const tarefa = await connection('tarefas')
        .where('title', title)
        .select('*');

      if (!tarefa) {
        return response.status(400).json({ error: 'Title não encontrado.' })
      }
      return response.json(tarefa);

    }
    else if (request.query.id !== undefined) {
      var id = request.query.id;

      const tarefa = await connection('tarefas')
        .where('id', id)
        .select('*');

      return response.json(tarefa);
    }
    else {

      const users = await connection('tarefas').select('*');

      return response.json(users);

    }

  },

  async pesquisarUnico(request, response) {
    const id = request.headers.authorization;

    const tarefa = await connection('tarefas')
      .where('id', id)
      .select('*');

    return response.json(tarefa);
  },

  async inserir(request, response) {
    try {
      // let img = '';
      // upload.single('tarefa_imagem')(request, response, err => {
      //   if (err)
      //     // response.status(500).json({ error: 1, payload: err });
      //     response.status(400).json({ error: 'Ocorreu algum problema ao inserir a tarefa.' });
      //   else {
      //     img = request.file.path;
      //   }
      // })

      // console.log(request.body.nome);
      // console.log(request.body.description);
      const { title, description, img } = request.body;

      const user_id = request.headers.authorization;

      const [id] = await connection('tarefas').insert({
        title,
        description,
        img,
        user_id
      })

      return response.json('Inserido com sucesso!');
    } catch (error) {
      console.log(error)
      return response.status(400).json({ error: 'Ocorreu algum problema ao inserir a tarefa.' })
    }
  },

  async alterar(request, response) {
    try {
      const { title, description } = request.body;
      const id = request.params.id;
      const user_id = request.headers.authorization;

      await connection('tarefas')
        .where('id', id)
        .update({
          'title': title,
          'description': description
        })

      return response.json('Alterado com sucesso!');

    } catch (error) {
      return response.status(400).json({ error: error })
    }
  },

  async delete(request, response) {
    const { id } = request.params;
    const user_id = request.headers.authorization;

    const tarefa = await connection('tarefas')
      .where('id', id)
      .select('user_id')
      .first();

    if (tarefa.user_id !== user_id) {
      return response.status(401).json({ error: 'Operação não autorizada.' })
    }

    await connection('tarefas').where('id', id).delete();

    return response.status(204).send()
  }
}