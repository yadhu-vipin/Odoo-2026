'use client'
import { useState } from "react";
import { AuthInput } from "../signin/page";
import axios from "axios";
import { ArrowLeft, ArrowRight, Mail, MailCheck, Truck, ShieldAlert, Activity } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");

      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/forgot-password`, {
        email,
      });

      setSent(true);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Recovery request failed");
      } else {
        setError("Recovery request failed");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 flex flex-col justify-between font-sans relative overflow-hidden selection:bg-[#B9004B]/10 selection:text-[#B9004B]">
      
      {/* Structural Operational Grid Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#B9004B]/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-7xl mx-auto px-6 sm:px-12 py-6 flex items-center justify-between z-10 relative">
        <div className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-[#B9004B] to-[#7A0032] rounded-xl shadow-md shadow-[#B9004B]/10">
            <Truck className="h-5 w-5 text-white stroke-[2.5]" />
          </div>
          <span>TransitOps</span>
        </div>
        <a href="#support" className="text-xs font-bold uppercase tracking-wider text-gray-500 hover:text-[#B9004B] transition-colors">
          System Support
        </a>
      </header>

      {/* Main Container Split */}
      <main className="max-w-7xl mx-auto w-full px-6 sm:px-12 py-6 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 flex-1 z-10 relative">
        
        {/* Left Information Panel */}
        <div className="flex-1 space-y-8 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-[11px] font-bold tracking-wider uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9004B] animate-pulse" />
            Security Gateway
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-gray-900 leading-[1.1]">
            Account <br />
            <span className="bg-gradient-to-r from-[#B9004B] via-[#E01E6E] to-pink-600 bg-clip-text text-transparent">
              Access Recovery
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md font-medium">
            Restore your secure connection to the platform terminal. Follow the verification steps to safeguard your transit infrastructure credentials.
          </p>

          {/* Micro Telemetry Metrics */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white border border-gray-200 p-5 rounded-2xl space-y-1 relative group hover:border-gray-300 transition-colors shadow-sm">
              <div className="absolute top-3 right-3 text-[#B9004B] opacity-60"><Activity className="h-4 w-4" /></div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">99.99%</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Operational SLA</div>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl space-y-1 relative group hover:border-gray-300 transition-colors shadow-sm">
              <div className="absolute top-3 right-3 text-blue-600 opacity-60"><ShieldAlert className="h-4 w-4" /></div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">Encrypted</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Identity Layer</div>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Card */}
        <div className="w-full max-w-md bg-white border border-gray-200 p-8 sm:p-10 rounded-[32px] shadow-xl shadow-gray-200/30 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B9004B]/40 to-transparent" />
          
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-black tracking-tight text-gray-900">
                Recover Account
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                Enter your details to request a password reset link
              </p>
            </div>

            {/* Error Message Presentation */}
            {error && (
              <div className="mb-4 p-3.5 rounded-xl bg-[#FFF5F7] text-[#B9004B] border border-[#FAD8E1] text-xs font-semibold">
                {error}
              </div>
            )}

            {/* Content Swap States */}
            {sent ? (
              <div className="space-y-4 text-center py-6 bg-[#F9FAFB] border border-gray-200 rounded-2xl p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#FCE8EF] text-[#B9004B] shadow-sm">
                  <MailCheck className="h-6 w-6 stroke-[2.5]" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-black text-gray-900">Check your inbox</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">
                    We sent a token recovery link to <span className="font-bold text-gray-750">{email}</span>. It will remain active for 10 minutes.
                  </p>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <AuthInput
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="name@transitops.com"
                  icon={<Mail className="h-4 w-4" />}
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-[#B9004B] to-[#91003B] hover:from-[#CD0053] hover:to-[#A30043] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#B9004B]/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {loading ? "Sending Node Request..." : "Send Recovery Link"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Redirection Navigation Area */}
            <div className="mt-8 pt-5 border-t border-gray-200 text-center">
              <p className="text-gray-500 text-xs font-medium">
                Remember your credentials?
                <a
                  href="/auth/signin"
                  className="text-[#B9004B] font-bold hover:underline ml-1.5 inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-3 w-3" /> Sign In
                </a>
              </p>
            </div>
          </div>

          {/* Safety Helper Box */}
          <div className="mt-6 p-4 rounded-xl bg-[#F9FAFB] border border-gray-200 text-[11px] text-gray-500 leading-normal font-medium">
            <span className="font-bold text-gray-700 block mb-0.5">Safety First:</span>
            Check your system filters if you don't receive the token within 2 minutes. Links expire after 30 minutes for security optimization.
          </div>
        </div>
      </main>

      {/* Styled Footer */}
      <footer className="w-full border-t border-gray-200 bg-white text-gray-500 text-xs py-5 z-10 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-bold text-gray-700 flex items-center gap-1.5 tracking-tight">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B9004B]" />
            TransitOps Systems
          </div>
          <div className="flex flex-wrap items-center gap-6 font-medium">
            <a href="#privacy" className="hover:text-gray-900 transition-colors">Privacy</a>
            <a href="#terms" className="hover:text-gray-900 transition-colors">Terms</a>
            <a href="#security" className="hover:text-gray-900 transition-colors">Security Architecture</a>
          </div>
          <div className="text-gray-400">© 2026 TransitOps Infrastructure Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}