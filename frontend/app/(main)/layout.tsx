'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { CiChat1 } from 'react-icons/ci'
import { GrHomeRounded } from 'react-icons/gr'
import { HiOutlineSearch } from 'react-icons/hi'
import { HiOutlineUserCircle } from 'react-icons/hi2'
import { HiUserCircle } from 'react-icons/hi2'
import { cn } from '../libs/utils'

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isCurrentTab = (tab: string) => {
    if (tab === '') {
      return pathname === '/'
    }
    return pathname.startsWith(`/${tab}`)
  }

  return (
    <div className="relative flex min-h-screen flex-col">
      <main className="mb-16 flex-grow bg-gradient-to-br from-blue-50 to-purple-50">
        {children}
      </main>

      {/* 하단 네비게이션 */}
      <nav className="fixed bottom-0 z-10 flex h-16 w-full items-center justify-around bg-white shadow-2xl">
        <Link href="/">
          <GrHomeRounded
            className={cn('h-10 w-10 p-1', isCurrentTab('') && 'fill-black')}
          />
        </Link>
        <Link href="/chat">
          <CiChat1
            className={cn(
              'h-10 w-10 stroke-1',
              isCurrentTab('chat') && 'stroke-3'
            )}
          />
        </Link>
        <Link href="/search">
          <HiOutlineSearch
            className={cn(
              'h-10 w-10 stroke-1',
              isCurrentTab('search') && 'stroke-3'
            )}
          />
        </Link>
        <Link href="/mypage">
          {isCurrentTab('mypage') ? (
            <HiUserCircle className="h-10 w-10" />
          ) : (
            <HiOutlineUserCircle className="h-10 w-10" />
          )}
        </Link>
      </nav>
    </div>
  )
}
