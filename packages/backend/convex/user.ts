import { query, mutation } from "./_generated/server"

export const getMany = query({
    args: {},
    handler: async(ctx) => {
        const users = await ctx.db.query("users").collect()
        return users
    }

})

//This here simply display everything in the users tabel and its retreives by collect()

export const add = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        console.log("HEre is the identity", identity)
        if (identity === null) {
            throw new Error("Not authenticated");
        }

        const orgId = identity.orgID as string  // Fixed: orgID with capital D

        if(!orgId){
            throw new Error("Missing organization")
        }

        throw new Error("Tracking test");

        const userId = await ctx.db.insert("users", {
            name: "Antonio",
        });
        return userId
    },
})

//The mutation file allows for changes to be mde in the convex database. Const add here allows us to add users to the databse