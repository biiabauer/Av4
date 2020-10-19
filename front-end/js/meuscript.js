$(function() { 
    
    function exibir_livros() {
        $.ajax({
            url: 'http://localhost:5000/listar_livros',
            method: 'GET',
            dataType: 'json', 
            success: listar, 
            error: function(problema) {
                alert("erro ao ler dados, verifique o backend");
            }
        });
         
        function listar (livros) {
            $('#corpoTabelaLivros').empty();
            mostrar_conteudo("tabelalivros");      
            for (var i in livros) { 
                lin = '<tr id="linha_'+livros[i].id+'">' + 
                '<td>' + livros[i].nome + '</td>' + 
                '<td>' + livros[i].autor + '</td>' + 
                '<td>' + livros[i].ano + '</td>' + 
                '<td><a href=# id="excluir_' + livros[i].id + '" ' + 
                  'class="excluir_livro"><img src="img/excluir.png" '+
                  'alt="Excluir livro" title="Excluir livros" height=20 width= 20></a>' + 
                '</td>' + 
                '</tr>';
                $('#corpoTabelaLivros').append(lin);
            }
        }
    }

    function mostrar_conteudo(identificador) {
        $("#tabelalivros").addClass('invisible');
        $("#conteudoInicial").addClass('invisible');
        $("#"+identificador).removeClass('invisible');      
    }

    $(document).on("click", "#linkListarLivros", function() {
        exibir_livros();
    });
    
    $(document).on("click", "#linkInicio", function() {
        mostrar_conteudo("conteudoInicial");
    });

    $(document).on("click", "#btIncluirLivro", function() {
        nome = $("#campoNome").val();
        autor = $("#campoAutor").val();
        ano = $("#campoAno").val();
        var dados = JSON.stringify({ nome: nome, autor: autor, ano: ano });
        $.ajax({
            url: 'http://localhost:5000/incluir_livro',
            type: 'POST',
            dataType: 'json', 
            contentType: 'application/json', 
            data: dados, 
            success: livroIncluida, 
            error: erroAoIncluir
        });
        function livroIncluida (retorno) {
            if (retorno.resultado == "ok") { 
                alert("Música incluída com sucesso!");
                nome = $("#campoNome").val();
                autor = $("#campoautor").val();
                ano = $("#campoAno").val();
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoIncluir (retorno) {
            alert("ERRO: "+retorno.resultado + ":" + retorno.detalhes);
        }
    });

    $('#modalIncluirLivro').on('hide.bs.modal', function (e) {
        if (! $("#tabelalivros").hasClass('invisible')) {
            exibir_livros();
        }
    });

    mostrar_conteudo("conteudoInicial");

    $(document).on("click", ".excluir_livro", function() {
        var componente_clicado = $(this).attr('id'); 
        var nome_icone = "excluir_";
        var id_livro = componente_clicado.substring(nome_icone.length);
        $.ajax({
            url: 'http://localhost:5000/excluir_livro/'+id_livro,
            type: 'DELETE', 
            dataType: 'json', 
            success: livroExcluida, 
            error: erroAoExcluir
        });
        function livroExcluida (retorno) {
            if (retorno.resultado == "ok") { 
                $("#linha_" + id_livro).fadeOut(1000, function(){
                    alert("Livro removido com sucesso!");
                });
            } else {
                alert(retorno.resultado + ":" + retorno.detalhes);
            }            
        }
        function erroAoExcluir (retorno) {
            alert("erro ao excluir dados, verifique o backend: ");
        }
    });
});
