import { FormControl } from "@angular/forms";

export type FormGroupOf<T> = {
  [K in keyof T]-?: FormControl<
      undefined extends T[K] ? NonNullable<T[K]> | null : T[K]
  >;
};