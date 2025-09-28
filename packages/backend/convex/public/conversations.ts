import { mutation, query } from "../_generated/server";
import { ConvexError, v } from "convex/values";
import { supportAgent } from "../system/ai/agents/supportAgent";
import { saveMessage } from "@convex-dev/agent";
import { components } from "../_generated/api";


export const getOne = query({
    args: {
        conversationId: v.id("conversations"),
        contactSessionId: v.id("contactSessions")
    },
    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.contactSessionId)

        if(!session || session.expiresAt < Date.now()){
            throw new ConvexError({
                code: "NOT_FOUND",
                message: "Conversation not found",
            })
        }

        const conversation = await ctx.db.get(args.conversationId)

        if(!conversation){
            return null
        }

        if(conversation.contactSessionId !== session._id){
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Incorrect session",
            })
        }

        return {
            _id: conversation._id,
            statu: conversation.status,
            threadId: conversation.threadId
        }
    }
})

export const create = mutation({
    args: {
        organizationId: v.string(),
        contactSessionId: v.id("contactSessions"),
    },
    handler: async (ctx, args) => {
        const session = await ctx.db.get(args.contactSessionId)

        if(!session || session.expiresAt < Date.now()){
            throw new ConvexError({
                code: "UNAUTHORIZED",
                message: "Invalid session",
            })
        }

        const { threadId } = await supportAgent.createThread(ctx, {
            userId: args.organizationId
        })

        await saveMessage(ctx, components.agent, {
            threadId,
            message: {
                role: "assistant",
                content: "Hello how can I help you today?"
            }
        })

        const conversationId = await ctx.db.insert("conversations", {
            contactSessionId: session._id,
            status: "unresolved", 
            organizationId: args.organizationId,
            threadId
        })

        return conversationId
    }
})