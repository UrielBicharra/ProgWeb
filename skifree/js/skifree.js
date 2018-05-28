(function () {

   const FPS = 50;
   const TAMX = 300;
   const TAMY = 400;
   const PROB_ARVORE = 3;
   const PROB_ARBUSTO = 4;
   const PROB_ROCHA = 2;
   const PROB_TOCO = 3;
   const PROB_COGUMELO = 1;
   const TURBO = 3;
   var pontuação = 0;
   var tropecando = false;
   var gameLoop;
   var montanha;
   var scoreboard;
   var skier;
   var direcoes = ['para-esquerda','para-frente','para-direita'];
   var classNames = ['arvore','toco','rocha','arbusto','cogumelo'];
   var objetos = [];
   var speed = 2;
   var turboState = false;
   var colisions = 0;

   function init () {
      montanha = new Montanha();
      skier = new Skier();
      scoreboard = new ScoreBoard();
      gameLoop = setInterval(run, 1000/FPS);
   }

   window.addEventListener('keydown', function (e) {
      if (e.key == 'a') skier.mudarDirecao(-1);
      else if (e.key == 'd') skier.mudarDirecao(1);
   });

   window.addEventListener('keydown', function (e) {
     if(e.key == 'f' && turboState == false) {
       speed *= TURBO;
       turboState = true;
     }
   });
   window.addEventListener('keyup',function(e) {
     if(e.key == 'f') {
       speed /= TURBO;
       turboState = false;
     }
   });

   function Montanha () {
      this.element = document.getElementById("montanha");
      this.element.style.width = TAMX + "px";
      this.element.style.height = TAMY + "px";
   }

   function ScoreBoard () {
     var col = "Colisões";
     this.element = document.getElementById("score");
     this.element.style.left = TAMX + "px";

     this.element.innerHTML = col;

     this.contarPontos = function () {
        this.element.innerHTML = col + colisions;
     };
   }

   function Skier() {

      this.element = document.getElementById("skier");
      this.direcao = 1; //0-esquerda;1-frente;2-direita
      this.element.className = 'para-frente';
      this.element.style.top = '30px';
      this.element.style.left = parseInt(TAMX/2)-7 + 'px';

      this.mudarDirecao = function (giro) {
         if (this.direcao + giro >=0 && this.direcao + giro <=2) {
            this.direcao += giro;
            this.element.className = direcoes[this.direcao];
         }
      }

      this.andar = function () {
         if (this.direcao == 0 && (parseInt(this.element.style.left) >= 0)) {
            this.element.style.left = (parseInt(this.element.style.left)-speed) + "px";
         }
         if (this.direcao == 2 && (parseInt(this.element.style.left) <= TAMX - 20)) {//width of current skier image
            this.element.style.left = (parseInt(this.element.style.left)+speed) + "px";
         }
      }
   }

   function Objeto(classe) {
     var colide = true;//se o objeto pode causar uma colisão
     this.element = document.createElement('div');
     montanha.element.appendChild(this.element);
     this.element.className = classNames[classe];
     this.element.style.top = TAMY + "px";
     this.element.style.left = Math.floor(Math.random() * TAMX) + "px";

     this.subir = function () {
         this.element.style.top = (parseInt(this.element.style.top)-speed) + "px";
     };

     this.colidir = function () {
       //checa a posição do skiador, se bater, gera colisão
       var skierRight = parseInt(skier.element.style.left) + parseInt(skier.element.style.width);
       var skierLeft = parseInt(skier.element.style.left);
       var skierBottom = parseInt(skier.element.style.top) + parseInt(skier.element.style.height);
       var objectRight = parseInt(this.element.style.left) + parseInt(this.element.style.width);
       var objectLeft = parseInt(this.element.style.left);
       var objectTop = parseInt(this.element.style.top);

       if(colide && ((objectTop <= skierBottom) || (objectLeft <= skierRight) || (skierLeft <= objectRight))) {
         colisions++;
         colide = false;
       }
     };
   }
   function run () {
      var random = Math.floor(Math.random() * 10000);
      if (random <= PROB_ARVORE*10) {
         var arvore = new Objeto(0);
         objetos.push(arvore);
      }
      if (random <= PROB_TOCO*10) {
         var toco = new Objeto(1);
         objetos.push(toco);
      }
      if (random <= PROB_ROCHA*10) {
         var rocha = new Objeto(2);
         objetos.push(rocha);
      }
      if (random <= PROB_ARBUSTO*10) {
         var arbusto = new Objeto(3);
         objetos.push(arbusto);
      }
      if (random <= PROB_COGUMELO* 10) {
         var cogumelo = new Objeto(4);
         objetos.push(cogumelo);
      }

      objetos.forEach(function (a) {
          a.subir();
          a.colidir();
      });
      scoreboard.contarPontos();
      pontuação++;
      skier.andar();
   }
//qualquer coisa a ser feita antes de iniciar o jogo deve ir aqui
   init();

})();
