import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/useChatStore";

const ChatHeader = () => {
  const { selectedUser, onlineUsers } = useChatStore();

  if (!selectedUser) return null;
  console.log(onlineUsers);

  return (
    <div className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage referrerPolicy="no-referrer" src={selectedUser.imageUrl} />
          <AvatarFallback>{selectedUser.fullName[0]}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-medium">{selectedUser.fullName}</h2>
          <p
            className={`text-sm ${
              onlineUsers.has(selectedUser._id) ? "text-green-500" : "text-zinc-400"
            }`}
          >
            {onlineUsers.has(selectedUser._id) ? "Online" : "Offline"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default ChatHeader;
