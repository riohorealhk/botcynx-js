const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: 'kick',
    description: 'kick a member',
    userPermissions: ['KICK_MEMBERS'],
    options: [
        {
            name: 'target',
            description: 'target to kick',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'reason for kick',
            type: 'STRING',
            required: false
        },
    ],
    run: async(client, interaction, args) => {
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') || "no reason provided";
        if(target.roles.highest.position >=
             interaction.member.roles.highest.position
             )
              return interaction.followUp({
            content: "You can't kick this user as their role is higher or equal to yours",
        });

        target.send(
            `You have been kicked from ${interaction.guild.name}, reason: ${reason}`
        );

        
        target.kick(reason);

        interaction.followUp({ content: `Kicked ${target.user.tag} successfully! reason: ${reason}`});
    },
}