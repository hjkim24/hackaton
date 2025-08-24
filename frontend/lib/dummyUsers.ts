import { User } from '@/types/auth';

export const dummyUsers: User[] = [
  {
    id: '1',
    username: 'user01',
    avatar: 'https://picsum.photos/100/100?random=1',
  },
  {
    id: '2',
    username: 'user02',
    avatar: 'https://picsum.photos/100/100?random=2',
  },
];

export const dummyCredentials = [
  { username: 'user01', password: 'Useruser' },
  { username: 'user02', password: 'Useruser' },
];

export const validateCredentials = (username: string, password: string): User | null => {
  const credential = dummyCredentials.find(
    cred => cred.username === username && cred.password === password
  );
  
  if (credential) {
    return dummyUsers.find(user => user.username === username) || null;
  }
  
  return null;
};
