const ip = "http://localhost:3000/"

function login(){
	let carnet = document.getElementById("carnet_txt").value
	let pass = document.getElementById("pass_txt").value
	
	if(carnet == "admin"){
		if(pass == "hazard"){
			window.location.href = "Menu.html";
		}else{
			alert('Password incorrecto')
		}
	}else{
		alert('Usuario no existe')
	}
}


function get_report1(){
    let url = ip+"reporte1/?cui="+document.getElementById("carnet_txt").value
    fetch(url, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', full_table_r1(response)));
}


function full_table_r1(data){
    let tbody = document.getElementById("tablaReportes")
    let html = "<TR>\n"
    html += "<TH>El banco</TH> <TH>con DPI</TH> <TH>del banco</TH> <TH>Transfirio a</TH> <TH>con DPI</TH> <TH>del banco</TH> <TH>la cantidad de</TH> <TH>la fecha</TH> \n"
    html += "</TR>\n"
    data.forEach(element => {
        html+= "<TR>\n"
        html+= "<TD>"+element.nombre_1+" "+element.apellido_1+"</TD>\n"
        html+= "<TD>"+element.cui_1+"</TD>\n"
        html+= "<TD>"+element.institucionbancaria_1+"</TD>\n"
        html+= "<TD>"+element.nombre_2+" "+element.apellido_2+"</TD>\n"
        html+= "<TD>"+element.cui_2+"</TD>\n"
        html+= "<TD>"+element.institucionbancaria_2+"</TD>\n"
        html+= "<TD>"+element.montotransferencia+"</TD>\n"
		html+= "<TD>"+element.fechatransferencia+"</TD>\n"
        html+="</TR>\n"
    });
    tbody.innerHTML = html;
    let tserver = document.getElementById("servertxt")
    return "Tabla de info llenada"
}


function get_report2(){
	let banco = document.getElementById("carnet_txt").value.replace("&","%26")
    let url = ip+"reporte2/?banco="+banco
    fetch(url, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', full_table_r1(response)));
}


function get_report3(){
    let url = ip+"reporte3/"
    fetch(url, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', full_table_r3(response)));
}

function full_table_r3(data){
    let tbody = document.getElementById("tablaReportes")
    let html = "<TR>\n"
    html += "<TH>CUI</TH> <TH>Nombre</TH> <TH>Apellido</TH> <TH>Email</TH> <TH>Genero</TH> <TH>Fecha Ingreso</TH>\n"
    html += "</TR>\n"
    data.forEach(element => {
        html+= "<TR>\n"
        html+= "<TD>"+element.cui+"</TD>\n"
        html+= "<TD>"+element.nombre+"</TD>\n"
        html+= "<TD>"+element.apellido+"</TD>\n"
        html+= "<TD>"+element.email+"</TD>\n"
        html+= "<TD>"+element.genero+"</TD>\n"
		html+= "<TD>"+element.fecharegistro+"</TD>\n"
        html+="</TR>\n"
    });
    tbody.innerHTML = html;
    let tserver = document.getElementById("servertxt")
    return "Tabla de info llenada"
}


function get_report4(){
    let url = ip+"reporte4/"
    fetch(url, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', full_table_r4(response)));
}

function full_table_r4(data){
	console.log(data)
    let tbody = document.getElementById("tablaReportes")
    let html = "<TR>\n"
    html += "<TH>Banco</TH> <TH>Abreviatura</TH>\n"
    html += "</TR>\n"
    data.forEach(element => {
        html+= "<TR>\n"
        html+= "<TD>"+element.institucion+"</TD>\n"
        html+= "<TD>"+element.abreviatura+"</TD>\n"
        html+="</TR>\n"
    });
    tbody.innerHTML = html;
    let tserver = document.getElementById("servertxt")
    return "Tabla de info llenada"
}

function get_dpi1(){
	let url = ip+"reporteDPI1/"
    fetch(url, {
        method: 'GET',
        headers:{
            'Accept': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', llenarDrops1(response)));
}

function transaccion(){
	var select1 = document.getElementById("select_dpi1");
	var select2 = document.getElementById("select_dpi2");
	var monto = document.getElementById("monto_txt").value;
	
	var op1 = select1.options[select1.selectedIndex].text
	var op2 = select2.options[select2.selectedIndex].text
	
	var data1 = op1.split(',')
	var data2 = op2.split(',')
	
	let data = {
            cui_1 : data1[0],
            institucionbancaria_1: data1[1],
            tipocuenta_1: data1[2],
            cui_2 : data2[0],
            institucionbancaria_2: data2[1],
            tipocuenta_2: data2[2],
			monto: monto,
        }
        console.log(data)
        let url=ip+"insert"
        fetch(url, {
            method: 'POST',
            query: JSON.stringify(data),
            body: JSON.stringify(data),
            headers:{
                "Content-Type" : "application/json"  
            }
            }).then(res => res.json())
            .catch(error => console.log('Error:', error))
            .then(response => console.log('Success response:', verificar(response)));
}

function verificar(response){
	alert(response)
}


function llenarDrops1(data){       
		array = []
		data.forEach(function(item){ 
			let text = item.cui_1+","+item.institucionbancaria_1+","+item.tipocuenta_1;
			array.push(text)
        });
		
		uniqueArray = array.filter(function(item, pos) {
			return array.indexOf(item) == pos;
		});
		
		var select1 = document.getElementById("select_dpi1");
		
		for(index in uniqueArray) {
			select1.options[select1.options.length] = new Option(uniqueArray[index], index);
		}
		llenarDrops2(uniqueArray)
}

function llenarDrops2(array){
		var select2 = document.getElementById("select_dpi2");
		for(index in uniqueArray) {
			select2.options[select2.options.length] = new Option(uniqueArray[index], index);
		}
}
