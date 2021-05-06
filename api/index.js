var express = require('express');
var app = express();
const ip = "localhost"
const port = 3000

const bodyParser = require('body-parser');
app.use(bodyParser.json())

const cassandra = require('cassandra-driver');

const client = new cassandra.Client({
  contactPoints: ['127.0.0.1'],
  localDataCenter: 'datacenter1'
});

app.get('/reporteDPI1',(req,res)=>{
	const query = 'SELECT * FROM Practica3.Operacion_Cuentahabiente;';
	client.execute(query)
	  .then(result => res.send(result.rows));
});

app.get('/reporte1',(req,res)=>{
	let ext = req.query.cui
	const query = 'SELECT * FROM Practica3.Operacion_Cuentahabiente WHERE CUI_1 = '+ext+' ALLOW FILTERING;;';
	client.execute(query)
	  .then(result => res.send(result.rows));
});


app.get('/reporte2',(req,res)=>{
	let ext = req.query.banco
	const query = "SELECT * FROM Practica3.Operacion_Institucion WHERE InstitucionBancaria_1 = '"+ext+"' ALLOW FILTERING;";
	console.log(query)
	client.execute(query)
	  .then(result => res.send(result.rows));
});

app.get('/reporte3',(req,res)=>{
	const query = 'SELECT * FROM Practica3.Cuentahabiente;';
	client.execute(query)
	  .then(result => res.send(result.rows));
});

app.get('/reporte4',(req,res)=>{
	const query = 'SELECT * FROM Practica3.Banco;';
	client.execute(query)
	  .then(result => res.send(result.rows));
});

app.post('/insert',(req,res)=>{
	const query = "SELECT * FROM Practica3.Operacion_Cuentahabiente WHERE CUI_1 = "+req.body.cui_1+" AND institucionbancaria_1 = '"+req.body.institucionbancaria_1+"'  AND  tipocuenta_1= '"+req.body.tipocuenta_1+"' ALLOW FILTERING;";
	client.execute(query)
	  .then(function(result){
		  const query2 = "SELECT * FROM Practica3.Operacion_Cuentahabiente WHERE CUI_1 = "+req.body.cui_2+" AND institucionbancaria_1 = '"+req.body.institucionbancaria_2+"'  AND  tipocuenta_1= '"+req.body.tipocuenta_2+"' ALLOW FILTERING;";
		  client.execute(query2)
		  .then(function(result2){
				const queries = [
				{
					query: 'INSERT INTO Practica3.Operacion_Cuentahabiente (fechatransferencia,cui_1, nombre_1, abreviacioninst_1, tipocuenta_1, abreviacioninst_2, apellido_1, apellido_2,cui_2, email_1, email_2,fecharegistro_1,fecharegistro_2,genero_1,genero_2,institucionbancaria_1,institucionbancaria_2,montotransferencia,nombre_2,saldoinicial_1,saldoinicial_2,tipocuenta_2)'+
					' VALUES (dateof(now()),?,?, ?, ?, ?, ?, ?, ?,?, ?,?,?,?,?,?,?,?,?,?,?,?);',
					params: [ 
					result.rows[0].cui_1, 
					result.rows[0].nombre_1,
					result.rows[0].abreviacioninst_1,
					result.rows[0].tipocuenta_1,
					result2.rows[0].abreviacioninst_2,
					result.rows[0].apellido_1,
					result2.rows[0].apellido_2,
					result2.rows[0].cui_2,
					result.rows[0].email_1,
					result2.rows[0].email_2,
					result.rows[0].fecharegistro_1,
					result2.rows[0].fecharegistro_2,
					result.rows[0].genero_1,
					result2.rows[0].genero_2,
					result.rows[0].institucionbancaria_1,
					result2.rows[0].institucionbancaria_2,
					req.body.monto,
					result2.rows[0].nombre_2,
					result.rows[0].saldoinicial_1,
					result2.rows[0].saldoinicial_2,
					result2.rows[0].tipocuenta_2 ]
				},
				{
					query: 'INSERT INTO Practica3.Operacion_Institucion (fechatransferencia,cui_1, nombre_1, abreviacioninst_1, tipocuenta_1, abreviacioninst_2, apellido_1, apellido_2,cui_2, email_1, email_2,fecharegistro_1,fecharegistro_2,genero_1,genero_2,institucionbancaria_1,institucionbancaria_2,montotransferencia,nombre_2,saldoinicial_1,saldoinicial_2,tipocuenta_2)'+
					' VALUES (dateof(now()),?,?, ?, ?, ?, ?, ?, ?,?, ?,?,?,?,?,?,?,?,?,?,?,?);',
					params: [ 
					result.rows[0].cui_1, 
					result.rows[0].nombre_1,
					result.rows[0].abreviacioninst_1,
					result.rows[0].tipocuenta_1,
					result2.rows[0].abreviacioninst_2,
					result.rows[0].apellido_1,
					result2.rows[0].apellido_2,
					result2.rows[0].cui_2,
					result.rows[0].email_1,
					result2.rows[0].email_2,
					result.rows[0].fecharegistro_1,
					result2.rows[0].fecharegistro_2,
					result.rows[0].genero_1,
					result2.rows[0].genero_2,
					result.rows[0].institucionbancaria_1,
					result2.rows[0].institucionbancaria_2,
					req.body.monto,
					result2.rows[0].nombre_2,
					result.rows[0].saldoinicial_1,
					result2.rows[0].saldoinicial_2,
					result2.rows[0].tipocuenta_2 ]
				}
				];
			  
				client.batch(queries, { prepare: true })
					.then(function() {
						res.send({message: 0}) 
					});
			});
		});
});


app.listen(port,ip, () => {
    console.log('Se escucha en el puerto: %d y con la ip: %s',port,ip);
});