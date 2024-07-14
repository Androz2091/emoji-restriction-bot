import { Client, GatewayIntentBits } from 'discord.js';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessages
    ]
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);


    // loop over all channels and fetch the last 100 messages
    client.channels.cache.forEach(channel => {
        if (channel.isTextBased()) {
            channel.messages.fetch({ limit: 100, cache: true }).then(() => console.log(`Fetched messages for ${channel.name}`));
        }
    });
});

client.on('messageReactionAdd', async (reaction, user) => {

    const allowed = [
        '😀 😃 😄 😁 😆 😅 😂 🤣 😊 😇 🙂 🙃 😉 😍 🥰 😘 😗 😙 😚 😋 😛 😜 😝 🤗 🤩 🥳 😺 😸 😹',
        '👍 👌 🤞🏻  ✌️ 🫶🏻 🤟🏻  👏 🙌 👐 🤲 🤝',
        '❤️ 💛 💚 💙 💜 🖤 🤍 💖 💗 💓 💕 💞 💟',
        '🌸 🌼 🌻 🌹 🪴 🌿 🍀 🌈',
        '🍎 🍏 🍇 🍉 🍓 🥝 🍍  🍋 🍊 🍒 🍑 🥭 🥥 🍅  🥑 🥦 🥬 🥒 🌽 🌶️ 🫑 🧄 🧅 🥔 🥕',
        '⚔️ 🛡️ 🗡️ 🏹',
        '🏰 🏯 🏛️ ⛪',
        '👑 🧙🏻‍♀️ 🧙🏻‍♂️ 🧝🏻‍♂️ 🧝🏻‍♀️ 🧛🏻‍♂️ 🧛🏻‍♀️ 🦄 🐴 🐉'
    ].map(e => e.split(' ')).flat();

    console.log(allowed, allowed.includes(reaction.emoji.name));

    if (!allowed.includes(reaction.emoji.name)) {
        reaction.users.remove(user);
    }
});

client.login(process.env.TOKEN);
