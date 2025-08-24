'use client'

import { useState, useEffect } from 'react'
import SwipeContainer from '@/components/SwipeContainer'
import MainPageHeader from './_components/MainPageHeader'
import { useUserStore } from '@/stores/userStore'

type Preference = {
  id: number
  preference: string
  userId: number
}

type SpareTime = {
  id: number
  spareTime: string
  day: string
  userId: number
}

type LikedToUser = {
  id: number
  nickname: string
  gender: 'male' | 'female'
  college: string
  major: string
  age: number
  admissionYear: number
  Preference: Preference[]
  SpareTime: SpareTime[]
}

type LikeListItem = {
  user: LikedToUser
}

export default function SwipePage() {
  const [profiles, setProfiles] = useState<LikedToUser[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { selectedTime } = useUserStore()

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true)
        const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:4000'}/recommend/2?day=${selectedTime.day}&startTime=${selectedTime.startTime}&endTime=${selectedTime.endTime}`
        console.log('Fetching recommendations from:', apiUrl)
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: LikeListItem[] = await response.json()
        console.log('Received recommendations:', data)
        const userProfiles = data.map(item => item.user) // item.likedToUser -> item.user로 변경
        setProfiles(userProfiles)
        
        // API에서 받아온 데이터는 전역 스토어에 저장하지 않음
        // 오른쪽으로 스와이프한 사용자만 전역 스토어에 저장됨
      } catch (err) {
        console.error('Fetch error details:', err)
        if (err instanceof TypeError && err.message === 'Failed to fetch') {
          setError('네트워크 연결을 확인해주세요. 백엔드 서버가 실행 중인지 확인해주세요.')
        } else {
          setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다')
        }
      } finally {
        setLoading(false)
      }
    }

    // selectedTime이 변경될 때마다 API 호출
    if (selectedTime.day && selectedTime.startTime && selectedTime.endTime) {
      fetchRecommendations()
    }
  }, [selectedTime])

  if (loading) {
    return (
      <div>
        <MainPageHeader />
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="text-lg">로딩 중...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <MainPageHeader />
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="text-lg text-red-500">에러: {error}</div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <MainPageHeader />
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <SwipeContainer initialProfiles={profiles} />
      </div>
    </div>
  )
}
