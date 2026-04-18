// app/dashboard/investor/[id]/page.tsx

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetail({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Project Details: {id}</h1>
      <p className="mt-4 text-gray-400">
        This is where you will display the CloudSync Pro details (Commits, Team, Investor Interest).
      </p>
      {/* You can now fetch data here using the 'id' to show the specific startup info */}
    </main>
  );
}