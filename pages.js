
const Discord = require('discord.js')
const client = new Discord.Client()
module.exports.run = async (client, msg, args) => {
    const Embeds = new PaginationEmbed.Embeds()
        .setArray(embeds)
        .setAuthorizedUsers([message.author.id])
        .setChannel(message.channel)
        .setPageIndicator(true)
        .setTitle('Test Title')
        .setDescription('Test Description')
        .setFooter('Test Footer Text')
        .setURL('https://gazmull.github.io/discord-paginationembed')
        .setColor(0xFF00AE)
        // Sets the client's assets to utilise. Available options:
        //  - message: the client's Message object (edits the message instead of sending new one for this instance)
        //  - prompt: custom content for the message sent when prompted to jump to a page
        //      {{user}} is the placeholder for the user mention
        .setClientAssets({ message, prompt: 'Page plz {{user}}' })
        .setDeleteOnTimeout(true)
        .setDisabledNavigationEmojis(['DELETE'])
        .setFunctionEmojis({
            '⬆': (_, instance) => {
                for (const embed of instance.array)
                    embed.fields[0].value++;
            },
            '⬇': (_, instance) => {
                for (const embed of instance.array)
                    embed.fields[0].value--;
            }
        })
        // Listeners for PaginationEmbed's events
        // Upon successfull `build()`
        .on('start', () => console.log('Started!'))
        // Upon a user deleting the embed
        .on('finish', (user) => console.log(`Finished! User: ${user.username}`))
        // Upon a user reacting to the embed
        .on('react', (user, emoji) => console.log(`Reacted! User: ${user.username} | Emoji: ${emoji.name} (${emoji.id})`))
        // Upon the awaiting time expired
        .on('expire', () => console.warn('Expired!'))
        // Upon non-PaginationEmbed error (e.g: Discord API Error)
        .on('error', console.error);

    await Embeds.build();
            })
        })
    })
}
