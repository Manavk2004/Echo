"use client"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import { AlertTriangleIcon, ArrowLeftFromLineIcon, ArrowLeftIcon } from "lucide-react"
import { contactSessionIdAtomFamily, conversationIdAtom, errorMessageAtom, organizationIdAtom, screenAtom } from "../atoms/widget-atoms"
import WidgetHeader from "../components/widget-header"
import WidgetFooter from "../components/widget-footer"
import { Button } from "@workspace/ui/components/button"
import { usePaginatedQuery } from "convex/react"
import { api } from "@workspace/backend/_generated/api"
import { formatDistanceToNow } from "date-fns"
import { ConversationStatusIcon } from "@workspace/ui/components/conversation-status-icon"

export const WidgetInboxScreen = () => {

    const setScreen = useSetAtom(screenAtom)
    const setConversationId = useSetAtom(conversationIdAtom)

    const organizationId = useAtomValue(organizationIdAtom)
    const contactSessionId = useAtomValue(
        contactSessionIdAtomFamily(organizationId || "")
    )

    const conversations = usePaginatedQuery(
        api.public.conversations.getMany,
        contactSessionId ? {
            contactSessionId,
        }
        : "skip",
        {
            initialNumItems: 10
        }
    )

    console.log("Here are the conversations", conversations)

    return(
        <>
            <WidgetHeader>
                <div className="flex items-center gap-x-2">
                    <Button
                        variant="transparent"
                        size="icon"
                        onClick={() => setScreen("selection")}
                    >
                        <ArrowLeftIcon />
                        <p>Inbox</p>
                    </Button>
                </div>
            </WidgetHeader>
            <div className="flex flex-1 flex-col gap-y-2 p-4 overflow-y-auto">
                {conversations?.results.length > 0 &&
                    conversations?.results.map((conversation) => (
                        <Button
                            className="h-20 w-full justify-between"
                            key={conversation._id}
                            onClick={() => {
                                setConversationId(conversation._id)
                                setScreen("chat")
                            }}
                            variant="outline"
                        >
                            <div className="flex w-full flex-col gap-4 overflow-hidden text-start">
                                <div className="flex w-full items-center justify-between gap-x-2">
                                    <p className="text-muted-foreground text-xs">Chat</p>
                                    <p className="text-muted-foreground text-xs">
                                        {formatDistanceToNow(new Date(conversation._creationTime))}
                                    </p>

                                </div>
                                <div className="flex w-full items-center justify-between gap-x-2 ">
                                    <p className="truncate">
                                        {conversation.lastMessage?.text}
                
                                    </p>
                                    <ConversationStatusIcon status={conversation.status} />
            
                                </div>
                            </div>

                        </Button>
                    ))
                }
            </div>
            <WidgetFooter />
        </>
    )
}