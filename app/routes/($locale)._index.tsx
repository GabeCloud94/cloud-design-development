import { type MetaFunction } from '@remix-run/react';
import { HeroImage } from '~/components/HeroImage';
import { AboutMe } from '~/components/AboutMe';
import { RecommendedProducts } from '~/components/RecommendedProducts';
import type { ProductFragment } from 'storefrontapi.generated';
import { useLoaderData } from '@remix-run/react';
import type { LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { getSelectedProductOptions } from '@shopify/hydrogen';


export const meta: MetaFunction = () => {
  return [{ title: 'Clouds Design & Development | Home' }];
};

type RecommendedProductsQueryResult = {
  products: {
    nodes: ProductFragment[];
  };
};

// --- Loader ---
export async function loader({ context, request }: LoaderFunctionArgs) {
  try {
    const recommendedProducts = await context.storefront.query<RecommendedProductsQueryResult>(
      BEST_SELLERS_QUERY, {
        variables: {selectedOptions: getSelectedProductOptions(request)},
      }
    );

    // Check if something weird happened
    if (!recommendedProducts || !recommendedProducts.products) {
      return { recommendedProducts: { products: { nodes: [] } } };
    }

    return { recommendedProducts };
  } catch (error) {
    console.error(error);
    return { recommendedProducts: { products: { nodes: [] } } };
  }
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  // Safely accessing the products
  const products = data?.recommendedProducts?.products?.nodes ?? [];


  return (
    <div className="home bg-sky-100">
      <HeroImage
        mobileLogoUrl="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/cloud-design-development-black.png?v=1745567641"
        imageUrl="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/PXL_20250302_222020330_exported_1745558950982.jpg?v=1745559197"
        altText="Hero banner"
        logoUrl="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/cloud-design-development-white-sm.png?v=1745560584"
        heading="Cloud's Design & Development"
        description="Design with purpose. Build for scale."
        className="mb-8"
      />
      <AboutMe />
      <RecommendedProducts 
        products={products} 
        title="Best Sellers" 
        className="mb-8" 
      />
    </div>
  );
}



const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const BEST_SELLERS_QUERY = `#graphql
  ${PRODUCT_VARIANT_FRAGMENT}  # Include the ProductVariant fragment here

  fragment BestSellerProduct on Product {
    id
    title
    vendor
    handle
    encodedVariantExistence
    encodedVariantAvailability
    variants(first: 10) {
      nodes {
        ...ProductVariant  # Reference the ProductVariant fragment here
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant  # Again, reference the ProductVariant fragment
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
        
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }

  query BestSellers(
    $country: CountryCode
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: BEST_SELLING) {
      nodes {
        ...BestSellerProduct  # Ensure that BestSellerProduct is included in the query
      }
    }
  }
` as const;
