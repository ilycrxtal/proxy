const socks = require('socksv5');

const http = require('http');


const srv = socks.createServer((info, accept, deny) => {

    console.log(`[SOCKS] Connection to: ${info.dstAddr}`);

    accept();

});



const httpServer = http.createServer((req, res) => {

    if (req.url === '/' || req.url === '/ping') {

        console.log(`[Uptime] Ping received at ${new Date().toLocaleTimeString()}`);

        res.writeHead(200);

        return res.end('Proxy is Awake');

    }

    res.writeHead(404);

    res.end();

});



const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {

    console.log(`Hybrid Server running on Port ${PORT}`);

});



srv.useAuth(socks.auth.None());