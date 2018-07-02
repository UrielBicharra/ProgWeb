<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "jogada".
 *
 * @property int $id
 * @property int $id_user
 * @property int $pontuacao
 * @property string $data_hora
 *
 * @property User $user
 */
class Jogada extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'jogada';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['id_user', 'pontuacao', 'data_hora'], 'required'],
            [['id_user', 'pontuacao'], 'integer'],
            [['id_user'], 'unique'],
            [['id_user'], 'exist', 'skipOnError' => true, 'targetClass' => User::className(), 'targetAttribute' => ['id_user' => 'id']],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'id_user' => 'Usuario',
            'pontuacao' => 'Pontuacao',
            'data_hora' => 'Data',
        ];
    }

    /**
     * @return \yii\db\ActiveQuery
     */
    public function getUser()
    {
        return $this->hasOne(User::className(), ['id' => 'id_user']);
    }
}
