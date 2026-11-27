import { redirect } from "next/navigation";

/** Personal listings now live in the My Pre-loved dashboard. */
export default function MyListingsPage() {
  redirect("/preloved/me");
}
