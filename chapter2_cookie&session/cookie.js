const http = require('http');

http.createServer((req, res)=>{
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, {'Set-Cookie': 'mycookie=jangcookie'}); // test 쿠키를 부여
    res.end('Hello, Cookie!');

})
.listen(8083, () =>{
    console.log('8083포트에서 서버 대기 중입니다!');
});