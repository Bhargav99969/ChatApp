import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { CloudCog, Loader } from "lucide-react";
import { formatMessageTime } from "../utils";
import ChatHeader from "./ChatHeader";
import { useAuthStore } from "../store/useAuthStore";
import MessageInput from "./MessageInput";

function ChatContainer() {
  const messages = useChatStore((state) => state.mesaages);
  const selectedUser = useChatStore((state) => state.selectedUser);
  const getMessages = useChatStore((state) => state.getMessages);
  const isMessagesLoading = useChatStore((state) => state.isMessagesLoading);
  const authUser = useAuthStore((state) => state.authUser);
  const messageEndRef = useRef(null);
  const subscribeToMessages = useChatStore(
    (state) => state.subscribeToMessages
  );
  const unsubcribe = useChatStore((state) => state.unsubcribe);

  useEffect(() => {
    if (selectedUser && selectedUser._id) {
      getMessages(selectedUser._id);
      subscribeToMessages()

      return()=>unsubcribe()
    }
  }, [selectedUser, getMessages,subscribeToMessages,unsubcribe]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) return <Loader />;

  if (!selectedUser) {
    return <div>No user selected.</div>;
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              {console.log(authUser._id)}
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || "./asset/react.svg"
                        : selectedUser.profilePic || "/.asset/react.png"
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        )}
      </div>

      <MessageInput />
    </div>
  );
}

export default ChatContainer;
