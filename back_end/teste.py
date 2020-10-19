from modelo import *
import os

# teste    
if __name__ == "__main__":
    # apagar o arquivo, se houver
    if os.path.exists(arquivobd):
        os.remove(arquivobd)

    # criar tabelas
    db.create_all()

    # teste da classe Livro
    l1 = Livro (nome = "A noiva fantasma", autor = "Yangsze Choo", ano = "2015")
    l2 = Livro (nome = "Névoa", autor = "Kathyn James", ano = "2014")
    l3 = Livro (nome = "Gelo", autor = "Kathyn James", ano = "2014")
    l4 = Livro (nome = "Brida", autor = "Paulo Coelho", ano = "1990" )
    l5 = Livro (nome = "Anjos e Demônios", autor = "Dan Brown", ano = "2003")
    
    db.session.add(l1)
    db.session.add(l2)
    db.session.add(l3)
    db.session.add(l4)
    db.session.add(l5)
    db.session.commit()
    
    print(l1.json())
    print(l2.json())
    print(l3.json())
    print(l4.json())
    print(l5.json())

    