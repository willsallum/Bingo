//alert("entrou");
$tabela2 = $('<table />').attr('id', 'tabela2');
$(document).ready(function() {
    //alert("dentro");
    let tipo = 'inicia';
    let dados = '' ;
    $.ajax({url: "bingo.php", type: "POST", data: {tipo, dados}, success: function(result, status){
        (status != "")? montaTabela(result): alert("conexão NÂO estabelecida!");
    }});
});

function montaTabela(res){
    var registro = res.split("*");
    var tab = "";
    for(let c = 1; c <= 100; c++){
        item = registro[c-1].split(";");
        tab += "<tr><td><input size='2' type='text' class='codigos' disabled id='"+c+"_c' value="+item[0]+" ></td>";
        tab += "<td colspan='8'><input type='text' class='nomes input' size='40' placeholder='Nome' onchange='altera(this)' id='"+c+"_nome' value='"+item[1]+"' ></td></tr><tr>";
        for(let n = 1; n <= 9; n++){
            num = (item[n+1]==0)? "": item[n+1];
            tab += "<td><input size='2' type='number' min='1' max='90' class='input' onchange='altera(this)' id='"+c+"_"+n+"' value="+num+" ></td>";
        }
        tab += "</tr><tr>";
        for(n = 10; n <= 18; n++){
            num = (item[n+1]==0)? "": item[n+1];
            tab += "<td><input size='2' type='number' min='1' max='90' class='input' onchange='altera(this)' id='"+c+"_"+n+"' value="+num+" ></td>";
        }
        tab += "</tr><tr>";
        for(n = 19; n <= 27; n++){
            num = (item[n+1]==0)? "": item[n+1];
            tab += "<td><input size='2' type='number' min='1' max='90' class='input' onchange='altera(this)' id='"+c+"_"+n+"' value="+num+" ></td>";
        }
        tab+="</tr>";
    }
    //$tabela2.html(tab);
    $tabela2.html(tab);
    $('body').append($tabela2);
}

function altera(t){
    let tipo = t.id;
    let dados = t.value;
    //alert(tipo+"/"+dados);
    $.ajax({url: "bingo.php", type: "POST", data: {tipo, dados}, success: function(result, status){
        //(status != "")? alert(result): alert("conexão NÂO estabelecida!");
        //alert(status+': '+result);
    }});
};
