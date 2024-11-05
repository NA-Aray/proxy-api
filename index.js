const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

// Mengatur proxy untuk semua permintaan ke /proxy
app.use('/api', createProxyMiddleware({
    target: 'https://araymahub.com/api',
    changeOrigin: true,
    secure: false, // Jika SSL di server target tidak valid, gunakan ini
    logLevel: 'debug', // Mengaktifkan log debug
    pathRewrite: {
        '^/api': '', // Menghapus /proxy agar permintaan langsung ke root server target
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error occurred.');
    }
}));

// Mulai server
app.listen(PORT, () => {
    console.log(`Proxy server berjalan di http://localhost:${PORT}`);
});
