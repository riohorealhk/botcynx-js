const { Command } = require('reconlx');
const fs = require('fs');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = new Command ({
    name:'setup-ticket',
    description: 'used to setup a ticket system',
    userPermissions: ['ADMINISTRATOR'],
    devonly: true,
    options: [
        {
            name: 'channel',
            description: 'the channel where the ticket system will be based in',
            required: true,
            type: 'CHANNEL',
            channelTypes: ['GUILD_TEXT'],
        },
        {
            name: 'config-name',
            description: 'the name the config will be refered to in the commands',
            required: true,
            type: 'STRING',
        },
        {
            name: 'welcome-message',
            description: 'the message that will be displayed when creating a new ticket',
            required: true,
            type: 'STRING',
        },
        {
            name: 'description',
            description: 'the description that will be shown above the create ticket button',
            required: false,
            type: 'STRING'
        }
    ],

    run: async ({interaction}) => {

        const guildId = interaction.guild.id;
        const setupchannel = interaction.options.getChannel('channel');
        const name = interaction.options.getString('config-name');
        const welcome = interaction.options.getString('welcome-message');
        const welcomebutton = interaction.options.getString('description');
        const filepath = `guild-only/${guildId}/`;
        const filename = `${name}.json`;
        const author = interaction.user.id

        try {
            const buttonrow = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setCustomId(`${name}`)
                        .setLabel('create ticket')
                        .setStyle('SUCCESS')
                );

                const embed = new MessageEmbed()
                .setColor(`#69696E`)
                .setDescription(`${welcomebutton || "press create to enter in contact with staff members"}`)

                let sent = await setupchannel.send({embeds: [embed], components: [buttonrow]}).then(() => interaction.followUp(`success, successfully created a new ticket system in ${setupchannel}`)).catch(() => interaction.followUp({content: "I don't have permission to send a message in the specified channel", ephemeral: true}))

            

            const fullitem = `{
                "channel": "${setupchannel.id}",
                "name": "${name}",
                "welcomemessage": "${welcome}",
                "blocked":[""],
                "linkedmessage": "${sent.id}"
            }`


            fs.writeFileSync(`${filepath}${filename}`, `${fullitem}`, (err) => {
                if (err) {
                    console.log(err)
                    interaction.followUp({content: "config file already exists"}).catch(() => console.log(`I don't have permission to send a message in ${channel} in ${guild.name}`))
                }
            
                console.log("file was successfully created at specified path")
            })
            
            
            }catch (err) {
                console.log(err)
            }
    }
})