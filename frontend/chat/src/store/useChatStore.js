import { create } from "zustand"
import toast from "react-hot-toast"
import { axiosInstance } from "../config"
import { useAuthStore } from "./useAuthStore";


export const useChatStore=create((set,get)=>({
    mesaages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,

    getUser:async()=>{
        set({isUserLoading:true});
        try {
            const res=await axiosInstance.get("/message/user")
            console.log("Response from user: ",res)
            set({users:res.data.filteredUser})

        } catch (error) {
            toast.error("error no user found")
        }finally{
            set({isUserLoading:false})

        }
    },
    getMessages:async(userId)=>{
         set({isMessagesLoading:true});
        try {
            const res=await axiosInstance.get(`message/${userId}`)
            set({mesaages:res.data})

        } catch (error) {
            toast.error("error no user found")
        }finally{
            set({isMessagesLoading:false})

        }
    },
// Inside your `useChatStore.js`

sendMessage: async (message) => {
    const { selectedUser, socket } = get();

    // Send message via API
    try {
        const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, {
            receiverId: selectedUser._id,
            text: message.text,
        });

        // Update local state with the newly sent message
        // set({ messages: [...get().messages, res.data] });

        set({
        mesaages: [...get().mesaages, res.data]
      });

        // Emit message to the other user through socket
        if (socket && selectedUser) {
            socket.emit('message', { message: res.data, userId: selectedUser._id });
        }
    } catch (error) {
        console.error('Error sending message:', error);
    }
},

subscribeToMessages: () => {
  const { selectedUser, mesaages } = get();
  const socket = useAuthStore.getState().socket;

  if (!socket || !selectedUser) return;

    // Prevent duplicate listeners
  socket.off("x");

  socket.on("x", (newMessage) => {
    
    if (
      newMessage.senderId === selectedUser._id ||
      newMessage.recieverId === selectedUser._id
    ) {
      set({
        mesaages: [...get().mesaages, newMessage],
      });
    }
  });
},

unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  if (socket) {
    socket.off("x");
  }
},


    setSelectedUser:(selectedUser)=>set({selectedUser})


}))


