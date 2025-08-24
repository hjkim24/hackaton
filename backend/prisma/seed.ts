import { PrismaClient, Days, Gender, User } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // 1. Users
  const users: Omit<User, 'id'>[] = [
    {
      username: 'user1',
      password: 'pass1',
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
      password: 'pass2',
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
      password: 'pass3',
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
      password: 'pass4',
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
      password: 'pass5',
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
      password: 'pass6',
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
      password: 'pass7',
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
      password: 'pass8',
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
      password: 'pass9',
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
      password: 'pass10',
      nickname: 'nick10',
      name: 'Jack',
      gender: Gender.male,
      college: 'Business',
      major: 'Finance',
      admissionYear: 2020,
      age: 23
    },
    {
      username: 'user11',
      password: 'pass11',
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
      password: 'pass12',
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
      password: 'pass13',
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
      password: 'pass14',
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
      password: 'pass15',
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
      password: 'pass16',
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
      password: 'pass17',
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
      password: 'pass18',
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
      password: 'pass19',
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
      password: 'pass20',
      nickname: 'nick20',
      name: 'Tom',
      gender: Gender.male,
      college: 'Business',
      major: 'Finance',
      admissionYear: 2021,
      age: 22
    }
  ]

  const createdUsers: User[] = []
  for (const u of users) {
    const user = await prisma.user.create({ data: u })
    createdUsers.push(user)
  }

  // 2. SpareTimes (고정)
  const spareTimes = [
    { userId: createdUsers[0].id, day: Days.MON, spareTime: '10:00-10:30' },
    { userId: createdUsers[0].id, day: Days.WED, spareTime: '14:00-14:30' },
    { userId: createdUsers[1].id, day: Days.TUE, spareTime: '09:30-10:00' },
    { userId: createdUsers[1].id, day: Days.FRI, spareTime: '15:00-15:30' },
    { userId: createdUsers[2].id, day: Days.MON, spareTime: '11:00-11:30' }
    // ... 계속해서 30개 정도
  ]

  for (const st of spareTimes) {
    await prisma.spareTime.create({ data: st })
  }

  // 3. Preferences (고정)
  const preferences = [
    { userId: createdUsers[0].id, preference: 'Sports' },
    { userId: createdUsers[0].id, preference: 'Music' },
    { userId: createdUsers[1].id, preference: 'Reading' },
    { userId: createdUsers[1].id, preference: 'Movies' },
    { userId: createdUsers[2].id, preference: 'Travel' }
    // ... 계속
  ]

  for (const p of preferences) {
    await prisma.preference.create({ data: p })
  }

  // 4. Likes (고정)
  const likes = [
    { likedByUserId: createdUsers[0].id, likedToUserId: createdUsers[1].id },
    { likedByUserId: createdUsers[1].id, likedToUserId: createdUsers[2].id },
    { likedByUserId: createdUsers[2].id, likedToUserId: createdUsers[0].id }
  ]

  for (const l of likes) {
    await prisma.like.create({ data: l })
  }

  console.log('Fixed seed data created ✅')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
