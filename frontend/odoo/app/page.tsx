import { redirect } from "next/navigation";

export default function RootPage() {
  // Hackathon logic: Directly route incoming traffic straight to the operational dashboard
  // Later, Developer A can add an auth check here: if (!loggedIn) redirect('/login')
  redirect("/dashboard");
}