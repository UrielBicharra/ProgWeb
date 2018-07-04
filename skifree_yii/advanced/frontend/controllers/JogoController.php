<?php

namespace frontend\controllers;
use common\models\Jogada;
use Yii;

class JogoController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionRanking()
    {
        return $this->render('ranking');
    }

    public function actionSave($pontuacao)
    {
        if(Yii::$app->request->isAjax) {
          if(!Yii::$app->user->isGuest) {
            $jogada = new Jogada;
            $jogada->id_user = Yii::$app->user->id;
            $jogada->pontuacao = $pontuacao;
            $jogada->data_hora = date('Y-M-d H:i:s');
            //$jogada->save();

            if($jogada->save()) {
              return 1;
            } else {
              return 0;
            }
          }
        }
    }

}
