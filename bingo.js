//window.alert(window.screen.width+" x "+window.screen.height);

// cria TABELA das bolas
$tabela1 = $('#tabela1');
for(let l=0; l<10; l++){
    $tabela1.append($("<tr />"));
    for(let c=0; c<10; c++){
        if((l+c)==0 || ((c*10+l)>=91 && (c*10+l)<=99))
            $tabela1.append($("<td />", {id: '_'+c+''+l}).addClass('cinza').text(c+''+l));
        else
            $tabela1.append($("<td />", {id: '_'+c+''+l}).addClass('normal').text(c+''+l));
    }
}


// cria botão de SORTEAR
$sorteia = $('#sortear');

// cria botão de PARAR
$para = $('#parar');

// cria botão de reinício
$inicio = $('#reiniciar');

// evento de click do botão REINÍCIO
$inicio.on('click', reinicio);
// reinicia TABELA de bolas
function reinicio() {
    $audio.stop();
    for(l=0; l<10; l++){
        for(c=0; c<10; c++){
            $('#_'+c+''+l).removeClass('sorteado');
        }
    }
    $.ajax({url: "https://sallum.tec.br/bingo/zera_sorteios.php", type: "POST", success: function(result, status){
        if(result.substring(0, 3) == '<h3')
            alert(status+": Erro de Conexão ou do Sistema!");
    }}); 
    $('.blink').css('visibility', 'hidden');
    alteraBola('??', '#000000');
}
// Prepara o GIF (roleta) 
var $audio = $('audio');
var sup1 = new SuperGif({ gif: document.getElementById('roleta') } );
sup1.load();
sup1.pause();

// Faz SORTEIO
$sorteia.on('click', function(){
    $audio.stop();
    $audio.attr('src', './som/roda_roleta_1.mp3');
    sup1.play();
    alteraBola('??', "#000000");
});

//Faz a PARADA
var bolasSorteadas = [];
for(let b=0; b<=90; b++){
    bolasSorteadas[b] = "";
}
$para.on('click', function(){
    $audio.stop();
    $audio.attr('src', './som/sorteia.mp3');
    sup1.move_to(0);
    sup1.pause();
    // sorteia número (sem repetição)
    min = Math.ceil(1);
    max = Math.floor(90);
    numero = Math.floor(Math.random() * (max - min + 1)) + min;
    while((bolasSorteadas[numero] == "X") && (bolasSorteadas.filter(x => x === "X").length <= 90)){
        min = Math.ceil(1);
        max = Math.floor(90);
        numero = Math.floor(Math.random() * (max - min + 1)) + min;
    }
    bolasSorteadas[numero] = "X"; //marca na matriz a bola sorteada
    
    dados = numero; 

    if(numero >=1 && numero <=9){ //coloca 0 na frente das unidades
        numero = '0'+numero;
    }
    tipo = 'marca';
    $.ajax({url: "sorteia.php", type: "POST", data: {tipo, dados}, success: function(result, status){
        if(result != '') {
            $('.blink').css("visibility", "visible");
            $('.blink').html(result+"<br>");
            $audio.stop();
            $audio.attr('src', './som/tema-da-vitoria-curto.mp3');
        }
    }});    

    alteraBola(numero, "#6f2424");
});

//Clica nas BOLAS (células)
$celula = $('td');
$celula.on('click', function(event){
    $cel = $(event.target);
    $cel.toggleClass('sorteado');
    if($cel.hasClass("sorteado")){
        bolasSorteadas[$cel.html()] = "X";
        tipo = 'marca';
        alteraBola($cel.html(), "#6f2424");
    }else{
        bolasSorteadas[$cel.html()] = "";
        tipo = 'desmarca';
        alteraBola("??", "#000000");
    }

    dados = $cel.html();
    $.ajax({url: "sorteia.php", type: "POST", data: {tipo, dados}, success: function(result, status){
        if(result != '') {
            alert(status+': '+result);
            $audio.stop();
            $audio.attr('src', './som/tema-da-vitoria-curto.mp3');
        }

    }});
});

$('td').hover.css("color", "#555");

// Trabalhando com a BOLA saltitando $('.ball #texto').css("font-size","50px");
function alteraBola(valor, cor){
    $elemento = $("#texto1");
    $elemento.html(valor);
    $elemento.css("color", cor);
    $('#_'+valor).addClass('sorteado');
    return "fez";
}

function func(){
    window.location.href = "configura.html";
}
