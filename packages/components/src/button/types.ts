
import { ExtractPropTypes } from 'vue'


export const ButtonType = ['primary', 'success', 'info', 'warning', 'danger']

export const ButtonSize = ["small", "default", "large"];


export const buttonProps = {
  type: {
    type: String,
    validator(value: string) {
      return ButtonType.includes(value);
    },
  },
  disabled: Boolean,
  size: {
    type: String,
    validator(value: string) {
      return ButtonSize.includes(value);
    },
  },
};

export type ButtonProps = ExtractPropTypes<typeof buttonProps>


