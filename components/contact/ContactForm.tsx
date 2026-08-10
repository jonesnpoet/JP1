"use client";

import { useState } from "react";
import styles from "./ContactForm.module.css";

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const EMPTY_VALUES: FormValues = { name: "", email: "", subject: "", message: "" };

const FIELDS: { key: keyof FormValues; label: string; type: "text" | "email" | "textarea" }[] = [
  { key: "name", label: "Name", type: "text" },
  { key: "email", label: "Email", type: "email" },
  { key: "subject", label: "Subject", type: "text" },
  { key: "message", label: "Message", type: "textarea" },
];

type Status = "idle" | "submitting" | "success" | "error";

function validate(values: FormValues): Partial<Record<keyof FormValues, string>> {
  const errors: Partial<Record<keyof FormValues, string>> = {};
  for (const { key, label } of FIELDS) {
    if (!values[key].trim()) errors[key] = `${label} is required.`;
  }
  if (values.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (key: keyof FormValues) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      setValues(EMPTY_VALUES);
      setErrors({});
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p className={styles.success} role="status">
        Thanks for reaching out — we&apos;ll get back to you soon.
      </p>
    );
  }

  return (
    <form className={styles.form} noValidate onSubmit={handleSubmit}>
      {FIELDS.map(({ key, label, type }) => {
        const fieldError = errors[key];
        const inputProps = {
          id: key,
          name: key,
          value: values[key],
          onChange: handleChange(key),
          "aria-invalid": fieldError ? true : undefined,
          "aria-describedby": fieldError ? `${key}-error` : undefined,
          className: [styles.input, fieldError && styles.inputError].filter(Boolean).join(" "),
        };

        return (
          <div key={key} className={styles.field}>
            <label htmlFor={key} className={styles.label}>
              {label}
              <span className={styles.required} aria-hidden="true">
                *
              </span>
            </label>
            {type === "textarea" ? (
              <textarea {...inputProps} rows={6} />
            ) : (
              <input {...inputProps} type={type} />
            )}
            {fieldError && (
              <p id={`${key}-error`} className={styles.errorText}>
                {fieldError}
              </p>
            )}
          </div>
        );
      })}

      {status === "error" && (
        <p className={styles.formError} role="alert">
          Something went wrong sending your message. Please try again, or email us directly below.
        </p>
      )}

      <button type="submit" className={styles.submit} disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
