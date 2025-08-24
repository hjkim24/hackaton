import { Days, Gender, PrismaClient, User } from '@prisma/client'
import { hash } from 'argon2'

const prisma = new PrismaClient()

async function main() {
  // -------------------------
  // 1️⃣ Users (20명)
  // -------------------------
  const users: Omit<User, 'id'>[] = [
    // 기존 10명
    {
      username: 'user1',
      password: await hash('pass1'),
      nickname: 'nick1',
      name: 'Alice',
      gender: Gender.female,
      college: 'Engineering',
      major: 'CS',
      admissionYear: 2021,
      age: 22
    },
    {
      username: 'user2',
      password: await hash('pass2'),
      nickname: 'nick2',
      name: 'Bob',
      gender: Gender.male,
      college: 'Engineering',
      major: 'Mechanical',
      admissionYear: 2020,
      age: 23
    },
    {
      username: 'user3',
      password: await hash('pass3'),
      nickname: 'nick3',
      name: 'Charlie',
      gender: Gender.male,
      college: 'Business',
      major: 'Finance',
      admissionYear: 2022,
      age: 21
    },
    {
      username: 'user4',
      password: await hash('pass4'),
      nickname: 'nick4',
      name: 'Diana',
      gender: Gender.female,
      college: 'Arts',
      major: 'Design',
      admissionYear: 2019,
      age: 24
    },
    {
      username: 'user5',
      password: await hash('pass5'),
      nickname: 'nick5',
      name: 'Eve',
      gender: Gender.female,
      college: 'Engineering',
      major: 'Electrical',
      admissionYear: 2021,
      age: 22
    },
    {
      username: 'user6',
      password: await hash('pass6'),
      nickname: 'nick6',
      name: 'Frank',
      gender: Gender.male,
      college: 'Business',
      major: 'Marketing',
      admissionYear: 2020,
      age: 23
    },
    {
      username: 'user7',
      password: await hash('pass7'),
      nickname: 'nick7',
      name: 'Grace',
      gender: Gender.female,
      college: 'Engineering',
      major: 'CS',
      admissionYear: 2022,
      age: 21
    },
    {
      username: 'user8',
      password: await hash('pass8'),
      nickname: 'nick8',
      name: 'Hank',
      gender: Gender.male,
      college: 'Arts',
      major: 'Design',
      admissionYear: 2019,
      age: 24
    },
    {
      username: 'user9',
      password: await hash('pass9'),
      nickname: 'nick9',
      name: 'Ivy',
      gender: Gender.female,
      college: 'Engineering',
      major: 'Mechanical',
      admissionYear: 2021,
      age: 22
    },
    {
      username: 'user10',
      password: await hash('pass10'),
      nickname: 'nick10',
      name: 'Jack',
      gender: Gender.male,
      college: 'Business',
      major: 'Finance',
      admissionYear: 2020,
      age: 23
    },

    // 새로 추가 10명
    {
      username: 'user11',
      password: await hash('pass11'),
      nickname: 'nick11',
      name: 'Karen',
      gender: Gender.female,
      college: 'Arts',
      major: 'Design',
      admissionYear: 2022,
      age: 21
    },
    {
      username: 'user12',
      password: await hash('pass12'),
      nickname: 'nick12',
      name: 'Leo',
      gender: Gender.male,
      college: 'Engineering',
      major: 'CS',
      admissionYear: 2021,
      age: 22
    },
    {
      username: 'user13',
      password: await hash('pass13'),
      nickname: 'nick13',
      name: 'Mona',
      gender: Gender.female,
      college: 'Business',
      major: 'Finance',
      admissionYear: 2020,
      age: 23
    },
    {
      username: 'user14',
      password: await hash('pass14'),
      nickname: 'nick14',
      name: 'Nathan',
      gender: Gender.male,
      college: 'Engineering',
      major: 'Electrical',
      admissionYear: 2022,
      age: 21
    },
    {
      username: 'user15',
      password: await hash('pass15'),
      nickname: 'nick15',
      name: 'Olivia',
      gender: Gender.female,
      college: 'Arts',
      major: 'Design',
      admissionYear: 2019,
      age: 24
    },
    {
      username: 'user16',
      password: await hash('pass16'),
      nickname: 'nick16',
      name: 'Peter',
      gender: Gender.male,
      college: 'Business',
      major: 'Marketing',
      admissionYear: 2021,
      age: 22
    },
    {
      username: 'user17',
      password: await hash('pass17'),
      nickname: 'nick17',
      name: 'Quinn',
      gender: Gender.female,
      college: 'Engineering',
      major: 'CS',
      admissionYear: 2020,
      age: 23
    },
    {
      username: 'user18',
      password: await hash('pass18'),
      nickname: 'nick18',
      name: 'Ryan',
      gender: Gender.male,
      college: 'Arts',
      major: 'Design',
      admissionYear: 2022,
      age: 21
    },
    {
      username: 'user19',
      password: await hash('pass19'),
      nickname: 'nick19',
      name: 'Sophia',
      gender: Gender.female,
      college: 'Engineering',
      major: 'Mechanical',
      admissionYear: 2019,
      age: 24
    },
    {
      username: 'user20',
      password: await hash('pass20'),
      nickname: 'nick20',
      name: 'Tom',
      gender: Gender.male,
      college: 'Business',
      major: 'Finance',
      admissionYear: 2021,
      age: 22
    }
  ]

  // -------------------------
  // 2️⃣ Create Users in DB
  // -------------------------
  const createdUsers: User[] = []
  for (const u of users) {
    const user = await prisma.user.create({ data: u })
    createdUsers.push(user)
  }

  const spareTimes = [
    // user1
    { userId: createdUsers[0].id, day: Days.MON, spareTime: '10:00' },
    { userId: createdUsers[0].id, day: Days.TUE, spareTime: '12:00' },
    { userId: createdUsers[0].id, day: Days.WED, spareTime: '14:00' },
    { userId: createdUsers[0].id, day: Days.FRI, spareTime: '16:30' },
    { userId: createdUsers[0].id, day: Days.SAT, spareTime: '09:30' },

    // user2
    { userId: createdUsers[1].id, day: Days.MON, spareTime: '09:00' },
    { userId: createdUsers[1].id, day: Days.WED, spareTime: '10:30' },
    { userId: createdUsers[1].id, day: Days.FRI, spareTime: '15:00' },

    // user3
    { userId: createdUsers[2].id, day: Days.TUE, spareTime: '11:00' },
    { userId: createdUsers[2].id, day: Days.THU, spareTime: '13:30' },
    { userId: createdUsers[2].id, day: Days.SAT, spareTime: '16:00' },
    { userId: createdUsers[2].id, day: Days.SUN, spareTime: '09:30' },

    // user4
    { userId: createdUsers[3].id, day: Days.MON, spareTime: '10:30' },
    { userId: createdUsers[3].id, day: Days.WED, spareTime: '12:00' },
    { userId: createdUsers[3].id, day: Days.FRI, spareTime: '14:30' },

    // user5
    { userId: createdUsers[4].id, day: Days.TUE, spareTime: '09:30' },
    { userId: createdUsers[4].id, day: Days.THU, spareTime: '11:00' },
    { userId: createdUsers[4].id, day: Days.SAT, spareTime: '15:30' },
    { userId: createdUsers[4].id, day: Days.SUN, spareTime: '13:00' },

    // user6
    { userId: createdUsers[5].id, day: Days.MON, spareTime: '10:00' },
    { userId: createdUsers[5].id, day: Days.WED, spareTime: '14:30' },
    { userId: createdUsers[5].id, day: Days.FRI, spareTime: '16:00' },
    { userId: createdUsers[5].id, day: Days.SAT, spareTime: '09:30' },

    // user7
    { userId: createdUsers[6].id, day: Days.TUE, spareTime: '09:00' },
    { userId: createdUsers[6].id, day: Days.THU, spareTime: '10:30' },
    { userId: createdUsers[6].id, day: Days.SAT, spareTime: '15:00' },

    // user8
    { userId: createdUsers[7].id, day: Days.MON, spareTime: '11:00' },
    { userId: createdUsers[7].id, day: Days.WED, spareTime: '13:30' },
    { userId: createdUsers[7].id, day: Days.FRI, spareTime: '16:00' },
    { userId: createdUsers[7].id, day: Days.SUN, spareTime: '09:30' },

    // user9
    { userId: createdUsers[8].id, day: Days.TUE, spareTime: '10:00' },
    { userId: createdUsers[8].id, day: Days.THU, spareTime: '14:30' },
    { userId: createdUsers[8].id, day: Days.SAT, spareTime: '16:00' },

    // user10
    { userId: createdUsers[9].id, day: Days.MON, spareTime: '09:30' },
    { userId: createdUsers[9].id, day: Days.WED, spareTime: '12:00' },
    { userId: createdUsers[9].id, day: Days.FRI, spareTime: '15:30' },
    { userId: createdUsers[9].id, day: Days.SUN, spareTime: '13:00' },

    // user11
    { userId: createdUsers[10].id, day: Days.TUE, spareTime: '10:00' },
    { userId: createdUsers[10].id, day: Days.THU, spareTime: '14:30' },
    { userId: createdUsers[10].id, day: Days.SAT, spareTime: '16:00' },
    { userId: createdUsers[10].id, day: Days.SUN, spareTime: '09:30' },

    // user12
    { userId: createdUsers[11].id, day: Days.MON, spareTime: '09:00' },
    { userId: createdUsers[11].id, day: Days.WED, spareTime: '10:30' },
    { userId: createdUsers[11].id, day: Days.FRI, spareTime: '15:00' },

    // user13
    { userId: createdUsers[12].id, day: Days.TUE, spareTime: '11:00' },
    { userId: createdUsers[12].id, day: Days.THU, spareTime: '13:30' },
    { userId: createdUsers[12].id, day: Days.SAT, spareTime: '16:00' },

    // user14
    { userId: createdUsers[13].id, day: Days.MON, spareTime: '10:30' },
    { userId: createdUsers[13].id, day: Days.WED, spareTime: '12:00' },
    { userId: createdUsers[13].id, day: Days.FRI, spareTime: '14:30' },

    // user15
    { userId: createdUsers[14].id, day: Days.TUE, spareTime: '09:30' },
    { userId: createdUsers[14].id, day: Days.THU, spareTime: '11:00' },
    { userId: createdUsers[14].id, day: Days.SAT, spareTime: '15:30' },

    // user16
    { userId: createdUsers[15].id, day: Days.MON, spareTime: '10:00' },
    { userId: createdUsers[15].id, day: Days.WED, spareTime: '14:30' },

    // user17
    { userId: createdUsers[16].id, day: Days.TUE, spareTime: '09:00' },
    { userId: createdUsers[16].id, day: Days.THU, spareTime: '10:30' },

    // user18
    { userId: createdUsers[17].id, day: Days.MON, spareTime: '11:00' },
    { userId: createdUsers[17].id, day: Days.WED, spareTime: '13:30' },

    // user19
    { userId: createdUsers[18].id, day: Days.FRI, spareTime: '16:00' },

    // user20
    { userId: createdUsers[19].id, day: Days.SUN, spareTime: '09:30' }
  ]

  for (const st of spareTimes) {
    await prisma.spareTime.create({ data: st })
  }

  const preferences = [
    // user1
    { userId: createdUsers[0].id, preference: 'Music' },
    { userId: createdUsers[0].id, preference: 'Sports' },
    { userId: createdUsers[0].id, preference: 'Movies' },

    // user2
    { userId: createdUsers[1].id, preference: 'Travel' },
    { userId: createdUsers[1].id, preference: 'Cooking' },

    // user3
    { userId: createdUsers[2].id, preference: 'Reading' },
    { userId: createdUsers[2].id, preference: 'Gaming' },
    { userId: createdUsers[2].id, preference: 'Hiking' },

    // user4
    { userId: createdUsers[3].id, preference: 'Art' },
    { userId: createdUsers[3].id, preference: 'Photography' },

    // user5
    { userId: createdUsers[4].id, preference: 'Fitness' },
    { userId: createdUsers[4].id, preference: 'Travel' },
    { userId: createdUsers[4].id, preference: 'Music' },

    // user6
    { userId: createdUsers[5].id, preference: 'Cooking' },
    { userId: createdUsers[5].id, preference: 'Reading' },

    // user7
    { userId: createdUsers[6].id, preference: 'Gaming' },
    { userId: createdUsers[6].id, preference: 'Music' },

    // user8
    { userId: createdUsers[7].id, preference: 'Art' },
    { userId: createdUsers[7].id, preference: 'Sports' },
    { userId: createdUsers[7].id, preference: 'Travel' },

    // user9
    { userId: createdUsers[8].id, preference: 'Movies' },
    { userId: createdUsers[8].id, preference: 'Cooking' },

    // user10
    { userId: createdUsers[9].id, preference: 'Reading' },
    { userId: createdUsers[9].id, preference: 'Music' },
    { userId: createdUsers[9].id, preference: 'Hiking' },

    // user11
    { userId: createdUsers[10].id, preference: 'Gaming' },
    { userId: createdUsers[10].id, preference: 'Sports' },

    // user12
    { userId: createdUsers[11].id, preference: 'Travel' },
    { userId: createdUsers[11].id, preference: 'Art' },

    // user13
    { userId: createdUsers[12].id, preference: 'Music' },
    { userId: createdUsers[12].id, preference: 'Fitness' },

    // user14
    { userId: createdUsers[13].id, preference: 'Reading' },
    { userId: createdUsers[13].id, preference: 'Cooking' },

    // user15
    { userId: createdUsers[14].id, preference: 'Gaming' },
    { userId: createdUsers[14].id, preference: 'Travel' },

    // user16
    { userId: createdUsers[15].id, preference: 'Sports' },
    { userId: createdUsers[15].id, preference: 'Music' },

    // user17
    { userId: createdUsers[16].id, preference: 'Art' },
    { userId: createdUsers[16].id, preference: 'Reading' },

    // user18
    { userId: createdUsers[17].id, preference: 'Cooking' },
    { userId: createdUsers[17].id, preference: 'Fitness' },

    // user19
    { userId: createdUsers[18].id, preference: 'Gaming' },

    // user20
    { userId: createdUsers[19].id, preference: 'Travel' },
    { userId: createdUsers[19].id, preference: 'Music' }
  ]

  for (const pref of preferences) {
    await prisma.preference.create({ data: pref })
  }

  const likes = [
    // user1 likes user2, user3, user4
    { likedByUserId: createdUsers[0].id, likedToUserId: createdUsers[1].id },
    { likedByUserId: createdUsers[0].id, likedToUserId: createdUsers[2].id },
    { likedByUserId: createdUsers[0].id, likedToUserId: createdUsers[3].id },

    // user2 likes user1, user5
    { likedByUserId: createdUsers[1].id, likedToUserId: createdUsers[0].id },
    { likedByUserId: createdUsers[1].id, likedToUserId: createdUsers[4].id },

    // user3 likes user6, user7
    { likedByUserId: createdUsers[2].id, likedToUserId: createdUsers[5].id },
    { likedByUserId: createdUsers[2].id, likedToUserId: createdUsers[6].id },

    // user4 likes user1
    { likedByUserId: createdUsers[3].id, likedToUserId: createdUsers[0].id },

    // user5 likes user2, user3, user6
    { likedByUserId: createdUsers[4].id, likedToUserId: createdUsers[1].id },
    { likedByUserId: createdUsers[4].id, likedToUserId: createdUsers[2].id },
    { likedByUserId: createdUsers[4].id, likedToUserId: createdUsers[5].id },

    // user6 likes user1, user7
    { likedByUserId: createdUsers[5].id, likedToUserId: createdUsers[0].id },
    { likedByUserId: createdUsers[5].id, likedToUserId: createdUsers[6].id },

    // user7 likes user8, user9
    { likedByUserId: createdUsers[6].id, likedToUserId: createdUsers[7].id },
    { likedByUserId: createdUsers[6].id, likedToUserId: createdUsers[8].id },

    // user8 likes user10
    { likedByUserId: createdUsers[7].id, likedToUserId: createdUsers[9].id },

    // user9 likes user1, user5
    { likedByUserId: createdUsers[8].id, likedToUserId: createdUsers[0].id },
    { likedByUserId: createdUsers[8].id, likedToUserId: createdUsers[4].id },

    // user10 likes user2, user3, user7
    { likedByUserId: createdUsers[9].id, likedToUserId: createdUsers[1].id },
    { likedByUserId: createdUsers[9].id, likedToUserId: createdUsers[2].id },
    { likedByUserId: createdUsers[9].id, likedToUserId: createdUsers[6].id },

    // user11 likes user12, user13
    { likedByUserId: createdUsers[10].id, likedToUserId: createdUsers[11].id },
    { likedByUserId: createdUsers[10].id, likedToUserId: createdUsers[12].id },

    // user12 likes user14
    { likedByUserId: createdUsers[11].id, likedToUserId: createdUsers[13].id },

    // user13 likes user15
    { likedByUserId: createdUsers[12].id, likedToUserId: createdUsers[14].id },

    // user14 likes user16
    { likedByUserId: createdUsers[13].id, likedToUserId: createdUsers[15].id },

    // user15 likes user17
    { likedByUserId: createdUsers[14].id, likedToUserId: createdUsers[16].id },

    // user16 likes user18
    { likedByUserId: createdUsers[15].id, likedToUserId: createdUsers[17].id },

    // user17 likes user19
    { likedByUserId: createdUsers[16].id, likedToUserId: createdUsers[18].id },

    // user18 likes user20
    { likedByUserId: createdUsers[17].id, likedToUserId: createdUsers[19].id },

    // user19 likes user1
    { likedByUserId: createdUsers[18].id, likedToUserId: createdUsers[0].id },

    // user20 likes user2, user3
    { likedByUserId: createdUsers[19].id, likedToUserId: createdUsers[1].id },
    { likedByUserId: createdUsers[19].id, likedToUserId: createdUsers[2].id }
  ]

  for (const like of likes) {
    await prisma.like.create({ data: like })
  }

  console.log('20 users + sample spareTime & preferences created ✅')
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect())
