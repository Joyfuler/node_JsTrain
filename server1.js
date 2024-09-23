const http = require('http'); // http형식으로 서버를 요청함 

http.createServer((req, res) => {
    res.writeHead(200, { 'Content-type' : 'text/html; charset=utf-8'}); // 200 메시지는 정상적으로 성공. html형식, utf-8 인코딩. 형식
    res.write('<h1> Hello Node! </h1>');
    res.end('<p> Hello Server!</p>'); // 이하 html 정보를 보내도록 함.
})
    .listen(8080, ()=>{
        console.log('8080포트에서 대기 중입니다!');
    });