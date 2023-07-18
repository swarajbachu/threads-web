import React from "react";
import Singlethread from "./singleThread";
import { Button, Card } from "@material-tailwind/react";
import { useStore } from "@/store/post-store";
import { shallow } from "zustand/shallow";
import { api } from "@/utils/api";
import Loading from "../loading";
import { toast } from "react-hot-toast";

type thread = {
  id: number;
  text: string;
};

const threadPost: React.FC = () => {


  const { threads, setthreads,reset } = useStore(
    (state) => ({
      threads: state.threads,
      setthreads: state.setthreads,
      reset: state.reset,
    }),
    shallow
  );
  const { mutateAsync: post,isLoading,status } = api.threadslogin.post.useMutation();


  const handleAddthread = (id: number) => {
    const index = threads.findIndex((thread) => thread.id === id);

    // Increment ids of all threads after the current one
    const updatedthreads = threads.map((thread) => {
      if (thread.id > id) {
        return { ...thread, id: thread.id + 1 };
      }
      return thread;
    });

    // Create new thread with id incremented by 1 and an empty text field
    const newthread = { id: id + 1, text: "" };

    // Insert the new thread after the current one
    updatedthreads.splice(index + 1, 0, newthread);

    setthreads(updatedthreads);
  };
  const handleRemovethread = (id: number) => {
    if (id == 0) return;
    const updatedthreads = threads.filter((thread) => thread.id !== id);
    setthreads(updatedthreads);
  };

  const handlethreadChange = (id: number, newText: string) => {
    const updatedthreads = threads.map((thread) =>
      thread.id === id ? { ...thread, text: newText } : thread
    );
    setthreads(updatedthreads);
  };

  const handlePost = () => {
    console.log("this is running")
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if(token && username){
      post({username,token,threads}).then((status)=>{
        if(status && status.success){
          toast.success("Posted successfully")
          reset();
      }

    })
    }else{
      toast.error("Login again please")
    }
  };

  return (
    <Card className="p-4">
      <div>
        {threads.map((thread) => (
          <Singlethread
            key={thread.id}
            id={thread.id}
            text={thread.text}
            onChange={handlethreadChange}
            onRemove={handleRemovethread}
            onAdd={handleAddthread}
          />
        ))}
      </div>
      <Button
      className="my-2 w-52 self-end bg-black" size="md"
      onClick={handlePost}
      >
        {isLoading ?
        <Loading text="Processing..."/> :
        "Publish"}
      </Button>
    </Card>
  );
};

export default threadPost;
