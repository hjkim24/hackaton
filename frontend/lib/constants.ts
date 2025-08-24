export interface SpareTime {
  day: string
  spareTime: string
}

export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  backgroundColor: string
  borderColor: string
}

export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI']
export type DayType = (typeof DAYS)[number]

export const TIME_SLOTS = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30'
]

export const DEFAULT_PREFERENCES = [
  '취업',
  '창업',
  '연구',
  '자격증',
  '게임',
  '음악',
  '운동',
  '독서',
  '요리',
  '패션',
  '미식',
  '여행',
  '사진',
  '노래',
  '춤',
  '밴드'
] as const

export const CALENDAR_CONFIG = {
  slotDuration: '00:30:00',
  slotMinTime: '09:00:00',
  slotMaxTime: '24:00:00',
  firstDay: 1,
  hiddenDays: [0, 6], // 일요일(0)과 토요일(6) 숨김
  selectLongPressDelay: 100,
  selectMinDistance: 5
}
