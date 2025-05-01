import {useEffect, useState} from 'react';
import {Link, useNavigate} from '@remix-run/react';
import {type MappedProductOptions} from '@shopify/hydrogen';
import type {
  Maybe,
  ProductOptionValueSwatch,
} from '@shopify/hydrogen/storefront-api-types';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import type {ProductFragment, ProductVariantFragment} from 'storefrontapi.generated';
import { QuantitySelector } from './QuantitySelector';

export function ProductForm({
  productOptions,
  selectedVariant,
}: {
  productOptions: MappedProductOptions[];
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}) {
  const [quantity, setQuantity] = useState(1); // Add state for quantity
  useEffect(() => {
    setQuantity(1); // Reset to 1 when selectedVariant changes
  }, [selectedVariant]);
  const navigate = useNavigate();
  const {open} = useAside();
  console.log(productOptions);
  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="product-options pb-2" key={option.name}>
            <h5>{option.name}</h5>
            <div className="product-options-grid">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                  variant,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className={`product-options-item ${option.name === 'Color' ? 'product-options-item-color' : ''}`}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                      style={{
                        border: selected
                          ? '1px solid black'
                          : '1px solid transparent',
                        opacity: available ? 1 : 0.3,
                      }}
                    >
                      <ProductOptionSwatch
                        swatch={swatch}
                        name={name}
                        image={option.name === 'Color' ? (variant?.image as unknown as ProductVariantFragment['image']) : undefined}
                        option={option.name}
                      />
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`product-options-item${
                        exists && !selected ? ' link' : ''
                      } ${option.name === 'Color' ? 'product-options-item-color' : ''}`}
                      key={option.name + name}
                      style={{
                        border: selected
                          ? '1px solid black'
                          : '1px solid transparent',
                        opacity: available ? 1 : 0.3,
                      }}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch
                        swatch={swatch}
                        name={name}
                        image={option.name === 'Color' ? (variant?.image as unknown as ProductVariantFragment['image']) : undefined}
                        option={option.name}
                      />
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
      <div className="mb-4 flex justify-evenly items-center">
        <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
      
      <AddToCartButton
        disabled={!selectedVariant || !selectedVariant.availableForSale}
        onClick={() => {
          open('cart');
        }}
        lines={
          selectedVariant
            ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: quantity,
                  selectedVariant,
                },
              ]
            : []
        }
      >
        {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
      </AddToCartButton>
      </div>
    </div>
  );
}

function ProductOptionSwatch({
  swatch,
  name,
  image,
  option,
}: {
  swatch?: Maybe<ProductOptionValueSwatch> | undefined;
  name: string;
  image?: Maybe<ProductVariantFragment['image']> | undefined;
  option: string;
}) {
  const color = swatch?.color;
  const imageUrl = (image && 'url' in image) ? image.url : undefined;

  if (!imageUrl && !color) {
    return <div>{name}</div>;
  }

  return (
    <div
      aria-label={name}
      className={`product-option-label-swatch ${option === 'Color' ? 'product-options-item-color' : ''}`}
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: '50%',
          }}
        />
      )}
    </div>
  );
}
