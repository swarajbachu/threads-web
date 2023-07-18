import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { ThreadsAPI } from "threads-api";

export const threadsLogin = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const threadsAPI = new ThreadsAPI({
          username: input.username,
          password: input.password,
        });
        const token = await threadsAPI.getToken();
        if (token) return { token };
      } catch (error) {
        console.log(error);
      }
    }),
  post: publicProcedure
    .input(
      z.object({
        token: z.string(),
        username: z.string(),
        threads: z.array(
          z.object({
            id: z.number(),
            text: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input }) => {
      const threadsAPI = new ThreadsAPI({
        token: input.token,
        username: input.username,
      });
      if (input.threads[0] && input.threads.length > 0) {
      const FirstPost = await threadsAPI.publish({
        text: input.threads[0].text,
      });
      const postId = FirstPost;

      if(postId){

        let previousThreadId = postId;
        for (let i = 1; i < input.threads.length; i++) {
          const thread = input.threads[i];
          if (thread) {
            const thread=  await threadsAPI.publish({
              text: "2nd post",
              parentPostID: previousThreadId,
            });
            if(thread){
              previousThreadId = thread
            }else{
              console.log("error")
              return
            }
          }
        }
      }
    }
    return { success: true };
    }),
});
