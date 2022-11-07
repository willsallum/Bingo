// cria TABELA das bolas
$tabela1 = $('<table />', {border: '1'}).addClass('inicia');
for(let l=0; l<10; l++){
    $tabela1.append($("<tr />"));
    for(let c=0; c<10; c++){
        $tabela1.append($("<td />", {id: '_'+c+''+l}).addClass('normal').text(c+''+l));
    }
}
$('body').append($tabela1); // agrega tabela1 ao BODY

// cria botão de reinício
$inicio = $('<button />', {id: 'reiniciar'}).addClass('btn first').text('REINICIAR');
$('body').append($inicio); // agrega botão de reinicio ao BODY

// evento de click do botão REINÍCIO
$('#reiniciar').on('click', reinicio);
// reinicia TABELA de bolas
function reinicio() {
    for(l=0; l<10; l++){
        for(c=0; c<10; c++){
            $('#_'+c+''+l).removeClass('sorteado');
        }
    }
    alteraBola('??');
}

// cria botão de SORTEAR
$sorteia = $('<button />', {id: 'sortear'}).addClass('btn secound').text('SORTEAR !!!');
$('body').append($sorteia); // agrega botão de reinicio ao BODY
// cria botão de PARAR
$para = $('<button />', {id: 'parar'}).addClass('btn terceiro').text('PARAR !!!');
$('body').append($para); // agrega botão de reinicio ao BODY

var sup1 = new SuperGif({ gif: document.getElementById('roleta') } );
sup1.load();
sup1.pause();
$sorteia.on('click', function(){
    sup1.play();
    alteraBola('??');
});
$para.on('click', function(){
    sup1.pause();
    min = Math.ceil(1);
    max = Math.floor(99);
    numero = Math.floor(Math.random() * (max - min + 1)) + min;
    if(numero >=1 && numero <=9){
        numero = '0'+numero;
    }
    alteraBola(numero);
});
/* evento de click do botão SORTEAR
$('#sortear').on('click', function(){
    alert("sfdsfdsf");
    $('img').attr("src","https://content.presentermedia.com/content/animsp/00016000/16356/bingo_ball_color_winner_300_wht.gif");$('img').addClass('gif-roleta');
}); */

$celula = $('td');
$celula.on('click', function(event){
    $cel = $(event.target);
    $cel.toggleClass('sorteado');
});

$('.btn').on('mouseout').css('color', '#000');

$tabela2 = $('<table />', {border: '1'}).addClass('vazio');
for(let linha=1; linha<=4; linha++){
    $tabela2.append($("<tr />"));
    for(let coluna=1; coluna<=25; coluna++){
        $tabela2.append($("<td />", {id: 't'+linha+''+coluna}).addClass('vazio').text(""));
    }
}
$('body').append($tabela2); // agrega tabela2 ao BODY

// Trabalhando com a BOLA santitando $('.ball #texto').css("font-size","50px");
function alteraBola(valor){
    document.querySelector("#texto1").textContent = valor;
    $('#_'+valor).addClass('sorteado');
}