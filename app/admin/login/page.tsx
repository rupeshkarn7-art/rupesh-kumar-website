import { LoginForm } from "@/components/admin/login-form";
import { Logo } from "@/components/layout/header";

const errors: Record<string, string> = {
  unauthorised: "That account isn't authorised to manage this site.",
  link: "That sign-in link is invalid or has expired. Request a new one.",
  config: "Supabase environment variables are missing on this deployment.",
};

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <div className="grid min-h-dvh place-items-center px-5 py-16">
      <div className="w-full max-w-[420px]">
        <Logo />
        <div className="card mt-8 p-7 sm:p-9">
          <h1 className="text-[24px] font-semibold tracking-tight text-ink">Admin sign in</h1>
          <p className="mt-2 text-[15px] text-muted">Enter your email and I&apos;ll send you a secure, one-time sign-in link. Only the site owner can sign in.</p>
          {error && errors[error] && (
            <p role="alert" className="mt-5 rounded-lg border border-danger/25 bg-[#fbeceb] px-4 py-3 text-[14px] text-danger">{errors[error]}</p>
          )}
          <LoginForm />
        </div>
        <p className="mt-6 text-center text-[13px] text-muted"><a href="/" className="link-underline">← Back to the website</a></p>
      </div>
    </div>
  );
}
