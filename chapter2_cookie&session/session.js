const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') =>
    cookie
        .split(';') // ;로 나눈뒤 해당 내용들을 다시 = 를 경계로 쪼갠다.
        .map( v => v.split('='))
        .reduce((acc, [k,v]) =>{
            acc[k.trim()] = decodeURIComponent(v); // uri가 있는 경우는 복호화 진행.
            return acc;
        }, {});

    const session = {};

    http.createServer(async (req, res) =>{
        const cookies = parseCookies(req.headers.cookie);
        if (req.url.startsWith('/login')){
            const url = new URL(req.url, 'http://localhost:8085');
            const name = url.searchParams.get('name');
            const expires = new Date();
            expires.setMinutes(expires.getMinutes() + 30); // 세션 만료 시간을 30분 후로 설정함.
            const uniqueInt = Date.now(); // 현재의 시간을 나노초까지 반환하여 고유값으로 사용한다.
            session[uniqueInt] = {
                name,
                expires,
            };

            res.writeHead(302,{
                Location : '/',
                'Set-Cookie': `session=${uniqueInt}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,                
            });

            res.end();     
            // 이미 세션이 존재하고, 30분이 지나지 않은 상태 (현재 시간보다 만료 시간의 숫자가 더 크다.)
        } else if (cookies.session && session[cookies.session].expires > new Date()){
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${session[cookies.session].name} 님 안녕하세요`);
        } else {
            try {
                const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
                res.writeHead(200, {'Content-Type': 'text-html; charset=utf-8'});
                res.end(data);
             } catch (err){
                res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
                res.end(err.message);
             }
        }
    })
    .listen(8085, () => {
        console.log('8085번 포트에서 서버 대기 중입니다!');
    });