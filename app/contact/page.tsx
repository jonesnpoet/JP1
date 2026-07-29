import type { Metadata } from "next";
import ContactView from "@/components/contact/ContactView";

export const metadata: Metadata = {
  title: "Contact — Jones + Poet",
  description: "Get in touch with Jones + Poet about your next project.",
};

export default function Contact() {
  return (
    <main className="bg-[#f9f4e3]">
      <ContactView />
    </main>
  );
}
