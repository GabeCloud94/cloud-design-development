import { ProductPrice } from '~/components/ProductPrice';
import { ProductImage } from '~/components/ProductImage';
import { ProductForm } from '~/components/ProductForm';
import { ProductFragment } from 'storefrontapi.generated';
import { Analytics, getProductOptions } from '@shopify/hydrogen';

interface ProductCardProps {
  product: ProductFragment;
  className?: string;
}

export function ProductCard({
  product,
  className = '',
}: ProductCardProps) {
  const productOptions = getProductOptions(product); // Get product options
    const selectedVariant = product.selectedOrFirstAvailableVariant || null;

  return (
    <div className={`product-card ${className}`}>
      {/* Display the image for the selected variant */}
      <ProductImage image={selectedVariant?.image} />
      
      <div className="product-card-content">
        {/* Product title */}
        <h2 className="product-title">{product.title}</h2>
        
        {/* Display the price and compareAtPrice */}
        <ProductPrice
          price={selectedVariant?.price}
          compareAtPrice={selectedVariant?.compareAtPrice}
        />
        
        {/* Product form to handle variant options */}
        <ProductForm
          productOptions={productOptions} // Pass the available product options
          selectedVariant={selectedVariant} // Pass the selected variant to the form
        />
        
        {/* Analytics tracking for product view */}
        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                title: product.title,
                price: selectedVariant?.price?.amount || '0',
                vendor: product.vendor,
                variantId: selectedVariant?.id || '',
                variantTitle: selectedVariant?.title || '',
                quantity: 1, // Assuming a quantity of 1 for each view
              },
            ],
          }}
        />
      </div>
    </div>
  );
}
