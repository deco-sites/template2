import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["div"];

function Container({ class: _class = "", ...props }: Props) {
  return <div class={`max-content mx-auto ${_class}`} {...props} />;
}

export default Container;
