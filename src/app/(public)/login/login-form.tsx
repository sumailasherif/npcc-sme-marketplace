"use client";

import { useActionState, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { describedBy, Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { sendCode, verifyCode, type LoginState } from "./actions";

export function LoginForm({ next }: { next: string }) {
  const t = useTranslations("Auth");
  const tv = useTranslations("Validation");

  const [sendState, sendAction, sending] = useActionState<LoginState, FormData>(
    sendCode,
    { step: "email" },
  );
  const [verifyState, verifyAction, verifying] = useActionState<
    LoginState,
    FormData
  >(verifyCode, { step: "email" });
  // "Use a different email" remembers which send result it hid; the next
  // send result is a new object, so the code step shows again by itself.
  const [hiddenResult, setHiddenResult] = useState<LoginState | null>(null);

  const onCodeStep = sendState.step === "code" && hiddenResult !== sendState;
  const email = sendState.email ?? "";

  if (!onCodeStep) {
    const error = sendState.step === "email" ? sendState.error : undefined;
    return (
      <form action={sendAction} className="flex flex-col gap-4" noValidate>
        <Field
          htmlFor="email"
          label={t("emailLabel")}
          error={error ? tv(error) : undefined}
        >
          <Input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoCapitalize="none"
            spellCheck={false}
            required
            defaultValue={email}
            placeholder={t("emailPlaceholder")}
            aria-invalid={Boolean(error)}
            aria-describedby={describedBy("email", { error })}
          />
        </Field>
        <Button type="submit" size="lg" loading={sending}>
          {t("sendCode")}
        </Button>
      </form>
    );
  }

  // Only show a verify error for the email currently on screen.
  const codeError =
    verifyState.step === "code" && verifyState.email === email
      ? verifyState.error
      : undefined;
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-h2">{t("codeTitle")}</h2>
        <p className="text-body-l text-ink-700">{t("codeSent", { email })}</p>
      </div>

      <form action={verifyAction} className="flex flex-col gap-4" noValidate>
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="next" value={next} />
        <Field
          htmlFor="code"
          label={t("codeLabel")}
          helper={t("spamHint")}
          error={codeError ? tv(codeError) : undefined}
        >
          <Input
            id="code"
            name="code"
            inputMode="numeric"
            autoComplete="one-time-code"
            pattern="[0-9]{6}"
            maxLength={6}
            required
            autoFocus
            className="text-h2 tracking-[0.5em]"
            aria-invalid={Boolean(codeError)}
            aria-describedby={describedBy("code", {
              error: codeError,
              helper: true,
            })}
          />
        </Field>
        <Button type="submit" size="lg" loading={verifying}>
          {t("verify")}
        </Button>
      </form>

      <div className="flex flex-col gap-1 tablet:flex-row">
        <form action={sendAction}>
          <input type="hidden" name="email" value={email} />
          <input type="hidden" name="resend" value="1" />
          <Button type="submit" variant="ghost" loading={sending}>
            {t("resend")}
          </Button>
        </form>
        <Button variant="ghost" onClick={() => setHiddenResult(sendState)}>
          {t("changeEmail")}
        </Button>
      </div>
    </div>
  );
}
