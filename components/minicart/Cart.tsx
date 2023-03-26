import { useVNDACart } from "deco-sites/std/commerce/vnda/hooks/useVNDACart.ts";
import { formatPrice } from "$store/sdk/format.ts";
import Button from "$store/components/ui/Button.tsx";
import Text from "$store/components/ui/Text.tsx";

import { useUI } from "../../sdk/useUI.ts";
import CartItem from "./CartItem.tsx";
import Coupon from "./Coupon.tsx";

const getVndaCheckoutUrl = (checkoutToken: string) =>
  `https://template1.vnda.dev/checkout/${checkoutToken}`;

function Cart() {
  const { displayCart } = useUI();
  const { cart, loading } = useVNDACart();
  const isCartEmpty = cart.value?.items.length === 0;
  const total = cart.value?.total;

  // TODO: Test an example of VNDA with discounts
  const discounts = cart.value?.discount_price;

  // TODO: Do we need this?
  const locale = `pt-BR`;
  const currencyCode = `BRL`;

  if (cart.value === null) {
    return null;
  }

  // Empty State
  if (isCartEmpty) {
    return (
      <div class="flex flex-col justify-center items-center h-full gap-6">
        <Text variant="heading-2">Sua sacola está vazia</Text>
        <Button
          variant="secondary"
          onClick={() => {
            displayCart.value = false;
          }}
        >
          Escolher produtos
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Cart Items */}
      <ul
        role="list"
        class="mt-6 px-2 flex-grow-1 overflow-y-auto flex flex-col gap-6"
      >
        {cart.value.items.map((_, index) => (
          <li>
            <CartItem index={index} key={index} />
          </li>
        ))}
      </ul>

      {/* Cart Footer */}
      <footer>
        {/* Subtotal */}
        <div class="border-t-1 border-default py-4 flex flex-col gap-4">
          {!!discounts && (
            <div class="flex justify-between items-center px-4">
              <Text variant="caption">Descontos</Text>
              <Text variant="caption">
                {formatPrice(discounts, currencyCode!, locale)}
              </Text>
            </div>
          )}
          <Coupon />
        </div>
        {/* Total */}
        {total && (
          <div class="border-t-1 border-default pt-4 flex flex-col justify-end items-end gap-2 mx-4">
            <div class="flex justify-between items-center w-full">
              <Text variant="body">Total</Text>
              <Text variant="heading-3">
                {formatPrice(total, currencyCode!, locale)}
              </Text>
            </div>
            <Text tone="subdued" variant="caption">
              Taxas e fretes serão calculados no checkout
            </Text>
          </div>
        )}
        <div class="p-4">
          <a
            class="inline-block w-full"
            target="_blank"
            href={getVndaCheckoutUrl(cart.value?.token)}
          >
            <Button
              class="w-full"
              disabled={loading.value || cart.value.items.length === 0}
            >
              Finalizar Compra
            </Button>
          </a>
        </div>
      </footer>
    </>
  );
}

export default Cart;
