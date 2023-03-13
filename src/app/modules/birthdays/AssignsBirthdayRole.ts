import { Client } from 'discord.js'
import { Autowired, Param } from '@exteranto/core'
import * as dayjs from 'dayjs'
import { getBirthdaysForDay } from './queries'
import { Cron } from 'scheduler-ts'

export class AssignsBirthdayRole {
  @Param('app.modules.birthdays.roleId')
  private static roleId: string

  @Param('app.modules.birthdays.serverId')
  private static serverId: string

  @Autowired
  private static discord: Client

  @Cron('*/5 * * * * *')
  public static async handle(): Promise<void> {
    const today = dayjs()
    const [day, month] = [today.date(), today.month()]
    const server = this.discord.guilds.cache.get(this.serverId)

    // All birthdays that are today.
    const birthdays = await getBirthdaysForDay(day, month)

    // Remove role from members that no longer have birthday.
    const membersWithRole = server.roles.cache.get(this.roleId).members

    const membersToRemove = membersWithRole.filter(
      ({ user }) => !birthdays.some(({ memberId }) => memberId === user.id)
    )

    await Promise.all(membersToRemove.map(async (member) => member.roles.remove(this.roleId)))

    // Assign role to each member unless they already have it.
    await Promise.all(
      birthdays.map(async ({ memberId }) => {
        const member = server.members.cache.get(memberId)

        if (member.roles.cache.some(({ id }) => id === this.roleId)) {
          return
        }

        return member.roles.add(this.roleId)
      })
    )
  }
}
