import * as sqlite3 from 'sqlite3'

export default {
  auth: {
    discordToken: process.env.DISCORD_BOT_TOKEN,
  },

  database: {
    filename: String(process.env.DATABASE_FILENAME),
    driver: sqlite3.cached.Database,
  },

  events: {
    message: {
      trigger: process.env.PRIMARY_COMMAND_TRIGGER,
    },
  },

  bot: {
    version: '1.1.1',
    name: 'Wa',
    interactionChannelId: [process.env.INTERACTION_CHANNEL_ID],
  },

  modules: {
    birthdays: {
      dateFormat: 'D MMM',
      serverId: process.env.BIRTHDAYS_SERVER_ID,
      roleId: process.env.BIRTHDAYS_CHANNEL_ID,
    },
  },
}
