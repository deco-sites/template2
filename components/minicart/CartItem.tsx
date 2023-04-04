import Image from "deco-sites/std/components/Image.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Text from "$store/components/ui/Text.tsx";
import Button from "$store/components/ui/Button.tsx";
import QuantitySelector from "$store/components/ui/QuantitySelector.tsx";
import { useVNDACart } from "deco-sites/std/commerce/vnda/hooks/useVNDACart.ts";
import { formatPrice } from "$store/sdk/format.ts";

interface Props {
  index: number;
}

function CartItem({ index }: Props) {
  // TODO: Update items
  const { loading, cart, updateItemQuantity } = useVNDACart();
  const item = cart.value!.items[index];
  // TODO: In the case of VNDA, probably get this from global config
  const locale = `pt-BR`;
  const currencyCode = `BRL`;

  const {
    id,
    image_url,
    product_name,
    variant_name,
    price,
    quantity,
  } = item;

  const imageUrlWithScheme = `https:` + image_url;
  const listPrice = price;
  const sellingPrice = price;
  // TODO: Logic imported from VTEX. Does VNDA supports gifts as well?
  const isGift = price < 0.01;

  return (
    <div class="flex flex-row justify-between items-start gap-4">
      <Image
        src={imageUrlWithScheme}
        alt={product_name}
        width={108}
        height={150}
        class="object-cover object-center"
      />
      <div class="flex-grow">
        <div className="flex flex-col">
          <Text variant="body">
            {product_name}
          </Text>
          {product_name !== variant_name && (
            <Text variant="blank" class="text-gray-400 my-1">
              {variant_name}
            </Text>
          )}
        </div>
        <div class="flex items-center gap-2">
          {listPrice !== sellingPrice && (
            <Text class="line-through" tone="subdued" variant="list-price">
              {formatPrice(listPrice / 100, currencyCode!, locale)}
            </Text>
          )}
          <Text tone="price" variant="caption">
            {isGift
              ? "Grátis"
              : formatPrice(sellingPrice, currencyCode!, locale)}
          </Text>
        </div>
        <div class="mt-6 max-w-min">
          <QuantitySelector
            disabled={loading.value || isGift}
            quantity={quantity}
            onChange={(quantity) =>
              updateItemQuantity({ quantity, itemId: id })}
          />
        </div>
      </div>
      <Button
        onClick={() => updateItemQuantity({ itemId: id, quantity: 0 })}
        disabled={loading.value || isGift}
        loading={loading.value}
        variant="icon"
      >
        <Icon id="Trash" width={20} height={20} />
      </Button>
    </div>
  );
}

export default CartItem;
