from flask import Flask, render_template, request, redirect, url_for
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'chave_secreta'
db = SQLAlchemy(app)

# Modelo do Projeto
class Projeto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    titulo = db.Column(db.String(100), nullable=False)
    descricao = db.Column(db.Text, nullable=False)

# Criar banco de dados
with app.app_context():
    db.create_all()

# Página Inicial
@app.route('/')
def home():
    projetos = Projeto.query.all()
    return render_template('index.html', projetos=projetos)

# Página para Adicionar Projetos
@app.route('/add', methods=['GET', 'POST'])
def add_project():
    if request.method == 'POST':
        titulo = request.form['titulo']
        descricao = request.form['descricao']
        novo_projeto = Projeto(titulo=titulo, descricao=descricao)
        db.session.add(novo_projeto)
        db.session.commit()
        return redirect(url_for('home'))
    return render_template('add_project.html')

if __name__ == '__main__':
    app.run(debug=True)
