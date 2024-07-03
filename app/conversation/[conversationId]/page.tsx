import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";

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
    <main className="">
      <Header conversation={conversation}></Header>
      <MobileHeader conversation={conversation}></MobileHeader>
    </main>
  );
};

export default ConversationID;
