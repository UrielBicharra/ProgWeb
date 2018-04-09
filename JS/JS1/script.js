function tableCreate(){
	var body = document.body;
	var tbl = document.createElement('table');
	tbl.style.width  = '100px';
	tbl.style.border = '1px solid black';

	var thead = tbl.createTHead();
	var trH = thead.insertRow();
	var tdH = trH.insertCell();
	tdH.appendChild(document.createTextNode("Produtos de " + num));
	tdH.style.border = '1px solid black';
	tdH.setAttribute('colSpan','2');

	var tbody = tbl.createTBody();


	for(var i = 1; i <= 10; i++){
        var tr = tbody.insertRow();
        for(var j = 0; j < 2; j++){
            var td = tr.insertCell();
			if(j == 0){
				td.appendChild(document.createTextNode(""+ num + "x" + i));
			} else {
            td.appendChild(document.createTextNode("" + (num * i)));
			}
			td.style.border = '1px solid black';
        }
    }
    body.appendChild(tbl);
}

var num = 1;
while (num <= 10) {
	tableCreate();
	num++;
}
