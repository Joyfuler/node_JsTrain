const http = require('http');
const fs = require('fs').promises; // 먼저 fs로 html 파일을 읽는다.

http.createServer(async (req, res) =>{
    try {
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data); // data어디서 옴?? /server2.html에 있는 파일 내용 전체가 data로 들어온다. --> 안에 있는 html 태그 등등이 모두 포함된다.
    } catch (error){
        console.error(error);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(error.message);
    }



}).listen(8081, ()=>{
    console.log('8081번 포트에서 대기중!');
});
// 200 --> 정상적으로 연결됨 300 --> 리다이렉트 400 -> 요청 오류 500 -> 페이지 없거나, 서비스 장애
