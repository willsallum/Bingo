var $cod = $('#cod');
var $nom = $('#nom');
$cod.on('change', function(){
    tipo = 'codigo';
    dados = $cod.val();
    //alert(tipo+'/'+dados);
    $.ajax({url: "cad_nomes.php", type: "POST", data: {tipo, dados}, success: function(result, status){
        if(status != ""){
            $nom.val(result);
        }else{
            alert("conexão NÂO estabelecida!");
        } 
    }});
});
$nom.on('change', function(){
    cod = $cod.val();
    cod = cod.trim();
    tipo = 'nome-'+cod;
    dados = $nom.val();
    //alert(tipo+'/'+dados);
    $.ajax({url: "cad_nomes.php", type: "POST", data: {tipo, dados}, success: function(result, status){
        if(status != ""){
            $nom.val(result);
        }else{
            alert("conexão NÂO estabelecida!");
        }
    }});
});
