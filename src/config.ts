import { Method, Awi } from 'awi'

export default {
  auth: {
    discordToken: process.env.DISCORD_BOT_TOKEN,
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
    joinables: {
      channelId: '665704335933571082',
      rules: [
        {
          mapping: {
            // Polymer
            '<:PepePoly:682479924430241803>': '653049352633319484',
            // Nano
            '<:shpoar:653059542850207804>': '653049466718519296',
          },
          messageId: '708795739337261227',
        },
        {
          mapping: {
            // Eidolons
            '<:PeepoMissGize:705740896628506644>': '653249413472452608',
            // PT
            '<:MonkaOrb:708795374063583353>': '650787008863666186',
            // Arbies
            '<:PeepoLovesVitus:704091692940132464>': '696411016052867224',
            // Conclave
            '<:PeepoLoveLex:708795302232064110>': '700091897473138829',
          },
          messageId: '708795740511797298',
        },
      ],
    },

    rivens: {
      rivenGradingApiClient: (imageUrl: string, rank: number) =>
        new Awi()
          .use(async (req) => (req.base = `${process.env.API_GATEWAY_URL}/rivens/grade`))
          .use(async (req) => (req.body = { imageUrl, rank }))
          .use(async (req) => (req.method = Method.POST)),

      weaponInfoApiClient: (weaponName: string) =>
        new Awi()
          .use(async (req) => (req.base = `${process.env.API_GATEWAY_URL}/rivens/disposition`))
          .use(async (req) => (req.body = { weaponName }))
          .use(async (req) => (req.method = Method.POST)),
    },

    birthdays: {
      dateFormat: 'D MMM',
    },
  },
}
