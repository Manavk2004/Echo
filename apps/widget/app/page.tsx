"use client"

import { useVapi } from "@/modules/widget/hooks/use-vapi"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  const {isSpeaking, isConnecting, isConnected, transcript, startCall, endCall} = useVapi()

  return (
    <div className="flex flex-col items-center justify-center min-h-svh max-w-md mx-auto w-full">
      <Button className="mb-2" onClick={() => startCall()}>
        Start Call
      </Button>
      <Button className="bg-red-500" onClick={() => endCall()}>
        End Call
      </Button>

      <p>isConnected:{`${isConnected}`}</p>
      <p>isConnecting:{`${isConnecting}`}</p>
      <p>isSpeaking:{`${isSpeaking}`}</p>
      <p>{JSON.stringify(transcript, null, 2)}</p>
    </div>
  )
}
