const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length; // 이 컴퓨터의 코어 갯수를 가져온다.

if (cluster.isMaster){
    console.log(`마스터 프로세스 아이디: ${process.pid}`);

    for (let i=0; i< numCPUs; i++){
        cluster.fork(); // 멀티 스레드처럼, 코어를 여러 곳에서 사용할 수 있도록 fork() 사용.
    }
    // 에러 처리를 대비하여 클러스터링을 적용한다.
    cluster.on('exit', (worker, code, signal) =>{
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code', code, 'signal', signal);
        cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write('<h1> Hello, Node! </h1>');
        res.end('<p> Hello, Cluster! </p>');  
        setTimeOut(() =>{
            process.exit(1);
        }, 1000); // 1초마다 종료하여 다음 워커를 혹인한다.      
    }).listen(8086); // 8086포트에서 실행할 수 있도록 하고 서버를 생성. 
    
    console.log(`${process.pid}번 워커 실행`);
}