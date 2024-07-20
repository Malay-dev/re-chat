import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import Body from "@/components/Body";
import ChatForm from "@/components/ChatForm";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import { ScrollArea } from "@/components/ui/scroll-area";
interface IParams {
  conversationId: string;
}

const ConversationID = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <main className="flex md:flex-1 md:flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <EmptyState></EmptyState>
      </main>
    );
  }
  return (
    <main className="flex h-full relative min-h-[100vh] flex-col rounded-xl bg-muted/50  lg:col-span-2">
      <Header conversation={conversation}></Header>
      <MobileHeader conversation={conversation}></MobileHeader>
      <ScrollArea className="h-[70vh]">
        <Body initialMessages={messages}></Body>
      </ScrollArea>
      <ChatForm></ChatForm>
    </main>
  );
};

export default ConversationID;
