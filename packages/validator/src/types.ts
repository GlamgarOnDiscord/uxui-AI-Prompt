/**
 * Shared types for @design-md/validator.
 * Kept in a separate module to avoid circular imports.
 */

export interface LintViolation {
  /** Absolute or relative path to the file containing the violation */
  file: string;
  /** 1-based line number */
  line: number;
  /** The lint rule that triggered */
  rule: "contrast-ratio" | "spacing-scale" | "font-family";
  severity: "error" | "warning";
  message: string;
  /** The offending value */
  value?: string;
  /** What was expected */
  expected?: string;
}

export interface LintResult {
  violations: LintViolation[];
  /** Number of files that were scanned */
  filesScanned: number;
  /** Absolute path to the DESIGN.md that was used, or null if defaults were applied */
  designMdPath: string | null;
  summary: {
    errors: number;
    warnings: number;
  };
}
