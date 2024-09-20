const http = require('http');

http.createServer((req, res)=>{
    res.write(200, {'Content-Type': 'text/html, charset=utf-8'});
    res.write('<h1> Hello, Node!</h1>');
    res.end('<p> Hello Server!</p>');
}).listen(8080, () =>{
    console.log('8080포트에서 서버 대기중.');
});

http.createServer((req, res) =>{    
    res.writeHead(200, {'Content-Type': 'text/html, charset=utf-8'});
    res.write('<h1> Hello, Node2!</h1>');
    res.end('<p>Hello Server</p>');

}).listen(8081, ()=>{
    console.log('8081번 포트에서 서버 대기중입니다!');
}); // 기존 8080포트에서 새로운 서버를 하나 더 만든다. (8081)