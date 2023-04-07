import Text from "$store/components/ui/Text.tsx";
import SliderControllerJS from "$store/islands/SliderJS.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import { useId } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Icon from "../ui/Icon.tsx";
import { useUI } from "../../sdk/useUI.ts";
import HeaderButton from "./Buttons.tsx";

export interface Props {
  alerts: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();
  const { displayAlert } = useUI();

  return (
    <div id={id} class={`${displayAlert.value ? "block" : "hidden" }`}>
      <Slider class="bg-topbar gap-6 scrollbar-none">
        {alerts.map((alert) => (
          <Text
            class="flex justify-center items-center w-screen h-[38px]"
            variant="caption"
            tone="default-inverse"
          >
            {alert}
          </Text>
        ))}
      </Slider>
      <HeaderButton variant="closeAlert" />
      <SliderControllerJS rootId={id} interval={interval && interval * 1e3} />
    </div>
  );
}

export default Alert;
