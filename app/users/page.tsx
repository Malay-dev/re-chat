import EmptyState from "@/components/EmptyState";

export default function Dashboard() {
  return (
    <main className="hidden md:flex md:flex-1 md:flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <EmptyState></EmptyState>
    </main>
  );
}
