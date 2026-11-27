"use client";

import { useActionState, useState } from "react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Textarea } from "@/components/ui/input";
import { placeOrder, type CheckoutState } from "@/lib/actions/market";
import {
  deliveryFeeFor,
  GRABBIT_FEE,
  type DeliveryMethod,
} from "@/lib/delivery-fees";
import { formatPrice } from "@/lib/format";

const initialState: CheckoutState = {};

export function CheckoutForm({
  subtotal,
  deliveryFee,
}: {
  subtotal: number;
  deliveryFee: number;
}) {
  const [state, action, pending] = useActionState(placeOrder, initialState);
  const [method, setMethod] = useState<DeliveryMethod>("delivery");
  const total = subtotal + deliveryFeeFor(method, deliveryFee);

  const messages: Record<string, string> = {
    name: "Enter your full name.",
    phone: "Enter a Mauritius mobile, e.g. 5123 4567.",
    address: "Enter the delivery address.",
  };
  const err = (field: string) =>
    state.errors?.[field]
      ? (messages[field] ?? "Check this field.")
      : undefined;

  return (
    <form action={action} className="flex flex-col gap-5" noValidate>
      {state.formError ? (
        <p
          role="alert"
          className="rounded-button bg-lime-100 p-3 text-body text-lime-700"
        >
          {state.formError === "empty"
            ? "Your cart is empty. Add something first."
            : "Something went wrong. Please try again."}
        </p>
      ) : null}

      <div className="grid gap-4 tablet:grid-cols-2">
        <Field htmlFor="name" label="Full name" error={err("name")}>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>
        <Field
          htmlFor="phone"
          label="Phone"
          helper="Mauritius mobile, e.g. 5123 4567"
          error={err("phone")}
        >
          <Input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            prefix="+230"
            required
          />
        </Field>
      </div>

      <Field htmlFor="address" label="Delivery address" error={err("address")}>
        <Textarea id="address" name="address" rows={3} required />
      </Field>

      <Field htmlFor="note" label="Note for the shop (optional)">
        <Input id="note" name="note" />
      </Field>

      <fieldset>
        <legend className="text-label text-ink-700">Delivery</legend>
        <div className="mt-2 grid gap-2">
          {(
            [
              {
                value: "delivery",
                title: "Shop delivery",
                note: "The shop's own rider",
                price: formatPrice(deliveryFee),
              },
              {
                value: "grabbit",
                title: "Grabbit Express",
                note: "Electric · live tracking · insured",
                price: formatPrice(GRABBIT_FEE),
              },
              {
                value: "pickup",
                title: "Pickup",
                note: "Rose Hill · ready in about 1 h",
                price: "Free",
              },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-button border px-3 py-2 text-body ${
                method === option.value
                  ? "border-ink-900 bg-lime-50"
                  : "border-ink-100 bg-surface"
              }`}
            >
              <input
                type="radio"
                name="deliveryMethod"
                value={option.value}
                checked={method === option.value}
                onChange={() => setMethod(option.value)}
              />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-ink-900">
                  {option.title}
                </span>
                <span className="block text-caption text-ink-500">
                  {option.note}
                </span>
              </span>
              <span className="shrink-0 font-semibold tabular-price text-ink-900">
                {option.price}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="text-label text-ink-700">Payment</legend>
        <div className="mt-2 grid gap-2">
          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-button border border-ink-100 bg-surface px-3 text-body">
            <input
              type="radio"
              name="paymentMethod"
              value="juice"
              defaultChecked
            />
            Juice · pay instantly
          </label>
          <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-button border border-ink-100 bg-surface px-3 text-body">
            <input type="radio" name="paymentMethod" value="cod" />
            Cash on delivery
          </label>
        </div>
      </fieldset>

      <div className="flex items-center justify-between border-t border-ink-100 pt-4">
        <div>
          <p className="text-caption text-ink-500">Total</p>
          <p className="text-h2 tabular-price text-ink-900">
            {formatPrice(total)}
          </p>
        </div>
        <Button type="submit" variant="cta" size="lg" loading={pending}>
          Place order
        </Button>
      </div>
    </form>
  );
}
