import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/components/EmptyState";

interface IParams {
  conversationId: string;
}

const ConversationID = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <main className="hidden md:flex md:flex-1 md:flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <EmptyState></EmptyState>
      </main>
    );
  }
};

export default ConversationID;
