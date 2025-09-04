import mariadb from 'mariadb';
import express from 'express';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Pi3tro251108-',
    database: 'loginteste',
    port: 3306
})

app.get('/login', async (req, res) => {
    const { usuario, senha } = req.query; // pega os dados da query

    if (!usuario || !senha) return res.status(400).json({ message: 'Usuário e senha obrigatórios' });

    try {
        const conn = await pool.getConnection();
        const resultado = await conn.query(
            "SELECT * FROM usuarios WHERE usuario = ? AND senha = ?",
            [usuario, senha]
        );
        conn.release();

        if (resultado.length > 0) {
            res.json({ message: 'Login válido!' });
        } else {
            res.status(401).json({ message: 'Usuário ou senha incorretos' });
        }
    } catch(err) {
        console.log('Ocorreu um erro:', err);
        res.status(500).json({ message: 'Erro no servidor' });
    }
});



app.post('/login', async (req, res) => {
    const { usuario, senha } = req.body;
    let conn;

    if (!usuario || !senha) return res.status(400).send('Digite o nome e a senha');
    try {
        conn = await pool.getConnection();
        await conn.query(
            "INSERT INTO usuarios(usuario, senha) VALUES (?, ?)",
            [usuario, senha]
        );
        conn.release();

        res.send({ success: true, message: "Usuário cadastrado!" });
    } catch (err) {
        console.log('Ocorreu um erro:', err); 
        res.status(500).send('Erro no servidor');
    }
});


app.listen(3000);
console.log("Servidor rodando em localhost:3000");
