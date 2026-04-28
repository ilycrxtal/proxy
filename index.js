const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// 1. The Logger Middleware (The "Step 1")
app.use((req, res, next) => {
    const d = {
        time: new Date().toISOString(),
        method: req.method,
        url: req.url,
        headers: req.headers, // This shows the User-Agent and Auth tokens
        ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress
    };

    console.log("--- New Request ---");
    console.log(JSON.stringify(d, null, 2));
    console.log("-------------------");
    
    next(); // This "Passes the Ball" to the next function
});

// 2. Your Proxy Function
app.use('/discord', createProxyMiddleware({
    target: 'https://discord.com',
    changeOrigin: true,
    pathRewrite: { '^/discord': '' },
}));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy active on port ${PORT}`));
