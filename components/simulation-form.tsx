"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, ClipboardList, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { formatBrazilianPhone, leadProfiles, leadSchema, type LeadFormValues, type LeadPayload } from "@/lib/lead-schema";
import styles from "./simulation-form.module.css";

type SimulationFormProps = { whatsappUrl: string; requiresAmount?: boolean };

const defaults: LeadFormValues = { name: "", phone: "", profile: "", amount: "", consent: false, website: "" };
const fieldNames = ["name", "phone", "profile", "amount", "consent"] as const;
const fallbackError = "Não foi possível enviar agora. Tente novamente ou fale pelo WhatsApp.";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <span className={styles.fieldError} id={id}>{message}</span>;
}

export function SimulationForm({ whatsappUrl, requiresAmount = false }: SimulationFormProps) {
  const id = useId();
  const request = useRef<{ key: string; payload: string } | null>(null);
  const inFlight = useRef(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const { register, getValues, handleSubmit, setError, setValue, formState: { errors, isSubmitting } } =
    useForm<LeadFormValues, unknown, LeadPayload>({
      resolver: zodResolver(leadSchema(requiresAmount)),
      defaultValues: defaults,
      mode: "onTouched",
      reValidateMode: "onChange",
    });

  useEffect(() => {
    const profile = new URLSearchParams(window.location.search).get("perfil");
    if (profile && !getValues("profile") && leadProfiles.some((entry) => entry.id === profile)) {
      setValue("profile", profile);
    }
  }, [getValues, setValue]);

  const phoneField = register("phone");

  const submit = handleSubmit(async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setErrorMessage("");

    try {
      const payload = JSON.stringify(getValues());
      if (request.current?.payload !== payload) request.current = { payload, key: crypto.randomUUID() };

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": request.current.key },
        body: payload,
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || result?.ok !== true) {
        const invalidField = fieldNames.find((field) => typeof result?.fields?.[field]?.[0] === "string");
        for (const field of fieldNames) {
          const message = result?.fields?.[field]?.[0];
          if (typeof message === "string") setError(field, { message }, { shouldFocus: field === invalidField });
        }
        setErrorMessage(typeof result?.error === "string" ? result.error : fallbackError);
        return;
      }

      setAccepted(true);
    } catch {
      setErrorMessage(fallbackError);
    } finally {
      inFlight.current = false;
    }
  });

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <span className={styles.headingIcon}><ClipboardList size={19} aria-hidden="true" /></span>
        <h3>Seus dados</h3>
      </div>

      <div role="status" aria-live="polite">
        {accepted && (
          <div className={styles.success}>
            <span className={styles.successIcon}><Check size={23} aria-hidden="true" /></span>
            <p><strong>Solicitação recebida.</strong></p>
            <p>A equipe da CapitalCred poderá entrar em contato pelo WhatsApp informado para orientar você sobre a simulação.</p>
          </div>
        )}
      </div>

      {!accepted && (
        <form className={styles.form} onSubmit={submit} method="post" action="/api/leads" noValidate aria-busy={isSubmitting}>
          <div className={styles.fields}>
            <div className={styles.field}>
              <label htmlFor={`${id}-name`}>Nome completo</label>
              <input id={`${id}-name`} placeholder="Seu nome e sobrenome" autoComplete="name" maxLength={100} required
                aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} {...register("name")} />
              <FieldError id={`${id}-name-error`} message={errors.name?.message} />
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}-phone`}>WhatsApp</label>
              <input id={`${id}-phone`} type="tel" placeholder="(62) 99999-9999" autoComplete="tel-national" maxLength={19} required
                aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${id}-phone-error` : undefined}
                {...phoneField} onChange={(event) => {
                  event.currentTarget.value = formatBrazilianPhone(event.currentTarget.value);
                  void phoneField.onChange(event);
                }} />
              <FieldError id={`${id}-phone-error`} message={errors.phone?.message} />
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}-profile`}>Seu perfil</label>
              <div className={styles.select}>
                <select id={`${id}-profile`} required aria-invalid={Boolean(errors.profile)}
                  aria-describedby={errors.profile ? `${id}-profile-error` : undefined} {...register("profile")}>
                  <option value="" disabled>Selecione</option>
                  {leadProfiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.label}</option>)}
                </select>
                <ChevronDown size={17} aria-hidden="true" />
              </div>
              <FieldError id={`${id}-profile-error`} message={errors.profile?.message} />
            </div>

            <div className={styles.field}>
              <label htmlFor={`${id}-amount`}>Valor desejado {!requiresAmount && <span>(opcional)</span>}</label>
              <input id={`${id}-amount`} inputMode="decimal" placeholder="Ex. R$ 5.000,00" maxLength={24} required={requiresAmount}
                aria-invalid={Boolean(errors.amount)} aria-describedby={errors.amount ? `${id}-amount-error` : undefined} {...register("amount")} />
              <FieldError id={`${id}-amount-error`} message={errors.amount?.message} />
            </div>
          </div>

          <div className={styles.trap} aria-hidden="true">
            <label htmlFor={`${id}-website`}>Deixe este campo em branco</label>
            <input id={`${id}-website`} tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>

          <div>
            <div className={styles.consent}>
              <input id={`${id}-consent`} type="checkbox" required aria-invalid={Boolean(errors.consent)}
                aria-describedby={errors.consent ? `${id}-consent-error` : undefined} {...register("consent")} />
              <p>
                <label htmlFor={`${id}-consent`}>Autorizo o uso dos meus dados para contato sobre esta solicitação.</label>{" "}
                <Link href="/politica-de-privacidade">Política de privacidade</Link>.
              </p>
            </div>
            <FieldError id={`${id}-consent-error`} message={errors.consent?.message} />
          </div>

          <button type="submit" className={styles.submit} disabled={isSubmitting}>
            {isSubmitting && <LoaderCircle className={styles.spinner} size={19} aria-hidden="true" />}
            {isSubmitting ? "Enviando solicitação…" : "Solicitar simulação"}
          </button>

          {errorMessage && (
            <p className={styles.failure} role="alert">
              {errorMessage}{" "}
              <a href={whatsappUrl} target="_blank" rel="noreferrer">Abrir WhatsApp</a>
            </p>
          )}
          <noscript>
            <p className={styles.failure}>Ative JavaScript para enviar este formulário ou{" "}
              <a href={whatsappUrl} target="_blank" rel="noreferrer">fale pelo WhatsApp</a>.
            </p>
          </noscript>
        </form>
      )}
    </div>
  );
}
