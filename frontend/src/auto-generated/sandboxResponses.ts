/**
 * Generated by @openapi-codegen
 *
 * @version 1.1.4
 */
import type * as Schemas from "./sandboxSchemas";

export type Accepted = Record<string, any>;

export type ActionsRunnerLabels = {
  labels: Schemas.RunnerLabel[];
  total_count: number;
};

export type ActionsRunnerLabelsReadonly = {
  labels: Schemas.RunnerLabel[];
  total_count: number;
};

export type BadRequest = Schemas.BasicError;

export type CodeScanningForbiddenRead = Schemas.BasicError;

export type CodeScanningForbiddenWrite = Schemas.BasicError;

export type Conflict = Schemas.BasicError;

export type Forbidden = Schemas.BasicError;

export type ForbiddenGist = {
  block?: {
    created_at?: string;
    html_url?: string | null;
    reason?: string;
  };
  documentation_url?: string;
  message?: string;
};

export type Found = void;

export type Gone = Schemas.BasicError;

export type InternalError = Schemas.BasicError;

export type MovedPermanently = Schemas.BasicError;

export type NoContent = void;

export type NotFound = Schemas.BasicError;

export type NotModified = void;

export type PorterMaintenance = Schemas.BasicError;

export type RequiresAuthentication = Schemas.BasicError;

export type ServiceUnavailable = {
  code?: string;
  documentation_url?: string;
  message?: string;
};

export type TemporaryRedirect = Schemas.BasicError;

export type ValidationFailed = Schemas.ValidationError;

export type ValidationFailedSimple = Schemas.ValidationErrorSimple;