import { Days, Gender, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function seed() {
  // 정리: FK 제약을 피하기 위해 자식 → 부모 순서로 삭제
  await prisma.like.deleteMany()
  await prisma.message.deleteMany()
  await prisma.chatRoom.deleteMany()
  await prisma.spareTime.deleteMany()
  await prisma.preference.deleteMany()
  await prisma.user.deleteMany()

  type SeedUser = {
    username: string
    password: string
    nickname: string
    name: string
    gender: Gender
    college: string
    major: string
    admissionYear: number
    age: number
    preferences: string[]
    spareTimes: { spareTime: string; day: Days }[]
  }

  const users: SeedUser[] = [
    {
      username: 'alice',
      password: 'password1',
      nickname: '앨리스',
      name: 'Alice Kim',
      gender: Gender.female,
      college: 'Engineering',
      major: 'Computer Science',
      admissionYear: 2022,
      age: 22,
      preferences: ['coffee', 'coding', 'music'],
      spareTimes: [
        { spareTime: '09:00', day: Days.MON },
        { spareTime: '09:30', day: Days.MON },
        { spareTime: '14:00', day: Days.WED }
      ]
    },
    {
      username: 'bob',
      password: 'password2',
      nickname: '밥',
      name: 'Bob Lee',
      gender: Gender.male,
      college: 'Humanities',
      major: 'Linguistics',
      admissionYear: 2021,
      age: 24,
      preferences: ['music', 'movie'],
      spareTimes: [
        { spareTime: '14:00', day: Days.WED },
        { spareTime: '14:30', day: Days.WED },
        { spareTime: '20:00', day: Days.FRI }
      ]
    },
    {
      username: 'charlie',
      password: 'password3',
      nickname: '찰리',
      name: 'Charlie Park',
      gender: Gender.male,
      college: 'Business',
      major: 'Finance',
      admissionYear: 2020,
      age: 26,
      preferences: ['basketball', 'coffee'],
      spareTimes: [
        { spareTime: '10:00', day: Days.THU },
        { spareTime: '10:30', day: Days.THU }
      ]
    },
    {
      username: 'diana',
      password: 'password4',
      nickname: '다이애나',
      name: 'Diana Choi',
      gender: Gender.female,
      college: 'Science',
      major: 'Biology',
      admissionYear: 2023,
      age: 20,
      preferences: ['yoga', 'movie'],
      spareTimes: [
        { spareTime: '18:00', day: Days.FRI },
        { spareTime: '18:30', day: Days.FRI }
      ]
    },
    {
      username: 'eric',
      password: 'password5',
      nickname: '에릭',
      name: 'Eric Jung',
      gender: Gender.male,
      college: 'Engineering',
      major: 'Mechanical',
      admissionYear: 2019,
      age: 27,
      preferences: ['coding', 'movie'],
      spareTimes: [
        { spareTime: '09:00', day: Days.MON },
        { spareTime: '20:00', day: Days.FRI }
      ]
    }
  ]

  for (const u of users) {
    await prisma.user.create({
      data: {
        username: u.username,
        password: u.password,
        nickname: u.nickname,
        name: u.name,
        gender: u.gender,
        college: u.college,
        major: u.major,
        admissionYear: u.admissionYear,
        age: u.age,
        Preference: {
          create: u.preferences.map((p) => ({ preference: p }))
        },
        SpareTime: {
          create: u.spareTimes.map((t) => ({
            spareTime: t.spareTime,
            day: t.day
          }))
        }
      }
    })
  }
}

seed()
  .then(() => {
    console.log('✅ Seeding finished')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => {
    void prisma.$disconnect()
  })
