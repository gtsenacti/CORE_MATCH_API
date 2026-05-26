function loginRoutes(app, db) {

    app.post("/login", (req, res) => {

        const { nome, email, senha } = req.body;

        // validação
        if (!nome || !email || !senha) {

            return res.status(400).json({
                erro: "Nome, e-mail e senha são obrigatórios"
            });
        }

        const sql = `
            SELECT *
            FROM TabelaCadastro
            WHERE nome = ?
            AND email = ?
            AND senha = ?
        `;

        db.get(sql, [nome, email, senha], (err, row) => {

            if (err) {

                return res.status(500).json({
                    erro: err.message
                });
            }

            // usuário não encontrado
            if (!row) {

                return res.status(401).json({
                    erro: "Usuário não cadastrado"
                });
            }

            // sucesso
            res.json({
                mensagem: "Login realizado",
                usuario: row
            });
        });
    });
}

module.exports = loginRoutes;