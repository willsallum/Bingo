// Configurações do site
var tipo = "";
var dados = "";
alteraConfig();
$('#boxSorteia').on('click', function(){
    tipo = '0';
    dados = $('#boxSorteia').prop(':checked')?0:1;
    alteraConfig();
});
$('#boxParada').on('click', function(){
    tipo = '1';
    dados = $('#boxParada').prop(':checked')?0:1;
    alteraConfig();
});
$('#boxVitoria').on('click', function(){
    tipo = '2';
    dados = $('#boxVitoria').prop(':checked')?0:1;
    alteraConfig();
});
$('#boxLinha').on('click', function(){
    tipo = '3';
    dados = $('#boxLinha').prop(':checked')?0:1;
    alteraConfig();
});
$('#boxCartela').on('click', function(){
    tipo = '4';
    dados = $('#boxCartela').prop(':checked')?0:1;
    alteraConfig();
});
function alteraConfig(){
    //alert('entrou no alteraConfig com tipo = '+tipo);
    $.ajax({url: "https://sallum.tec.br/bingo/config.php", type: "POST",  data: {tipo, dados}, success: function(result, status){
        if(status != ""){
            //alert('entrou no AJAX>>'+status+': '+result);
            tipo = result.split('.');
            (parseInt(tipo[0])==1)?$('#boxSorteia').prop('checked', true): $('#boxSorteia').prop('checked', false);
            (parseInt(tipo[2])==1)?$('#boxParada').prop('checked', true): $('#boxParada').prop('checked', false);
            (parseInt(tipo[3])==1)?$('#boxVitoria').prop('checked', true): $('#boxVitoria').prop('checked', false);
            (parseInt(tipo[4])==1)?$('#boxLinha').prop('checked', true): $('#boxLinha').prop('checked', false);
            (parseInt(tipo[5])==1)?$('#boxCartela').prop('checked', true): $('#boxCartela').prop('checked', false);
        }else
            $('#mens').html(status+': '+result);
        
    }});
}   

// Acionamento dos botões de funcionalidades
$('#bt1').click(function(){
    window.location.href = "cadastra_nomes.html";
});
$('#bt2').click(function(){
    window.location.href = "cadastra_cartelas.html";
});
$('#bt3').click(function(){
    $.ajax({url: "https://sallum.tec.br/bingo/somatorio_linhas.php", type: "POST", success: function(result, status){
        $('#mens').html(status+': '+result);
    }});
});
$('#bt4').click(function(){
    $.ajax({url: "https://sallum.tec.br/bingo/zera_sorteios.php", type: "POST", success: function(result, status){
        $('#mens').html(status+': '+result);
    }});
});
$('#bt5').click(function(){
    $.ajax({url: "https://sallum.tec.br/bingo/zera_nomes.php", type: "POST", success: function(result, status){
        $('#mens').html(status+': '+result);
    }});
});
$('#bt6').click(function(){
    $.ajax({url: "https://sallum.tec.br/bingo/zera_rank.php", type: "POST", success: function(result, status){
        $('#mens').html(status+': '+result);
    }});
});
$('#bt7').click(function(){
    $conf = confirm("ATENÇÃO!!! VOCÊ TEM CERTEZA QUE DESEJA APAGAR TODOS OS NÚMEROS???");
    if($conf){
        $.ajax({url: "https://sallum.tec.br/bingo/backupBD.php", type: "POST", success: function(result, status){
            if(result == true){
                $.ajax({url: "https://sallum.tec.br/bingo/zera_bolas.php", type: "POST", success: function(result, status){
                    $('#mens').html(status+': '+result);
                }});
                $('#mens').html("<h2 style='color:blue;'>Números de bolas reiniciados e Backup gerado!</h2>");
            }else{
                $('#mens').html("<h3 style='color:red;'>Erro na tentativa de Backup! Bolas não foram zeradas!</h3>");
            }
        }});
    }
});
