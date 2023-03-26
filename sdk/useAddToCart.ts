import { useSignal } from "@preact/signals";
import { useCallback } from "preact/hooks";
// import { useCart } from "deco-sites/std/commerce/vtex/hooks/useCart.ts";
import { useVNDACart } from "deco-sites/std/commerce/vnda/hooks/useVNDACart.ts";
import { useUI } from "$store/sdk/useUI.ts";

interface Options {
  skuId: string;
}

export const useAddToCart = ({ skuId }: Options) => {
  const isAddingToCart = useSignal(false);
  const { displayCart } = useUI();
  const { addItemToCart, loading } = useVNDACart();

  const onClick = useCallback(async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      isAddingToCart.value = true;
      await addItemToCart({ itemId: skuId, quantity: 1 });

      displayCart.value = true;
    } finally {
      isAddingToCart.value = false;
    }
  }, [skuId]);

  return { onClick, disabled: loading.value, loading: isAddingToCart.value };
};
