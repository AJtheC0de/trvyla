import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37a4 4 0 1 1-7.914 1.174 4 4 0 0 1 7.914-1.174z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

type FooterLink = { label: string; href: string };

const PRODUCT_LINKS: FooterLink[] = [
  { label: "Discover Experiences", href: "/#experiences" },
  { label: "Start as a Host", href: "/#hosts" },
  { label: "How it works", href: "/#platform" },
];

const COMPANY_LINKS: FooterLink[] = [
  { label: "About us", href: "#" },
  { label: "Careers", href: "/careers" },
  { label: "Press", href: "/press" },
];

const LEGAL_LINKS: FooterLink[] = [
  { label: "Imprint", href: "/imprint" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  { title: "Product", links: PRODUCT_LINKS },
  { title: "Company", links: COMPANY_LINKS },
  { title: "Legal", links: LEGAL_LINKS },
];

export default function Footer() {
  return (
    <footer className="bg-ivory px-6 pb-10 pt-4 lg:px-8">
      <div className="mx-auto max-w-6xl border-t border-ink/10 pt-14">
        <div className="flex flex-col gap-12 sm:flex-row sm:justify-between">
          <div className="max-w-xs">
            <Image
              src="/images/logo-travyl.png"
              alt="Travyl"
              width={1961}
              height={1080}
              className="h-7 w-auto"
            />
            <p className="mt-4 text-sm leading-relaxed text-ink/55">
              Bringing travellers and locals together through real
              experiences, matched to interests, place, and time.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com/travyl.app/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-coral/40 hover:text-coral"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="mailto:booking@travyl.app"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-coral/40 hover:text-coral"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <p className="eyebrow text-xs text-ink/40">{col.title}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-sm text-ink/65 transition-colors hover:text-ink"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col-reverse items-center justify-between gap-4 border-t border-ink/10 pt-6 sm:flex-row">
          <p className="text-xs text-ink/40">
            © {new Date().getFullYear()} Travyl. All rights reserved.
          </p>
          <p className="eyebrow text-xs text-coral">travyl</p>
        </div>
      </div>
    </footer>
  );
}
