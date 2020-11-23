# 2PG Music
Simple music module, built with TypeScript, used by 2PG.

[![Discord](https://img.shields.io/discord/685862664223850497?color=46828d&label=Support&style=for-the-badge)](https://discord.io/twopg)

**Docs** - https://theadamjr.github.io/2pg-music

## Example
`npm i -S 2pg-music discord.js`

**ES6**:
```ts
import { Client } from 'discord.js';
import { MusicClient } from '2pg-music';

const music = new MusicClient();
const bot = new Client();

music.on('trackStart', ({ textChannel }, track) => textChannel?.send(`\`${track.title}\` - **${track.requestor}** started.`));

bot.on('message', async (msg) => {
  if (msg.author.bot) return;
  
  if (msg.content === '.play') {
    const player = getPlayer(msg);
    await player.play('discord bot dashboard intro', { member: msg.member });
  }
});

function getPlayer(msg) {
  return music.get(msg.guild.id)
    ?? music.create({
      voiceChannel: msg.member.voice.channel,
      textChannel: msg.channel
    });
}

bot.login('<your_bot_token>');
```

[![Discord](https://img.shields.io/discord/685862664223850497?color=46828d&label=Support&style=for-the-badge)](https://discord.io/twopg)
