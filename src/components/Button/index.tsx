import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from "@mui/material";
import { colors } from "../../theme/colors";

interface ButtonProps extends MuiButtonProps {}

export function Button({
  variant = "contained",
  size = "large",
  children,
  style,
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      style={{
        backgroundColor: colors.primary,
        color: "white",
        fontSize: 14,
        ...style,
      }}
      size={size}
      {...props}
    >
      {children}
    </MuiButton>
  );
}
