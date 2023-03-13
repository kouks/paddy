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
    name: 'Quack',
  },

  modules: {
    birthdays: {
      dateFormat: 'D MMM',
      serverId: '1083122914808836116',
      roleId: '1084934579439276173',
    },
  },
}
