import { Client, TextChannel } from 'discord.js';
import { MusicClient, Player, Track } from '../src/music/client';

const bot = new Client();
const music = new MusicClient();

music.on('trackStart', (player: Player, track: Track) => player.textChannel.send(`**${track.title}** started.`));
music.on('queueEnd', (player: Player) => player.textChannel.send(`Queue has ended.`));

bot.on('message', async (msg) => {
  if (msg.author.bot) return;

  let player = music.players.get(msg.guild.id);
  if (!player)
    player = music.create(msg.guild.id, {
      textChannel: msg.channel as TextChannel,
      voiceChannel: msg.member.voice.channel
    });

  try {
    if (msg.content.startsWith('.play ')) {
      const query = msg.content.split('.play ')[1];
      const track = await player.play(query);

      msg.channel.send(`**${track.title}** added to queue.`);
    }
    else if (msg.content === '.stop')
      await player.stop();
    else if (msg.content === '.q') {
      const details = player.q.items
        .map(track => track.title)
        .join('\n');
      
      msg.channel.send(`**Queue**:\n` + details);
    }
    else if (msg.content === '.skip')
      await player.skip();
  } catch (error) {
    msg.reply(error?.message);
  }
});

bot.on('ready', () => console.log('Bot logged in!'))

bot.login('<your_bot_token>');