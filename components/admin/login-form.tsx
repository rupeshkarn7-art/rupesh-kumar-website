"use client";

import { useActionState } from "react";
import { sendMagicLink, type LoginState } from "@/lib/actions/auth";
import { buttonClass } from "@/components/ui";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(sendMagicLink, { status: "idle" });
  if (state.status === "sent") {
    return <p role="status" className="mt-6 rounded-lg border border-ok/25 bg-[#eef6f0] px-4 py-3 text-[14.5px] text-ok">{state.message}</p>;
  }
  return (
    <form action={action} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className="input" />
      </div>
      {state.status === "error" && <p role="alert" className="text-[14px] text-danger">{state.message}</p>}
      <button className={buttonClass("primary", "lg", "w-full")} disabled={pending}>
        {pending ? "Sending…" : "Email me a sign-in link"}
      </button>
    </form>
  );
}
