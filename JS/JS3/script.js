var someFn;
(function () {
	var soma = 0;
	someFn = function(x) {
		soma = soma + x;
		return soma;
	};
})();

var add = someFn(1);
add = someFn(3);
//document.writeln(add);
console.log('Primeira chamada',add);
add = someFn(1);
//document.writeln(add);
console.log('Segunda chamada',add);
add = someFn(5);
//document.writeln(add);
console.log('Terceira chamada',add);
