import { JSX } from "preact";
import { forwardRef } from "preact/compat";

type Props = JSX.IntrinsicElements["span"] & {
  tone?:
    | "default"
    | "default-inverse"
    | "subdued"
    | "subdued-inverse"
    | "price"
    | "section-title"
    | "positive"
    | "critical"
    | "highlight"
    | "accent";
  variant?:
    | "heading-1"
    | "heading-2"
    | "heading-3"
    | "menu"
    | "button"
    | "body"
    | "caption"
    | "list-price"
    | "title"
    | "subtitle"
    | "description"
    | "blank" 
    | "subtitle" 
    | "submenu"
    | "upper-title"
    | "title-section"
    | "description-section";
};

const Text = forwardRef<HTMLSpanElement, Props>((
  { tone = "default", variant = "body", class: _class = "", ...props },
  ref,
) => {
  if (variant === "blank") {
    return (
      <span
        {...props}
        class={`${_class}`}
        ref={ref}
      />
    );
  }
  return (
    <span
      {...props}
      class={`font-${variant} text-${variant} text-${tone} ${_class}`}
      ref={ref}
    />
  );
});

export default Text;
