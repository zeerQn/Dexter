const http = require('http');

// Render Uptime Portu
http.createServer((req, res) => {
  res.write("Bot aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'mc.muzcraft.com',
    username: 'LLoud',
    version: '1.8.9', // Muzcraft lobileri için en kararlı sürüm
    hideErrors: false  // Hataları loglarda görmek için false yaptık
  });

  bot.on('login', () => {
    console.log('[BOT] Sunucuya bağlantı sağlandı!');
  });

  bot.on('kicked', (reason) => {
    console.log('[BOT] Sunucudan atıldı:', reason);
  });

  bot.on('error', (err) => {
    console.log('[BOT] Bağlantı Hatası:', err);
  });

  bot.on('message', (msg) => {
    const rawMsg = msg.toString();
    // Renk kodlarını temizleyip küçük harfe çeviriyoruz
    const cleanMsg = msg.toAnsi().replace(/\x1b\[[0-9;]*m/g, '').toLowerCase();

    console.log("SUNUCU: " + rawMsg);

    if (cleanMsg.includes('/login') || cleanMsg.includes('/gir') || cleanMsg.includes('sifre')) {
      bot.chat('/login loudofice');
    }

    if (cleanMsg.includes('başarıyla giriş') || cleanMsg.includes('lobiye bağlandınız')) {
      setTimeout(() => bot.chat('/skyblock'), 5000);
    }

    if (cleanMsg.includes('skyblock') && !cleanMsg.includes('sunucusuna bağlanıyorsunuz')) {
      setTimeout(() => bot.chat('/is go'), 10000);
    }
  });

  // Zıplama AFK Engelleyici
  setInterval(() => {
    if (bot && bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 15000);

  // Yeniden Bağlanma Logic'i
  bot.on('end', () => {
    console.log("Bot oyundan düştü. 5 saniye sonra tekrar bağlanılıyor...");
    setTimeout(startBot, 5000);
  });
}

// Botu Başlat
startBot();
