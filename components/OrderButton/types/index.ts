export interface OrderButtonPropsType {
  loading?: boolean;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
}
