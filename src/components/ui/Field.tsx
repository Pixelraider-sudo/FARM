import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

interface Shell {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
  htmlFor: string;
}
export function FieldShell({
  label,
  error,
  hint,
  className,
  children,
  htmlFor,
}: Shell) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={htmlFor} className="text-sm font-semibold">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-sm font-medium text-clay" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs text-muted">{hint}</p>
      ) : null}
    </div>
  );
}

type CommonProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  wrapperClassName?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  wrapperClassName,
  ...rest
}: CommonProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <FieldShell
      htmlFor={id}
      label={label}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <input id={id} className="input" aria-invalid={!!error} {...rest} />
    </FieldShell>
  );
}
export function TextArea({
  id,
  label,
  error,
  hint,
  wrapperClassName,
  ...rest
}: CommonProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <FieldShell
      htmlFor={id}
      label={label}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <textarea
        id={id}
        rows={4}
        className="input resize-y"
        aria-invalid={!!error}
        {...rest}
      />
    </FieldShell>
  );
}
export function SelectField({
  id,
  label,
  error,
  hint,
  wrapperClassName,
  options,
  ...rest
}: CommonProps &
  SelectHTMLAttributes<HTMLSelectElement> & {
    options: ReadonlyArray<string | { value: string; label: string }>;
  }) {
  return (
    <FieldShell
      htmlFor={id}
      label={label}
      error={error}
      hint={hint}
      className={wrapperClassName}
    >
      <select id={id} className="input" aria-invalid={!!error} {...rest}>
        {options.map((o) =>
          typeof o === "string" ? (
            <option key={o} value={o}>
              {o}
            </option>
          ) : (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ),
        )}
      </select>
    </FieldShell>
  );
}
