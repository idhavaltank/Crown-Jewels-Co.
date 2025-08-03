export interface FeedbackToastPropsType {
  type: "success" | "error" | "info";
  message: string;
  onClose?: () => void;
  duration?: number; // in milliseconds, defaults to 5000 (5 sec)
}
