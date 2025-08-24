'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  SpareTime,
  CalendarEvent,
  DAYS,
  CALENDAR_CONFIG
} from '@/lib/constants'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import React, { useRef } from 'react'

interface TimeSelectionCalendarProps {
  selectedTimes: SpareTime[]
  isEditing: boolean
  onEditToggle: () => void
  onSubmit: () => void
  onTimeSelect: (day: string, timeSlots: string[]) => void
  onEventClick: (day: string, time: string) => void
}

export default function TimeSelectionCalendar({
  selectedTimes,
  isEditing,
  onEditToggle,
  onSubmit,
  onTimeSelect,
  onEventClick
}: TimeSelectionCalendarProps) {
  const calendarRef = useRef<any>(null)

  const spareTimesToEvents = (spareTimes: SpareTime[]): CalendarEvent[] => {
    const events: CalendarEvent[] = []

    const today = new Date()
    const currentDay = today.getDay()
    const mondayOffset = currentDay === 0 ? 6 : currentDay - 1
    const monday = new Date(today)
    monday.setDate(today.getDate() - mondayOffset)

    spareTimes.forEach((timeSlot) => {
      const [hours, minutes] = timeSlot.spareTime.split(':')

      const dayIndex = DAYS.indexOf(timeSlot.day)
      const targetDate = new Date(monday)
      targetDate.setDate(monday.getDate() + dayIndex)

      const startTime = new Date(targetDate)
      startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

      const endTime = new Date(startTime)
      endTime.setMinutes(endTime.getMinutes() + 30)

      events.push({
        id: `${timeSlot.day}-${timeSlot.spareTime}`,
        title: `${timeSlot.day} ${timeSlot.spareTime}`,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        backgroundColor: '#315342',
        borderColor: '#315342'
      })
    })

    return events
  }

  const handleEventClick = (clickInfo: any) => {
    if (!isEditing) return

    const event = clickInfo.event
    const [day, time] = event.title.split(' ')

    event.remove()
    onEventClick(day, time)
  }

  const handleDateSelect = (selectInfo: any) => {
    if (!isEditing) return

    const start = selectInfo.start
    const end = selectInfo.end

    // 30분 단위로만 선택 가능하도록 조정
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()

    if (startMinutes % 30 !== 0 || endMinutes % 30 !== 0) {
      alert('30분 단위로만 선택 가능합니다.')
      selectInfo.view.calendar.unselect()
      return
    }

    const dayNames = ['MON', 'TUE', 'WED', 'THU', 'FRI']
    const dayIndex = start.getDay() // 0=일요일, 1=월요일, ..., 6=토요일
    const day = dayIndex >= 1 && dayIndex <= 5 ? dayNames[dayIndex - 1] : null

    if (!day) {
      alert('월요일부터 금요일까지만 선택 가능합니다.')
      selectInfo.view.calendar.unselect()
      return
    }

    const timeSlots: string[] = []
    const current = new Date(start)

    while (current < end) {
      const hours = current.getHours().toString().padStart(2, '0')
      const minutes = current.getMinutes().toString().padStart(2, '0')
      timeSlots.push(`${hours}:${minutes}`)
      current.setMinutes(current.getMinutes() + 30)
    }

    onTimeSelect(day, timeSlots)

    selectInfo.view.calendar.unselect()
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>공강 시간 설정</CardTitle>
          <div className="flex space-x-2">
            <Button
              onClick={onEditToggle}
              variant={isEditing ? 'outline' : 'default'}
            >
              {isEditing ? '취소' : '수정'}
            </Button>
            {isEditing && <Button onClick={onSubmit}>저장</Button>}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="[&_.fc-day-header]:!text-gray-700 [&_.fc-event]:!border-[#315342] [&_.fc-event]:!bg-[#315342] [&_.fc-event]:!text-transparent [&_.fc-slot-label]:!text-gray-600">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: '',
              center: '',
              right: ''
            }}
            initialView="timeGridWeek"
            editable={isEditing}
            selectable={isEditing}
            selectMirror={true}
            dayMaxEvents={true}
            weekends={false}
            events={spareTimesToEvents(selectedTimes)}
            select={handleDateSelect}
            eventClick={handleEventClick}
            slotDuration={CALENDAR_CONFIG.slotDuration}
            slotMinTime={CALENDAR_CONFIG.slotMinTime}
            slotMaxTime={CALENDAR_CONFIG.slotMaxTime}
            height="auto"
            selectConstraint={{
              startTime: CALENDAR_CONFIG.slotMinTime,
              endTime: CALENDAR_CONFIG.slotMaxTime,
              dows: [1, 2, 3, 4, 5] // 월~금만
            }}
            slotLabelFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            eventTimeFormat={{
              hour: '2-digit',
              minute: '2-digit',
              hour12: false
            }}
            firstDay={CALENDAR_CONFIG.firstDay}
            weekNumbers={false}
            dayHeaderFormat={{ weekday: 'short' }}
            titleFormat={{ month: 'long', year: 'numeric' }}
            selectLongPressDelay={CALENDAR_CONFIG.selectLongPressDelay}
            selectMinDistance={CALENDAR_CONFIG.selectMinDistance}
            hiddenDays={CALENDAR_CONFIG.hiddenDays}
            allDaySlot={false}
            eventDisplay="block"
            eventContent={() => null}
            expandRows={true}
            slotMinWidth={80}
          />
        </div>
      </CardContent>
    </Card>
  )
}
