(function () {

   const FPS = 50;
   const TAMX = 600;
   const TAMY = 500;
   const PROB_ARVORE = 2;
   const PROB_ARBUSTO = 3;
   const PROB_ROCHA = 1;
   const PROB_TOCO = 2;
   const PROB_COGUMELO = 1;
   const TURBO = 3;
   var pontuacao = 0;
   var tropecando = false;
   var gameLoop;
   var montanha;
   var scoreboard;
   var theEnd;
   var skier;
   var direcoes = ['para-esquerda','para-frente','para-direita','caindo'];
   var classNames = ['arvore','toco','rocha','arbusto','cogumelo'];
   var yetiAnimation = ['yeti-esquerda','yeti-frente','yeti-direita','yeti-anim-I','yeti-anim-II','yeti-anim-III','yeti-anim-IV','yeti-anim-V'];
   var objetos = [];
   var speed = 2;
   var turboState = false;
   var colidindo= false;
   var contadorGracePeriod= 0;
   var vidas = 3;

   function init () {
      montanha = new Montanha();
      skier = new Skier();
      scoreboard = new ScoreBoard();
      gameLoop = setInterval(run, 1000/FPS);
   }

   window.addEventListener('keydown', function (e) {
      if (e.key == 'a') {
        skier.mudarDirecao(-1);
      }
      else if (e.key == 'd') {
        skier.mudarDirecao(1);
      }
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
     var pts = "-> Pontuação:   ";
     var lifes = "-> Vidas:     ";
     this.element = document.getElementById("score");
     this.element.style.left = (TAMX + 5) + "px";
     this.element.style.top = "-" + Math.floor(TAMY/2) + "px";

     this.element.innerHTML = pts + "<br>" + lifes;

     this.contarPontos = function () {
        this.element.innerHTML = pts + pontuacao + "<br>" + lifes + vidas;
     };
   }

   function GameOver () {
     this.element = document.createElement('div');
     montanha.element.appendChild(this.element);
     this.element.className = "end";
     this.element.style.top = Math.floor(TAMY/2) + "px";
     this.element.style.left = (Math.floor(TAMX/2) - 50) + "px";
     this.element.style.zIndex = 5;
     this.element.style.width = "100px";

     this.element.innerHTML = "GAME OVER"

   }
   function Skier() {

      this.element = document.getElementById("skier");
      this.direcao = 1; //0-esquerda;1-frente;2-direita
      this.element.className = 'para-frente';
      this.element.style.top = '100px';
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
		} else if (this.direcao == 2 && (parseInt(this.element.style.left) <= TAMX - 20)) {
            this.element.style.left = (parseInt(this.element.style.left)+speed) + "px";
		} else {
		}
      }

	  this.AnimarColisao = function () {
		  contadorGracePeriod++;
		  this.element.className = direcoes[3];
		  if(contadorGracePeriod > FPS) speed = 0;
		  if(contadorGracePeriod > FPS*3) {
			  this.element.className = direcoes[1];
			  speed = 2;
			  contadorGracePeriod = 0;
			  colidindo = false;
		  }
	  }
   }

   function Objeto(classe) {
	   this.podeColidir = true;
     this.element = document.createElement('div');
     montanha.element.appendChild(this.element);
     this.element.className = classNames[classe];
     this.element.style.top = TAMY + "px";
     this.element.style.left = Math.floor(Math.random() * TAMX) + "px";

     this.subir = function () {
         this.element.style.top = (parseInt(this.element.style.top)-speed) + "px";
     };
	   this.colidir = function () {
    		 var objTop = parseInt(this.element.style.top);
    		 var objRight = parseInt(this.element.style.left) + Math.floor(parseInt(window.getComputedStyle(this.element).getPropertyValue('width')));
    		 var objBot = parseInt(this.element.style.top) + Math.floor(parseInt(window.getComputedStyle(this.element).getPropertyValue('height')));
    		 var objLeft = parseInt(this.element.style.left);
    		 var skiTop = parseInt(skier.element.style.top);
    		 var skiBot = parseInt(skier.element.style.top) + Math.floor(parseInt(window.getComputedStyle(skier.element).getPropertyValue('height')));
    		 var skiLeft = parseInt(skier.element.style.left);
    		 var skiRight = parseInt(skier.element.style.left) + Math.floor(parseInt(window.getComputedStyle(skier.element).getPropertyValue('width')));

         if(this.podeColidir && !colidindo && !(skiBot < objTop || skiTop > objBot || skiLeft > objRight || skiRight < objLeft))
         {
           if(this.element.className == classNames[4]) {
             vidas++;
             this.podeColidir = false;
           } else {
           this.podeColidir = false;
    			 colidindo = true;
           vidas--;
           }
    		 }
	   };
   }

   function run () {
      var random = Math.floor(Math.random() * 2000);
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
      });
	  objetos.forEach(function (a) {
		 a.colidir();
	  });
    objetos.forEach(function (a) {
      if(parseInt(a.element.style.top) < 0) {
        montanha.element.removeChild(a.element);
        var index = objetos.indexOf(a);
        objetos.splice(index,1);
      }
    });
    if(vidas <= 0) {
      clearInterval(gameLoop);
      theEnd = new GameOver();
    }
    scoreboard.contarPontos();
    if(!colidindo) pontuacao++;
	  if(colidindo) skier.AnimarColisao();
      skier.andar();
   }
//qualquer coisa a ser feita antes de iniciar o jogo deve ir aqui
   init();

})();
