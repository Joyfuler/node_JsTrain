const http = require('http');

const server = http.createServer((req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html; charset:utf-8'});
    res.write('<h1>Hello, Node!</h1>');
    res.end('<p> Hello, Server</p>');

}).listen(8080);

server.on('listening', () =>{
    console.log('8080포트 대기 중!');
    console.log(a);
});

server.on('error', (error) =>{
    console.error(error);
});