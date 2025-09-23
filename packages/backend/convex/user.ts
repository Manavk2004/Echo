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
        if (identity === null) {
            throw new Error("Not authenticated");
        }
        const userId = await ctx.db.insert("users", {
            name: "Antonio",
        });
        return userId
    },
})

//The mutation file allows for changes to be mde in the convex database. Const add here allows us to add users to the databse