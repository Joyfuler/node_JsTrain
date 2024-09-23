const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const users = {};

http.createServer(async (req,res)=> {
    try {
        console.log(req.method, req.url);
        if (req.method === 'GET'){
            if (req.url === '/'){ // 만일 넘어온 form의 method가 get인 경우는 / 뒤의 패러미터 값을 불러 처리한다. 기본 페이지의 경우
                const data = await fs.readFile(path.join(__dirname, 'restFront.html'));
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/about'){ // about 페이지의 경우
                const data = await fs.readFile(path.join(__dirname, 'about.html'));
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/users'){
                res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            // home / about 모두 아닌 경우
            try {
                const data = await fs.readFile(path.join(__dirname, req.url));
                return res.end(data);
            } catch (err){
                console.error(err); // 해당 페이지를 찾을 수 없습니다.
            }
        } else if (req.method === 'POST'){
            if (req.url === '/user'){
                let body = '';
                req.on ('data', (data) =>{
                    body += data;
                });

                return req.on('end', () =>{
                    console.log('POST 본문(Body):', body);
                    const {name} = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name; 
                    res.writeHead(201, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end('등록 성공');
                });
            }
        } else if (req.method ==='PUT'){
            if (req.url.startsWith('/user/')){
                const key = req.url.split('/')[2]; // /로 자른 후 두번째.user 뒤의 주소를 key로 대입한다.
                let body = '';
                req.on('data', (data) =>{
                    body += data;
                });
            
                return req.on('end', ()=>{
                    console.log('PUT 본문(Body):', body);
                    users[key] = JSON.parse(body).name;
                    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf-8'});
                    return res.end(JSON.stringify(users));
                });
            }
        } else if (req.method === 'DELETE'){
            if (req.url.startsWith('/user/')){
                const key = req.url.split('/')[2];
                delete users[key];
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
        }    
        
        res.writeHead(404);
        return res.end('NOT FOUND');   
    } catch (err){
        console.error(err);
        res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8082, () => {
    console.log('8082 서버에서 대기중.');
});