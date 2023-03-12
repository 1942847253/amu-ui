export default {
  SUCCESS: "success",
  WARNING: "warning",
  Message: "message",
  ERROR: "error",
};

export type TOptions = {
  type: string;
  message: string;
  closeable?: boolean;
  duration?: number;
};

export type TMessageOption = {
  message: string;
  type?: string;
};

export interface IMessage {
  [key: string]: any;
  (options: TOptions): void;
  success: (options: TMessageOption) => Function;
  warning: (options: TMessageOption) => Function;
  message: (options: TMessageOption) => Function;
  error: (options: TMessageOption) => Function;
}
