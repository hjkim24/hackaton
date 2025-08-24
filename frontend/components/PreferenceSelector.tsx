'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DEFAULT_PREFERENCES } from '@/lib/constants'
import { X } from 'lucide-react'
import React, { useState } from 'react'
import { Badge } from './ui/badge'

interface PreferenceSelectorProps {
  selectedPreferences: string[]
  isEditing: boolean
  onEditToggle: () => void
  onSubmit: () => void
  onPreferenceToggle: (preference: string) => void
  onPreferenceRemove: (preference: string) => void
}

export default function PreferenceSelector({
  selectedPreferences,
  isEditing,
  onEditToggle,
  onSubmit,
  onPreferenceToggle,
  onPreferenceRemove
}: PreferenceSelectorProps) {
  const [customPreference, setCustomPreference] = useState('')

  const handleAddCustomPreference = () => {
    if (
      customPreference.trim() &&
      !selectedPreferences.includes(customPreference.trim())
    ) {
      onPreferenceToggle(customPreference.trim())
      setCustomPreference('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddCustomPreference()
    }
  }

  const availablePreferences = DEFAULT_PREFERENCES.filter(
    (pref) => !selectedPreferences.includes(pref)
  )

  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>관심사 설정</CardTitle>
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
        {/* 선택된 관심사 표시 */}
        {selectedPreferences.length > 0 && (
          <div className="mb-6">
            <h4 className="mb-3 text-sm font-medium text-gray-700">
              선택된 관심사:
            </h4>
            <div className="flex flex-wrap gap-2">
              {selectedPreferences.map((preference) => (
                <Badge
                  key={preference}
                  variant="secondary"
                  className="flex items-center gap-1 px-3 py-1 text-sm"
                >
                  {preference}
                  {isEditing && (
                    <button
                      onClick={() => onPreferenceRemove(preference)}
                      className="ml-1 rounded-full p-0.5 hover:bg-gray-300"
                    >
                      <X size={12} />
                    </button>
                  )}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {isEditing && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-700">
                직접 입력:
              </h4>
              <div className="flex gap-2">
                <Input
                  value={customPreference}
                  onChange={(e) => setCustomPreference(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="관심사를 입력하세요"
                  className="flex-1"
                />
                <Button
                  onClick={handleAddCustomPreference}
                  disabled={!customPreference.trim()}
                  size="sm"
                >
                  추가
                </Button>
              </div>
            </div>

            {/* 기본 관심사 목록 */}
            {availablePreferences.length > 0 && (
              <div>
                <h4 className="mb-2 text-sm font-medium text-gray-700">
                  기본 관심사:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {availablePreferences.map((preference) => (
                    <Badge
                      key={preference}
                      variant="outline"
                      className="cursor-pointer px-3 py-1 text-sm hover:bg-gray-100"
                      onClick={() => onPreferenceToggle(preference)}
                    >
                      {preference}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 선택된 관심사가 없을 때 안내 메시지 */}
        {!isEditing && selectedPreferences.length === 0 && (
          <p className="text-sm text-gray-500">
            관심사를 설정하면 더 나은 매칭을 도와드릴 수 있습니다.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
