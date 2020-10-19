from config import *
from modelo import Livro

@app.route("/")
def inicio():
    return 'Sistema de Cadastro de Livros. '+\
        '<a href="/listar_livros">Listar livros</a>'

@app.route("/listar_livros")
def listar_livros():
    # obter as livros do cadastro
    livros = db.session.query(Livro).all()
    # aplicar o método json que a classe livro possui a cada elemento da lista
    livros_em_json = [ x.json() for x in livros]
    # converter a lista do python para json
    resposta = jsonify(livros_em_json)
    # PERMITIR resposta para outras pedidos oriundos de outras tecnologias
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # retornar...

@app.route("/incluir_livro", methods=['post'])
def incluir_livro():
    # preparar uma resposta otimista
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    # receber as informações da nova livro
    dados = request.get_json() #(force=True) dispensa Content-Type na requisição
    try: # tentar executar a operação
      nova = Livro(**dados) # criar a nova livro
      db.session.add(nova) # adicionar no BD
      db.session.commit() # efetivar a operação de gravação
    except Exception as e: # em caso de erro...
      # informar mensagem de erro
      resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    # adicionar cabeçalho de liberação de origem
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta # responder!

@app.route("/excluir_livro/<int:livro_id>", methods=['DELETE'])
def excluir_livro(livro_id):
    resposta = jsonify({"resultado": "ok", "detalhes": "ok"})
    try:
        Livro.query.filter(Livro.id == livro_id).delete()
        db.session.commit()
    except Exception as e:
        resposta = jsonify({"resultado":"erro", "detalhes":str(e)})
    resposta.headers.add("Access-Control-Allow-Origin", "*")
    return resposta 

app.run(debug=True)