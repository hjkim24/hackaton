// app/chat/page.tsx

import { redirect } from 'next/navigation';

export default function ChatRootPage() {
  redirect('/chat/recommendedpeople');
}