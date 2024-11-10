// pages/chinessecook/index.tsx
import { useSession } from "next-auth/react";
import DashboardLayout from "@/layouts/DashboardLayout";

const Dashboard = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      window.location.href = "/login";
    },
  });

  if (!session) return null;

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold">Welcome to the Dashboard page</h1>
      <p className="mt-4">This is the main dashboard page.</p>
    </DashboardLayout>
  );
};

export default Dashboard;
