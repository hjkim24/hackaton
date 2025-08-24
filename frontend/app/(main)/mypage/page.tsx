'use client'

import { LoginForm } from '@/components/LoginForm'
import PreferenceSelector from '@/components/PreferenceSelector'
import TimeSelectionCalendar from '@/components/TimeSelectionCalendar'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { SpareTime } from '@/lib/constants'
import { useAuthStore } from '@/stores/authStore'
import React, { useState, useEffect } from 'react'

export default function MyPage() {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [spareTimes, setSpareTimes] = useState<SpareTime[]>([])
  const [selectedTimes, setSelectedTimes] = useState<SpareTime[]>([])
  const [isEditing, setIsEditing] = useState(false)
  const [preferences, setPreferences] = useState<string[]>([])
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([])
  const [isEditingPreferences, setIsEditingPreferences] = useState(false)

  useEffect(() => {
    loadSpareTimes()
    loadPreferences()
  }, []) // 빈 의존성 배열로 마운트 시에만 실행

  const loadSpareTimes = async () => {
    try {
      // TODO: API 호출로 기존 spareTime 데이터 가져오기
      // const response = await fetch('/api/spare-times')
      // const data = await response.json()

      // 임시 데이터 (나중에 API로 교체)
      const mockData: SpareTime[] = [
        { day: 'MON', spareTime: '09:00' },
        { day: 'MON', spareTime: '09:30' },
        { day: 'MON', spareTime: '10:00' },
        { day: 'TUE', spareTime: '14:00' },
        { day: 'TUE', spareTime: '14:30' },
        { day: 'TUE', spareTime: '15:00' }
      ]

      setSpareTimes(mockData)
      setSelectedTimes(mockData)
    } catch (error) {
      console.error('Failed to load spare times:', error)
    }
  }

  const loadPreferences = async () => {
    try {
      // TODO: API 호출로 기존 preference 데이터 가져오기
      // const response = await fetch('/api/preferences')
      // const data = await response.json()

      // 임시 데이터 (나중에 API로 교체)
      const mockPreferences = ['취업', '운동', '음악']
      setPreferences(mockPreferences)
      setSelectedPreferences(mockPreferences)
    } catch (error) {
      console.error('Failed to load preferences:', error)
    }
  }

  const handleTimeSelect = (day: string, timeSlots: string[]) => {
    setSelectedTimes((prev) => {
      const newTimeSlots = timeSlots.map((time) => ({ day, spareTime: time }))

      // 기존에 같은 요일+시간이 있는지 확인하고 중복 제거
      const existingIds = new Set(
        prev.map((item) => `${item.day}-${item.spareTime}`)
      )
      const filteredNewSlots = newTimeSlots.filter(
        (item) => !existingIds.has(`${item.day}-${item.spareTime}`)
      )

      const result = [...prev, ...filteredNewSlots]
      return result
    })
  }

  const handleEventClick = (day: string, time: string) => {
    setSelectedTimes((prev) => {
      const result = prev.filter(
        (item) => !(item.day === day && item.spareTime === time)
      )
      return result
    })
  }

  const handleSubmit = async () => {
    console.log('Submitting selectedTimes:', selectedTimes)
    try {
      // TODO: API 호출로 spareTime 데이터 저장/수정
      const response = await fetch('/api/spare-times', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ spareTimes: selectedTimes })
      })

      if (response.ok) {
        setSpareTimes(selectedTimes)
        setIsEditing(false)
        alert('시간이 성공적으로 저장되었습니다!')
      } else {
        throw new Error('Failed to save spare times')
      }
    } catch (error) {
      console.error('Failed to save spare times:', error)
      alert('시간 저장에 실패했습니다.')
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      setIsEditing(false)
      setSelectedTimes(spareTimes)
    } else {
      setIsEditing(true)
    }
  }

  // Preference 관련 핸들러들
  const handlePreferenceToggle = (preference: string) => {
    setSelectedPreferences((prev) => {
      if (prev.includes(preference)) {
        return prev.filter((p) => p !== preference)
      } else {
        return [...prev, preference]
      }
    })
  }

  const handlePreferenceRemove = (preference: string) => {
    setSelectedPreferences((prev) => prev.filter((p) => p !== preference))
  }

  const handlePreferenceEditToggle = () => {
    if (isEditingPreferences) {
      setIsEditingPreferences(false)
      setSelectedPreferences(preferences)
    } else {
      setIsEditingPreferences(true)
    }
  }

  const handlePreferenceSubmit = async () => {
    console.log('Submitting preferences:', selectedPreferences)
    try {
      // TODO: API 호출로 preference 데이터 저장/수정
      const response = await fetch('/api/preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ preferences: selectedPreferences })
      })

      if (response.ok) {
        setPreferences(selectedPreferences)
        setIsEditingPreferences(false)
        alert('관심사가 성공적으로 저장되었습니다!')
      } else {
        throw new Error('Failed to save preferences')
      }
    } catch (error) {
      console.error('Failed to save preferences:', error)
      alert('관심사 저장에 실패했습니다.')
    }
  }

  const handleLogout = () => {
    logout()
  }

  const handleLoginSuccess = () => {
    // 로그인 성공 시 자동으로 상태가 업데이트됨
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-6">
        <div className="mx-auto w-full max-w-md">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-2xl">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">마이페이지</CardTitle>
            <CardDescription>환영합니다, {user?.username}님!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="h-16 w-16 rounded-full"
                  />
                )}
                <h3 className="text-lg font-semibold">{user?.username}</h3>
              </div>

              <div className="border-t pt-4">
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full"
                >
                  로그아웃
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 관심사 설정 컴포넌트 */}
        <PreferenceSelector
          selectedPreferences={selectedPreferences}
          isEditing={isEditingPreferences}
          onEditToggle={handlePreferenceEditToggle}
          onSubmit={handlePreferenceSubmit}
          onPreferenceToggle={handlePreferenceToggle}
          onPreferenceRemove={handlePreferenceRemove}
        />

        {/* 시간 선택 캘린더 컴포넌트 */}
        <TimeSelectionCalendar
          selectedTimes={selectedTimes}
          isEditing={isEditing}
          onEditToggle={handleEditToggle}
          onSubmit={handleSubmit}
          onTimeSelect={handleTimeSelect}
          onEventClick={handleEventClick}
        />
      </div>
    </div>
  )
}
