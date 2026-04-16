"use client";
import { useRef, useState, useCallback } from "react";

export interface OptionEntry {
  label: string;
  ref: HTMLElement | null;
  disabled: boolean;
}

export interface UseOptionRegistryReturn {
  registerOption: (
    value: string,
    label: string,
    ref: HTMLElement | null,
  ) => void;
  unregisterOption: (value: string) => void;
  getOptions: () => string[];
  getOptionLabel: (value: string) => string | undefined;
  getOptionRef: (value: string) => HTMLElement | null | undefined;
  isOptionDisabled: (value: string) => boolean;
  registerDisabledOption: (value: string, disabled: boolean) => void;
  registryVersion: number;
}

function useOptionRegistry(): UseOptionRegistryReturn {
  const optionsRef = useRef(new Map<string, OptionEntry>());
  const [registryVersion, setRegistryVersion] = useState(0);

  const bumpRegistry = useCallback(() => {
    setRegistryVersion((v) => v + 1);
  }, []);

  const registerOption = useCallback(
    (value: string, label: string, ref: HTMLElement | null) => {
      const existing = optionsRef.current.get(value);
      optionsRef.current.set(value, {
        label,
        ref,
        disabled: existing?.disabled ?? false,
      });
      bumpRegistry();
    },
    [bumpRegistry],
  );

  const unregisterOption = useCallback(
    (value: string) => {
      optionsRef.current.delete(value);
      bumpRegistry();
    },
    [bumpRegistry],
  );

  const getOptions = useCallback((): string[] => {
    return Array.from(optionsRef.current.keys());
  }, []);

  const getOptionLabel = useCallback((value: string): string | undefined => {
    return optionsRef.current.get(value)?.label;
  }, []);

  const getOptionRef = useCallback(
    (value: string): HTMLElement | null | undefined => {
      return optionsRef.current.get(value)?.ref;
    },
    [],
  );

  const isOptionDisabled = useCallback((value: string): boolean => {
    return optionsRef.current.get(value)?.disabled ?? false;
  }, []);

  const registerDisabledOption = useCallback(
    (value: string, disabled: boolean) => {
      const existing = optionsRef.current.get(value);
      if (existing) {
        existing.disabled = disabled;
      }
    },
    [],
  );

  return {
    registerOption,
    unregisterOption,
    getOptions,
    getOptionLabel,
    getOptionRef,
    isOptionDisabled,
    registerDisabledOption,
    registryVersion,
  };
}

export { useOptionRegistry };
