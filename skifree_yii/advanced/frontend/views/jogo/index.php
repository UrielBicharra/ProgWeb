<?php
/* @var $this yii\web\View */

use yii\helpers\Url;

$this->registerJsFile("skifree/js/skifree.js");
$this->registerCssFile("skifree/css/estilos.css");

$this->registerJs("
  var pontuacao = 100;

  $.ajax({
    type: 'GET',
    url: '" . Url::to(['jogo/save']) . "',
    data: {
        'pontuacao': pontuacao
    },
    error: function () {
      console.log('Erro');
    }
    success: function (data) {
      console.log(data);
    }
  });
");

?>
<div id="montanha">
   <div id="skier"></div>
</div>
<div id="score"></div>
