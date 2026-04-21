"use client";
import * as React from "react";
import { cn } from "@nuka/utils/cn";
import { VisuallyHidden } from "@nuka/components/VisuallyHidden";
import { DismissButton } from "@nuka/utils/dismiss-button";
import { Text } from "@nuka/components/Text";
import { useFormFieldProps } from "@nuka/hooks/use-form-field-props";
import {
  fileInputZoneVariants,
  type FileInputVariantProps,
} from "@nuka/components/FileInput/FileInput.variants";

export interface FileInputProps
  extends
    Omit<
      React.InputHTMLAttributes<HTMLInputElement>,
      "type" | "size" | "value"
    >,
    Omit<FileInputVariantProps, "isDragOver"> {
  ref?: React.Ref<HTMLInputElement> | undefined;
  onFilesChange?: (files: File[]) => void;
  maxFiles?: number;
  dragLabel?: string;
  browseLabel?: string;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${String(bytes)} B`;
  if (bytes < 1024 * 1024) return `${String(Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function FileInput({
  ref,
  className,
  intent,
  onFilesChange,
  maxFiles,
  dragLabel = "Drag files here or",
  browseLabel = "browse",
  id,
  disabled,
  multiple,
  accept,
  ...props
}: FileInputProps) {
  const field = useFormFieldProps({
    id,
    disabled,
    "aria-invalid": props["aria-invalid"],
    "aria-describedby": props["aria-describedby"],
    "aria-required": props["aria-required"],
  });

  const [files, setFiles] = React.useState<File[]>([]);
  const [isDragOver, setIsDragOver] = React.useState(false);
  const generatedId = React.useId();
  const inputId = field.resolvedId ?? generatedId;

  const ariaInvalid =
    field.ariaInvalid ?? (intent === "danger" ? true : undefined);

  const addFiles = (incoming: File[]) => {
    const merged = multiple ? [...files, ...incoming] : incoming.slice(0, 1);
    let capped = merged;
    if (maxFiles !== undefined && merged.length > maxFiles) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(
          `[nuka-ui] FileInput: ${String(merged.length)} files exceed maxFiles=${String(maxFiles)}. Extra files ignored.`,
        );
      }
      capped = merged.slice(0, maxFiles);
    }
    setFiles(capped);
    onFilesChange?.(capped);
  };

  const removeFile = (index: number) => {
    const next = files.filter((_, i) => i !== index);
    setFiles(next);
    onFilesChange?.(next);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (field.resolvedDisabled) return;
    const dropped = Array.from(e.dataTransfer.files);
    if (dropped.length > 0) addFiles(dropped);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    if (selected.length > 0) addFiles(selected);
    e.target.value = "";
  };

  return (
    <div
      className={cn("flex flex-col gap-(--space-3)", className)}
      data-slot="root"
    >
      <div
        role="region"
        aria-label={dragLabel}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={fileInputZoneVariants({ intent, isDragOver })}
        data-slot="zone"
        data-testid="file-input-zone"
      >
        <label htmlFor={inputId} className="cursor-pointer text-center">
          <VisuallyHidden>
            <input
              ref={ref}
              type="file"
              id={inputId}
              disabled={field.resolvedDisabled}
              multiple={multiple}
              accept={accept}
              onChange={handleChange}
              aria-invalid={ariaInvalid}
              aria-describedby={field.ariaDescribedBy}
              aria-required={field.ariaRequired}
              data-slot="input"
              {...props}
            />
          </VisuallyHidden>
          <Text size="sm">
            {dragLabel}{" "}
            <span className="underline font-[number:var(--font-weight-medium)]">
              {browseLabel}
            </span>
          </Text>
        </label>
      </div>

      {files.length > 0 && (
        <ul
          role="list"
          className="flex flex-col gap-(--space-2)"
          data-slot="file-list"
        >
          {files.map((file, i) => (
            <li
              key={`${file.name}-${String(file.size)}-${String(i)}`}
              className="flex items-center gap-(--space-2) px-(--space-3) py-(--space-2) rounded-(--radius-md) bg-(--nuka-bg-subtle) border border-(--nuka-border-base)"
              data-slot="file-item"
            >
              <Text
                size="sm"
                className="flex-1 truncate min-w-0"
                data-slot="file-name"
              >
                {file.name}
              </Text>
              <Text
                size="xs"
                color="muted"
                className="shrink-0 whitespace-nowrap"
                data-slot="file-size"
              >
                {formatFileSize(file.size)}
              </Text>
              <DismissButton
                onClick={() => removeFile(i)}
                label={`Remove ${file.name}`}
                data-slot="file-remove-button"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

FileInput.displayName = "FileInput";

export { FileInput, fileInputZoneVariants };
