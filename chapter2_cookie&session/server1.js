const http2 = require('http2'); // http형식으로 서버를 요청함 

http.createSecureServer({ // 보안을 적용하려면 createServer 대신 createSecureSever를 쓰고, require('http2') 로 가져오면 된다.
    cert: fstat.readFileSync('도메인 인증서 경로'),
    key: fstat.readFileSync('도메인 비밀 키 경로'),
    ca: [
        fs.readFileSync('상위 인증서 경로'), // 만일 보안을 강화해야 한다면 https의 인증서를 여러 사이트에서 발급받아 추가해야 안전.
        fs.readFileSync('상위 인증서 경로'),
        ],
    }, (req, res) => {
    res.writeHead(200, { 'Content-Type' : 'text/html; charset=utf-8'}); // 200 메시지는 정상적으로 성공. html형식, utf-8 인코딩. 형식
    res.write('<h1> Hello Node! </h1>');
    res.end('<p> Hello Server!</p>'); // 이하 html 정보를 보내도록 함.
})
    .listen(8080, ()=>{
        console.log('8080포트에서 대기 중입니다!');
    });