import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ThreadsAPI } from "threads-api";

export const threadsLogin = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      try{
      const threadsAPI = new ThreadsAPI({
        username: input.username,
        password: input.password,
      });
      const token = await threadsAPI.getToken()
      if(token)
      return {token}
    }
    catch(error){
      console.log(error)
    }
    
    }),
  post: publicProcedure
    .input(z.object({ token: z.string(),username: z.string() }))
    .mutation(async ({ input }) => {
      const threadsAPI = new ThreadsAPI({
         token: input.token,
         username:input.username,
      });

      const post = await threadsAPI.publish({
        text: "testing",
      })

      const postId = post

      await threadsAPI.publish({
        text:'2nd post',
        parentPostID:postId
      })

      if(postId){
        return postId
      }
    }),
    

});
