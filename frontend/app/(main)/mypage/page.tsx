'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LoginForm } from '@/components/LoginForm';
import { useAuthStore } from '@/stores/authStore';

export default function MyPage() {
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  const handleLoginSuccess = () => {
    // 로그인 성공 시 자동으로 상태가 업데이트됨
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 py-6 px-4 flex items-center justify-center">
        <div className="max-w-md mx-auto w-full">
          <LoginForm onSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">마이페이지</CardTitle>
            <CardDescription>
              환영합니다, {user?.username}님!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                {user?.avatar && (
                  <img
                    src={user.avatar}
                    alt={user.username}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                  <h3 className="text-lg font-semibold">{user?.username}</h3>
              </div>
              
              <div className="pt-4 border-t">
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

        {/* 추가 사용자 정보 섹션들 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>활동 내역</CardTitle>
            <CardDescription>최근 활동을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}