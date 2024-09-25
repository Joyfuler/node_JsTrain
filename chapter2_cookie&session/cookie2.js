const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') => // 본래 쿠키 형태는 [name; 'name1'] 형식.
// 이를 ; 기준으로 한번 분리하여 [name = 'name1']로 1차 분리한다.
// =을 다시 한번 분해하여 [name, 'name1'] 형식으로 재차 분해한다.
    cookie.split(';')
    .map(v => v.split('='))
    .reduce((acc, [k,v]) => {
        acc[k.trim()] = decodeURIComponent(v); // 분리한 데이터를 다시 한번 map 형태의 배열로 담는다.
        // 만일 url 인코딩이 되어 있다면 디코드한다.
        return acc;
    },{}); // 객체는 빈 객체를 패러미터로 삼는다.

    http.createServer(async (req, res) => {
        const cookies = parseCookies(req.headers.cookie);
        // login 페이지로 들어왔을 경우, 받은 name 패러미터를 쿠키로 설정한다.
        if (req.url.startsWith('/login')){
            const url = new URL(req.url, 'http://localhost:8084');
            const name = url.searchParams.get('name');
            const expires = new Date();
            // 쿠키 만료 시간은 30분 후로 설정한다.
            expires.setMinutes(expires.getMinutes() + 30);
            res.writeHead(302, {
                Location : '/',
                'Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
            }); // 쿠키에는 아스키 코드만이 들어가야 하므로 공백이나 줄바꿈 등이 들어가지 않도록 주의할것.
            res.end();
        // 다른 곳에도 로그인한 후의 쿠키가 남아있는 상태 (로그인 상태일 때)
        } else if (cookies.name){
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${cookies.name}님 안녕하세요!`);
        } else {
            try {
                const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
                res.writeHead(200,{'Content-Type': 'text/html; charset=utf-8'});
                res.end(data);
            } catch (err){
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end(err.message);
            }
        }        
    }).listen(8084, () => {
        console.log('8084번 포트에서 서버 대기중입니다!');
    });
    