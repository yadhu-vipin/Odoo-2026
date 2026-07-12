'use client'
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { Mail, Lock, ArrowRight, Eye, Truck, Activity, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

// AuthInput updated to match the high-personality light theme aesthetics
export function AuthInput({
  id,
  label,
  type = "text",
  placeholder,
  icon,
  required = false,
  value,
  onChange,
  rightSlot,
}: {
  id: string;
  label: string;
  type: string;
  placeholder: string;
  icon: React.ReactNode;
  required: boolean;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  rightSlot?: any;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center px-0.5">
        <label
          htmlFor={id}
          className="block text-[10px] font-bold tracking-wider uppercase text-gray-500"
        >
          {label}
        </label>
        {rightSlot}
      </div>
      <div className="relative w-full">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className="w-full pl-11 pr-11 py-3 bg-[#F9FAFB] rounded-xl border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#B9004B] focus:ring-1 focus:ring-[#B9004B] transition-all"
        />
        {type === "password" && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer hover:text-gray-600">
            <Eye className="h-4 w-4" />
          </span>
        )}
      </div>
    </div>
  );
}

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        email: email,
        password: password,
      };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        payload,
        { withCredentials: true }
      );
      if (res.status !== 200) {
        throw new Error("Authentication failed");
      }

      toast.success("Login successful!");
      toast.info("Redirecting...");
      setTimeout(() => {
        window.location.href = res.data.isAdmin ? "/adminSettings" : "/";
      }, 1000);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Signup failed");
      } else {
        toast.error("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 flex flex-col justify-between font-sans relative overflow-hidden selection:bg-[#B9004B]/10 selection:text-[#B9004B]">
      {/* Structural Operational Grid Overlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#E5E7EB_1px,transparent_1px),linear-gradient(to_bottom,#E5E7EB_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-60 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#B9004B]/5 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[160px] pointer-events-none" />

      <ToastContainer position="top-right" theme="light" autoClose={3000} />

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
            Control Center Gateway
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black tracking-tight text-gray-900 leading-[1.1]">
            Access the Core <br />
            <span className="bg-gradient-to-r from-[#B9004B] via-[#E01E6E] to-pink-600 bg-clip-text text-transparent">
              Routing Matrix
            </span>
          </h1>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-md font-medium">
            Log in to safely provision load updates, synchronize live fleet telemetric configurations, and evaluate global line hauls.
          </p>

          {/* Micro Telemetry Metrics */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="bg-white border border-gray-200 p-5 rounded-2xl space-y-1 relative group hover:border-gray-300 transition-colors shadow-sm">
              <div className="absolute top-3 right-3 text-[#B9004B] opacity-60"><Activity className="h-4 w-4" /></div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">99.99%</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Operational SLA</div>
            </div>
            <div className="bg-white border border-gray-200 p-5 rounded-2xl space-y-1 relative group hover:border-gray-300 transition-colors shadow-sm">
              <div className="absolute top-3 right-3 text-blue-600 opacity-60"><ShieldCheck className="h-4 w-4" /></div>
              <div className="text-2xl font-black text-gray-900 tracking-tight">Real-Time</div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Fleet Telemetry</div>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Card */}
        <div className="w-full max-w-md bg-white border border-gray-200 p-8 sm:p-10 rounded-[32px] shadow-xl shadow-gray-200/30 relative">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#B9004B]/40 to-transparent" />
          
          <div className="mb-8">
            <h2 className="text-2xl font-black tracking-tight text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              Access your logistics control center
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
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

            <AuthInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightSlot={
                <a
                  href="/auth/forgot-password"
                  className="text-xs font-bold text-[#B9004B] hover:underline transition-colors tracking-tight"
                >
                  Forgot password?
                </a>
              }
            />

            {/* Remember Me Checkbox */}
            <div className="flex items-center gap-2.5 pt-1">
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 rounded bg-[#F9FAFB] border-gray-200 text-[#B9004B] focus:ring-[#B9004B] focus:ring-offset-0"
              />
              <label htmlFor="remember" className="text-xs text-gray-500 font-medium select-none">
                Remember me for 30 days
              </label>
            </div>

            {/* CTA Execution Button */}
            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-[#B9004B] to-[#91003B] hover:from-[#CD0053] hover:to-[#A30043] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#B9004B]/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50 disabled:pointer-events-none"
              >
                {loading ? "Signing in..." : "Sign In"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-white px-3 text-gray-400 font-medium tracking-tight text-[11px]">
                Trusted by 500+ fleets
              </span>
            </div>
          </div>

          {/* Alternate Redirection Route Area */}
          <div
            onClick={() => {
              setIsVerifying(false);
            }}
            className="text-center"
          >
            <p className="text-gray-500 text-xs font-medium">
              Don't have an account?
              <a
                href="/auth/signup"
                className="text-[#B9004B] font-bold hover:underline ml-1 inline-flex items-center gap-0.5"
              >
                Sign Up
              </a>
            </p>
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