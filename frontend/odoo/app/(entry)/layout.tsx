import Sidebar from "../components/sidebar";
import Navbar from "../components/navbar";

export default function EntryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-[#FDF8F8] flex antialiased text-[#2B2325]">
      {/* Left fixed tracking deck */}
      <Sidebar />

      {/* Main scrolling viewport workspace */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        <Navbar />
        
        {/* Functional Content Injections */}
        <main className="flex-1 p-8 bg-[#FDF8F8]">
          {children}
        </main>
      </div>
    </div>
  );
}