"use client";

import { ClipboardList } from "lucide-react";
import { useEffect, useRef, useState, type ComponentType } from "react";
import styles from "./simulation-form.module.css";

type FormProps = { whatsappUrl: string; requiresAmount: boolean };

export function DeferredSimulationForm({ whatsappUrl, requiresAmount }: FormProps) {
  const container = useRef<HTMLDivElement>(null);
  const [Form, setForm] = useState<ComponentType<FormProps> | null>(null);

  useEffect(() => {
    const target = container.current;
    if (!target) return;
    let active = true;
    let observer: IntersectionObserver | undefined;

    function load() {
      void import("./simulation-form").then(({ SimulationForm }) => {
        if (active) setForm(() => SimulationForm);
      }).catch(() => {
        // The WhatsApp alternative stays available if the form bundle cannot load.
      });
    }

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(([entry], watcher) => {
        if (!entry.isIntersecting) return;
        watcher.disconnect();
        load();
      }, { rootMargin: "400px" });
      observer.observe(target);
    } else {
      load();
    }

    return () => {
      active = false;
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={container} className="simulation-form-shell">
      {Form ? <Form whatsappUrl={whatsappUrl} requiresAmount={requiresAmount} /> : (
        <div className={`${styles.card} form-placeholder`}>
          <div className={styles.heading}>
            <span className={styles.headingIcon}><ClipboardList size={19} aria-hidden="true" /></span>
            <h3>Seus dados</h3>
          </div>
          <p>Você também pode solicitar a simulação <a className="text-link" href={whatsappUrl} target="_blank" rel="noopener noreferrer">pelo WhatsApp</a>.</p>
        </div>
      )}
    </div>
  );
}
