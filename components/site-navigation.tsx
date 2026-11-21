"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function SiteNavigation({ children, items }: {
  children: ReactNode;
  items: { label: string; href: string }[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [compact, setCompact] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const update = () => setCompact(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  function closeOnEscape(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key !== "Escape" || !expanded) return;
    setExpanded(false);
    trigger.current?.focus();
  }

  function followLink(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!expanded || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    setExpanded(false);

    const target = new URL(event.currentTarget.href);
    if (target.pathname !== window.location.pathname) return;
    const section = document.getElementById(target.hash.slice(1));
    if (!section) return;

    event.preventDefault();
    if (window.location.hash !== target.hash) window.history.pushState(null, "", target.hash);
    section.scrollIntoView();
    const heading = section.querySelector<HTMLElement>("h1, h2");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }
  }

  return (
    <header className="site-header" data-compact={compact} onKeyDown={closeOnEscape}>
      <div className="shell header-shell">
        {children}
        <button ref={trigger} type="button" className="nav-toggle" aria-expanded={expanded}
          aria-controls="site-navigation" aria-label={expanded ? "Fechar menu" : "Abrir menu"}
          onClick={() => setExpanded(!expanded)}>
          {expanded ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
        <nav id="site-navigation" className="main-nav" aria-label="Menu principal" data-expanded={expanded}>
          {items.map(({ label, href }) => <a key={href} href={href} onClick={followLink}>{label}</a>)}
          <a className="button button-primary nav-mobile-cta" href="/#simulacao" onClick={followLink}>Simular crédito</a>
        </nav>
        <a className="button button-header nav-desktop-cta" href="/#simulacao">Simular crédito</a>
      </div>
    </header>
  );
}
