const http = require('http');

// Render Uptime Portu (Render'ın Kapanmasını Engeller)
http.createServer((req, res) => {
  res.write("Bot aktif!");
  res.end();
}).listen(process.env.PORT || 3000);

const mineflayer = require('mineflayer');

function startBot() {
  const bot = mineflayer.createBot({
    host: 'mc.muzcraft.com',
    username: 'LLoud',
    version: '1.12.2',
    hideErrors: true
  });

  bot.on('kicked', console.log);
  bot.on('error', console.log);

  bot.on('message', (msg) => {
    const m = msg.toString();
    console.log("SUNUCU: " + m);

    if (m.includes('/login') || m.includes('/gir')) {
      bot.chat('/login loudofice');
    }

    if (m.includes('Başarıyla giriş yaptınız') || m.includes('Lobiye bağlandınız')) {
      setTimeout(() => bot.chat('/skyblock'), 5000);
    }

    if (m.includes('SkyBlock') && !m.includes('Sunucusuna bağlanıyorsunuz')) {
      setTimeout(() => bot.chat('/is go'), 10000);
    }
  });

  // Zıplama AFK Engelleyici
  setInterval(() => {
    if (bot.entity) {
      bot.setControlState('jump', true);
      setTimeout(() => bot.setControlState('jump', false), 500);
    }
  }, 15000);

  // Bot oyundan düşerse uygulamayı kapatmaz, 5 saniye sonra TEKRAR BAĞLANIR!
  bot.on('end', () => {
    console.log("Bot oyundan düştü. 5 saniye sonra tekrar bağlanılıyor...");
    setTimeout(startBot, 5000);
  });
}

// Botu Başlat
startBot();
