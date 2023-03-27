import { useEffect } from "preact/hooks";

interface Props {
  rootId: string;
  behavior?: "smooth" | "auto";
  interval?: number;
  thumbnailsActive?: boolean
}

const ATTRIBUTES = {
  "data-slider": "data-slider",
  "data-slider-item": "data-slider-item",
  'data-slide="prev"': 'data-slide="prev"',
  'data-slide="next"': 'data-slide="next"',
  "data-dot": "data-dot",
  "data-slider-thumb-item": "data-slider-thumb-item",
  "data-thumb-active": "data-thumb-active"
};

// Percentage of the item that has to be inside the container
// for it it be considered as inside the container
const THRESHOLD = 0.6;

const intersectionX = (element: DOMRect, container: DOMRect): number => {
  const delta = container.width / 1_000;

  if (element.right < container.left - delta) {
    return 0.0;
  }

  if (element.left > container.right + delta) {
    return 0.0;
  }

  if (element.left < container.left - delta) {
    return element.right - container.left + delta;
  }

  if (element.right > container.right + delta) {
    return container.right - element.left + delta;
  }

  return element.width;
};

// as any are ok in typeguard functions
const isHTMLElement = (x: Element): x is HTMLElement =>
  // deno-lint-ignore no-explicit-any
  typeof (x as any).offsetLeft === "number";

const setup = ({ rootId, behavior, interval, thumbnailsActive }: Props) => {
  const root = document.getElementById(rootId);
  const slider = root?.querySelector(`[${ATTRIBUTES["data-slider"]}]`);
  const items = root?.querySelectorAll(`[${ATTRIBUTES["data-slider-item"]}]`);
  const prev = root?.querySelector(`[${ATTRIBUTES['data-slide="prev"']}]`);
  const next = root?.querySelector(`[${ATTRIBUTES['data-slide="next"']}]`);
  const dots = root?.querySelectorAll(`[${ATTRIBUTES["data-dot"]}]`);
  const thumbs = thumbnailsActive ? root?.querySelectorAll(`[${ATTRIBUTES["data-slider-thumb-item"]}]`) : undefined;


  if (!root || !slider || !items || items.length === 0 || (thumbnailsActive && !thumbs )||(thumbnailsActive && thumbs?.length === 0)) {
    console.warn(
      "Missing necessary slider attributes. It will not work as intended. Necessary elements:",
      { root, slider, items, thumbs },
    );

    return;
  }

  const getElementsInsideContainer = () => {
    const indices: number[] = [];
    const sliderRect = slider.getBoundingClientRect();

    for (let index = 0; index < items.length; index++) {
      const item = items.item(index);
      const rect = item.getBoundingClientRect();

      const ratio = intersectionX(
        rect,
        sliderRect,
      ) / rect.width;

      if (ratio > THRESHOLD) {
        indices.push(index);
      }
    }

    return indices;
  };

  const goToItem = (index: number) => {
    const item = items.item(index);

    if (!isHTMLElement(item)) {
      console.warn(
        `Element at index ${index} is not an html element. Skipping carousel`,
      );

      return;
    }

    thumbs?.forEach(thumb => thumb.removeAttribute(ATTRIBUTES["data-thumb-active"]))
    thumbs?.item(index).setAttribute(ATTRIBUTES["data-thumb-active"], "true");

    slider.scrollTo({
      top: 0,
      behavior,
      left: item.offsetLeft - root.offsetLeft,
    });
  };

  const onClickPrev = () => {
    const indices = getElementsInsideContainer();
    // Wow! items per page is how many elements are being displayed inside the container!!
    const itemsPerPage = indices.length;

    const isShowingFirst = indices[0] === 0;
    const pageIndex = Math.floor(indices[indices.length - 1] / itemsPerPage);

    goToItem(
      isShowingFirst ? items.length - 1 : (pageIndex - 1) * itemsPerPage,
    );
  };

  const onClickNext = () => {
    const indices = getElementsInsideContainer();
    // Wow! items per page is how many elements are being displayed inside the container!!
    const itemsPerPage = indices.length;

    const isShowingLast = indices[indices.length - 1] === items.length - 1;
    const pageIndex = Math.floor(indices[0] / itemsPerPage);

    goToItem(isShowingLast ? 0 : (pageIndex + 1) * itemsPerPage);
  };

  const observer = new IntersectionObserver(
    (items) =>
      items.forEach((item) => {
        const index =
          Number(item.target.getAttribute(ATTRIBUTES["data-slider-item"])) || 0;
        const dot = dots?.item(index);

        if (item.isIntersecting) {
          dot?.setAttribute("disabled", "");
        } else {
          dot?.removeAttribute("disabled");
        }
      }),
    { threshold: THRESHOLD, root: slider },
  );

  items.forEach((item) => observer.observe(item));

  for (let it = 0; it < (dots?.length ?? 0); it++) {
    dots?.item(it).addEventListener("click", () => goToItem(it));
  }


  thumbs?.forEach(thumb => {
    const targetIndex = thumb.getAttribute(ATTRIBUTES["data-slider-thumb-item"]) || "0";
    thumb.addEventListener("click", () => {
      goToItem(parseInt(targetIndex));
    })
  })

  prev?.addEventListener("click", onClickPrev);
  next?.addEventListener("click", onClickNext);

  const timeout = interval && setInterval(onClickNext, interval);

  // Unregister callbacks
  return () => {
    for (let it = 0; it < (dots?.length ?? 0); it++) {
      dots?.item(it).removeEventListener("click", () => goToItem(it));
    }

    thumbs?.forEach(thumb => {
      const targetIndex = thumb.getAttribute(ATTRIBUTES["data-slider-thumb-item"]) || "0";
      thumb.removeEventListener("click", () => {
        goToItem(parseInt(targetIndex));
      })
    })

    prev?.removeEventListener("click", onClickPrev);
    next?.removeEventListener("click", onClickNext);

    observer.disconnect();

    clearInterval(timeout);
  };
};

function Slider({ rootId, behavior = "smooth", interval, thumbnailsActive = false }: Props) {
  useEffect(() => setup({ rootId, behavior, interval, thumbnailsActive }), [
    rootId,
    behavior,
    interval,
    thumbnailsActive
  ]);

  return <div data-slider-controller-js />;
}

export default Slider;
