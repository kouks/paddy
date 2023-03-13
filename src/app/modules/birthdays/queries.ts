import { openDatabase } from 'database'

export const saveBirthdayToDatabase = async (memberId: string, day: number, month: number) => {
  const db = await openDatabase()

  await db.run(`DELETE FROM birthdays WHERE memberId=:memberId`, {
    ':memberId': memberId,
  })

  await db.run(
    `
      INSERT INTO birthdays
        (
          memberId,
          day,
          month
        )
      VALUES
        (
          :memberId,
          :day,
          :month
        )
    `,
    {
      ':memberId': memberId,
      ':day': day,
      ':month': month,
    }
  )
}

export const getBirthdaysForDay = async (day: number, month: number) => {
  const db = await openDatabase()

  const members = await db.all<{ memberId: string }[]>(
    `
      SELECT memberId
      FROM birthdays
      WHERE birthdays.day = :day AND birthdays.month = :month
    `,
    {
      ':day': day,
      ':month': month,
    }
  )

  return members
}
