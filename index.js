const mineflayer = require('mineflayer')
const http = require('http'); // Render/Uptime için eklendi

// --- RENDER & UPTIME İÇİN WEB SUNUCUSU ---
// Render uygulamanın bir portu dinlemesini bekler. Uptime botları buraya ping atar.
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Bot aktif ve calisiyor!');
}).listen(PORT, () => {
  console.log(`Render/Uptime icin web sunucusu ${PORT} portunda baslatildi.`);
});
// -----------------------------------------

const bot = mineflayer.createBot({
  host: 'mc.muzcraft.com',
  username: 'LLoud',
  version: '1.12.2',
  hideErrors: true
});

// CHUNK YAZILARINI SUSTURAN GÜVENLİ YOL
bot.on('kicked', console.log)
bot.on('error', console.log)

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

setInterval(() => {
  if (bot.entity) {
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500);
  }
}, 15000);

bot.on('end', () => setTimeout(() => process.exit(), 5000));
