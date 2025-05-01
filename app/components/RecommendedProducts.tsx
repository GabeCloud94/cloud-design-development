import { ProductFragment } from 'storefrontapi.generated';
import {ProductCard} from './ProductCard';


// --- Define the correct shape ---
type RecommendedProductFragment = ProductFragment; // No need to wrap in an array here

// --- Component Props ---
interface RecommendedProductsProps {
  title?: string;
  className?: string;
  products: RecommendedProductFragment[];
}

// --- Component ---
export function RecommendedProducts({
  title = 'Best Sellers',
  products,
}: RecommendedProductsProps) {




  if (!products.length) {
    return (
      <div className="no-products max-w-[1300px] mx-auto px-4 pb-8">
        <h3>Currently no featured products available</h3>
        <p>Check back later for updates</p>
      </div>
    );
  }

  return (
    <div className={`recommended-products max-w-[1300px] mx-auto px-4 pb-8`}>
      <h2 className="recommended-products-title text-3xl text-sky-800 mb-8 text-center poppins-semibold">{title}</h2>
      <div className="recommended-products-grid">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            className="h-full"
          />
        ))}
      </div>
    </div>
  );
}

