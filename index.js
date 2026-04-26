const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// The "Equation": Substitute /proxy with the target website
app.use('/proxy', createProxyMiddleware({
    target: 'https://discord.com', // Change this to the site you want to proxy
    changeOrigin: true,
    pathRewrite: {
        '^/proxy': '', // Removes /proxy from the URL
    },
}));

// Port binding is critical for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy is running on port ${PORT}`);
});




// const socks = require('socksv5');

// const http = require('http');


// const srv = socks.createServer((info, accept, deny) => {

//     console.log(`[SOCKS] Connection to: ${info.dstAddr}`);

//     accept();

// });



// const httpServer = http.createServer((req, res) => {

//     if (req.url === '/' || req.url === '/ping') {

//         console.log(`[Uptime] Ping received at ${new Date().toLocaleTimeString()}`);

//         res.writeHead(200);

//         return res.end('Proxy is Awake');

//     }

//     res.writeHead(404);

//     res.end();

// });



// const PORT = process.env.PORT || 3000;

// httpServer.listen(PORT, () => {

//     console.log(`Hybrid Server running on Port ${PORT}`);

// });



// srv.useAuth(socks.auth.None());
