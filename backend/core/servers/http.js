/******************************************
*             Homeboard Server
*          M-Dev - Romain Meunier
******************************************/


"use strict"; 
const path      = require('path');
const http      = require('http');
const express   = require('express'); 
const app       = express();

var server;  
const PORT = 3210;
const BACKEND_PREFIX = '/backend';
console.log('[Homeboard] [HTTPServer] Starting ...')


//-------------------------------
//--  Express App
//-------------------------------
app.set('port', PORT);


app.get( BACKEND_PREFIX + '/', (req, res) => { 
  res.send('Hello World')
});


//-- expose dist folder
app.use(express.static(path.join(__dirname, '../dist')));

//-------------------------------
//--  HTTP errors
//-------------------------------

//--SHOULD BE LAST
app.use((req, res, next)=>{ 
  res.end('Not found');//-- todo build error page
});      
app.use((error, req, res, next)=>{ 
  res.end(error.message);
  console.error('[Homeboard] [HTTPServer] Error: ', error)
});      



//-------------------------------
//--  HTTP Server
//-------------------------------
server = http.createServer(app);
server.listen(PORT);



//-------------------------------
//-- Server Error handler
//-------------------------------

server.on('error', (error)=>{
  console.error('[Homeboard] [HTTPServer] Error', error);
});

server.on('listening', ()=> {
  let add         = server.address();  
  console.info('[Homeboard] [HTTPServer] Started',  add.family +": "+ add.address+"=>"+ PORT)
});

server.on('close', ()=> {
  console.warn('[Homeboard] [HTTPServer] Closed');
});
//-------------------------------




module.exports = server;//export server var after strating