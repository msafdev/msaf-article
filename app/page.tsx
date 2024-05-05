"use client";

import { useChat } from "ai/react";

import { SiGooglegemini } from "react-icons/si";
import { RxArrowDown, RxArrowUp } from "react-icons/rx";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";

export default function Chat() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    reload,
    error,
    isLoading,
  } = useChat();

  console.log(isLoading);

  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error.message || "An unexpected error occurred.",
        action: (
          <ToastAction altText="Reload" onClick={() => reload()}>
            Reload
          </ToastAction>
        ),
      });
    }
  }, [error]);

  return (
    <div
      className={`flex flex-col w-full max-w-xl py-24 mx-auto stretch px-4 gap-y-4`}
    >
      <ul className="flex flex-col gap-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`whitespace-pre-wrap flex flex-col gap-y-3 relative ${
              isLoading ? "[&>svg]:last:animate-spin [&>svg]:last:-left-12" : ""
            }`}
          >
            {message.role === "user" ? (
              <p className="text-foreground mb-4 font-medium w-fit ml-auto text-right">
                {message.content}
              </p>
            ) : (
              <>
                <SiGooglegemini className="w-8 h-8 text-[#4D88D4] p-1.5 rounded-full border shrink-0 bg-popover md:absolute md:-translate-x-full md:-left-4 md:top-1" />
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  className="flex flex-col w-full overflow-x-auto"
                >
                  {message.content}
                </Markdown>
              </>
            )}
          </div>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        className={`fixed w-full h-fit max-w-none md:max-w-[544px] left-0 md:left-auto px-4 md:px-0 bg-gradient-to-t from-background via-background/60 to-transparent transition-all duration-300 ease-in-out ${
          messages.length > 0 ? "bottom-0 pb-6" : "bottom-1/2"
        }`}
      >
        <div className="flex py-3 pl-6 pr-4 bg-primary rounded-full shadow-xl gap-x-1">
          <input
            className="w-full text-primary-foreground bg-transparent active:outline-none focus:outline-none"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="group opacity-0"
            disabled={!input}
            title="Send"
          />
          <button
            onClick={(e) => {
              // Scroll to Bottom
              e.preventDefault();
              window.scrollTo(0, document.body.scrollHeight);
            }}
            className="group"
          >
            <RxArrowDown className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
          </button>
          <button
            onClick={(e) => {
              // Scroll to Top
              e.preventDefault();
              window.scrollTo(0, 0);
            }}
            className="group"
          >
            <RxArrowUp className="w-4 h-4 text-muted-foreground group-hover:text-primary-foreground" />
          </button>
        </div>
      </form>
    </div>
  );
}
