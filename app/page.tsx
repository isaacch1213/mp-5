import { Metadata } from 'next';
import Home from "@/components/Home";

export const metadata: Metadata = {
  title: "Home | URL Shortener",
};

export default function HomePage() {
  return (
    <Home />
  );
}
