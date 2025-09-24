import Vapi from "@vapi-ai/web"
import { useEffect, useState } from "react"

interface TranssciptMessage {
    role: "user" | "assistant";
    text: string
}

export const useVapi = () => {
    const [vapi, setVapi] = useState<Vapi | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [transcript, setTranscript] = useState<TranssciptMessage[]>([])

    useEffect(() => {
        //This is only for testing the Vapi API, custoemrs will provide their own API keys
        const vapiInstance = new Vapi("2abe7318-200c-4637-99ac-aee7c7768663")
        setVapi(vapiInstance)

        vapiInstance.on("call-start", () => {
            setIsConnected(true)
            setIsConnecting(false);
            setTranscript([])
        })

        vapiInstance.on("call-end", () => {
            setIsConnected(false)
            setIsConnecting(false)
            setIsSpeaking(false)
        })

        vapiInstance.on("speech-start", () => {
            setIsSpeaking(true)
         })
         vapiInstance.on("speech-end", () => {
            setIsSpeaking(false)
         })

         vapiInstance.on("error", (error) => {
            console.log(error, "VAPI_ERROR")
            setIsConnected(false)
         })

         vapiInstance.on("message", (message) => {
            if(message.type === "transcript" && message.transcriptType === "final"){
                setTranscript((prev) => [
                    ...prev,
                    {
                        role: message.role === "user" ? "user" : "assistant",
                        text: message.transcript
                    }
                ]);
            }
         })

         return () => {
            vapiInstance?.stop()
         }
    }, [])
    
    const startCall = () => {
        setIsConnected(true)

        if (vapi){
            //This is only for testing the Vapi API, custoemrs will provide their own Assistant IDs
            vapi.start("b4beab34-be12-43ec-ab02-762c19d2b95e")
        }
    }

    const endCall = () => {
        if (vapi) {
            vapi?.stop()
        }
    }

    return {
        isSpeaking,
        isConnecting,
        isConnected,
        transcript,
        startCall,
        endCall
    }
}