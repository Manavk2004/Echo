import { Agent } from "@convex-dev/agent";
import { openai } from "@ai-sdk/openai";
import { components } from "../../../_generated/api"

export const supportAgent = new Agent(components.agent, {
    chat: openai.chat("gpt-4"),
    instructions: `You are a customer support agent. Use "resolveConversation" tool when user expressed finalization of the conversation. Use "escalateConversation" when the user expresses frsutration, or requests a human explicitly`
})