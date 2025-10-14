import React from 'react'
import { Id } from '@workspace/backend/convex/_generated/dataModel'
import { ConversationIdView } from '@/modules/auth/ui/dashboard/ui/views/conversation-id-view'

async function Page({params}: {
    params: Promise<{
        conversationId: string
    }>
}) {

    const { conversationId } = await params

  return (
    <ConversationIdView conversationId={conversationId as Id<"conversations">} />
  )
}

export default Page
