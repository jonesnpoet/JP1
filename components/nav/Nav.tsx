"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { canelaBold } from "@/components/fonts";
import { useProjectTransition } from "@/components/project-transition/project-transition-context";
import styles from "./Nav.module.css";
import NavWordmark from "./NavWordmark";

const TABS = [
  { href: "/", label: "Projects", isActive: (path: string) => path === "/" || path.startsWith("/projects/") },
  { href: "/about", label: "About", isActive: (path: string) => path.startsWith("/about") },
  { href: "/contact", label: "Contact", isActive: (path: string) => path.startsWith("/contact") },
];

const STAGGER_MS = 60;

// The monogram mark itself is <MonogramLogo />, a separate fixed-position
// element whose "docked" transform lands it exactly over this bar's
// top-left padding so it reads as this nav's logo -- it lives outside this
// component entirely (mounted by SiteIntroProvider) and is unaffected by
// the fade below, since the locked intro/monogram styling isn't touched
// here. NavWordmark, rendered as this header's own child, fades along
// with the nav links during project transitions.
export default function Nav() {
  const { transitioning } = useProjectTransition();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
  }

  useEffect(() => {
    if (!menuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  return (
    <header className={[styles.nav, transitioning && styles.fading].filter(Boolean).join(" ")}>
      <NavWordmark />
      <nav className={styles.links} aria-label="Primary">
        {TABS.map(({ href, label, isActive }) => (
          <Link
            key={href}
            href={href}
            className={[canelaBold.className, styles.link, isActive(pathname) && styles.linkActive]
              .filter(Boolean)
              .join(" ")}
          >
            {label}
          </Link>
        ))}
      </nav>

      <div ref={menuRef} className={styles.mobileNav}>
        <button
          type="button"
          className={[styles.menuToggle, menuOpen && styles.menuToggleOpen].filter(Boolean).join(" ")}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <nav
          id="mobile-menu"
          className={[styles.mobileMenu, menuOpen && styles.mobileMenuOpen].filter(Boolean).join(" ")}
          aria-label="Primary"
        >
          {TABS.map(({ href, label, isActive }, i) => (
            <Link
              key={href}
              href={href}
              className={[canelaBold.className, styles.mobileLink, isActive(pathname) && styles.linkActive]
                .filter(Boolean)
                .join(" ")}
              style={{ transitionDelay: menuOpen ? `${i * STAGGER_MS}ms` : "0ms" }}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
