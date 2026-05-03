import Link from "next/link";
import { Logo } from "./Logo";

const footerLinks = {
  Company: [
    { label: "About", href: "/about" },
    { label: "Case Study", href: "/case-study" },
    { label: "Contact", href: "/contact" },
  ],
  Solutions: [
    { label: "AI Front Desk", href: "/solutions#front-desk" },
    { label: "Workflow Automation", href: "/solutions#workflow" },
    { label: "Communication Layer", href: "/solutions#communication" },
    { label: "AI Operating System", href: "/solutions#ai-os" },
  ],
  Industries: [
    { label: "Dental Practices", href: "/industries#dental" },
    { label: "Law Firms", href: "/industries#legal" },
    { label: "Medical Clinics", href: "/industries#medical" },
    { label: "Service Businesses", href: "/industries#services" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-neutral-500 leading-relaxed max-w-xs">
              AI operating systems for modern service businesses.
            </p>
            <a
              href="mailto:roy@ilos.ai"
              className="mt-4 inline-block text-sm text-neutral-500 hover:text-white transition-colors"
            >
              roy@ilos.ai
            </a>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-neutral-600 mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()} ilos.ai. All rights reserved.
          </p>
          <p className="text-sm text-neutral-600">
            InfluenceLayer Operating System
          </p>
        </div>
      </div>
    </footer>
  );
}
