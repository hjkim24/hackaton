import { User } from '@/types/auth'

export const dummyUsers: User[] = [
  {
    id: '1',
    age: 25,
    gender: '남성',
    college: '성균관대학교',
    major: '소프트웨어학과',
    username: 'user01',
    admissionYear: 2020,
    nickname: '빡서캣',
    name: '권서진',
    mbti: 'INFP',
    avatar: 'https://picsum.photos/100/100?random=1'
  },
  {
    id: '2',
    age: 23,
    gender: '여성',
    college: '성균관대학교',
    major: '문헌정보학과',
    username: 'user02',
    admissionYear: 2022,
    nickname: 'clover229',
    name: '전수민',
    mbti: 'ISTJ',
    avatar: 'https://picsum.photos/100/100?random=2'
  }
]

export const dummyCredentials = [
  { username: 'user01', password: 'Useruser' },
  { username: 'user02', password: 'Useruser' }
]

export const validateCredentials = (
  username: string,
  password: string
): User | null => {
  const credential = dummyCredentials.find(
    (cred) => cred.username === username && cred.password === password
  )

  if (credential) {
    return dummyUsers.find((user) => user.username === username) || null
  }

  return null
}
