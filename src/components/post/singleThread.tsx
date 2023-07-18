import React, { ChangeEvent, useRef } from "react";

type SinglethreadProps = {
  id: number;
  text: string;
  onChange: (id: number, text: string) => void;
  onRemove: (id: number) => void;
  onAdd: (id: number) => void;
};

const SingleThread: React.FC<SinglethreadProps> = ({
  id,
  text,
  onChange,
  onRemove,
  onAdd
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [count, setCount] = React.useState(500);


  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    const textarea = textareaRef.current;

  if (textarea) {
    textarea.style.height = 'auto'; // Reset the height
    textarea.style.height = `${textarea.scrollHeight}px`; // Adjust the height based on the content
  }
    setCount(500 - event.target.value.length);
    onChange(id, newText);
  };

  return (
    <div className=" border-l-2  border-blue-gray-500 pl-3">
      {/* <Avatar src="/user.png" size="md" className="border-2 border-white" /> */}
      <textarea
        ref={textareaRef}
        className="block w-full min-h-[100px] max-h-[300px] h-full resize-none overflow-y-auto  bg-transparent focus:outline-none"
        value={text}
        onChange={handleChange}
        placeholder="What's happening?"
      />
      {/* <button onClick={() => onRemove(id)}>Remove</button> */}
      <div className="flex items-center  justify-end">
          <span
            className={`${
              count > 0 ? "text-accent" : "text-red-600"
            } mr-2 text-sm`}
          >
            {count}
          </span>
          <button
            onClick={() => onRemove(id)}
            className="rounded-full bg-red-600 w-8 h-8 grid place-content-center text-white"
          >
            -
          </button>
          <button
          onClick={() => onAdd(id)}
          className="rounded-full bg-primary h-8 w-8 important grid place-content-center text-white ml-2"
        >
          +
        </button>
        </div>
    </div>
  );
};

export default SingleThread;
