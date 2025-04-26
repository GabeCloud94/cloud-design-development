import {type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link, type MetaFunction} from '@remix-run/react';
import {Suspense} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import { HeroImage } from '~/components/HeroImage';
import { AboutMe } from '~/components/AboutMe';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';

export const meta: MetaFunction = () => {
  return [{title: 'Hydrogen | Home'}];
};

export async function loader(args: LoaderFunctionArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: LoaderFunctionArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    collections,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: LoaderFunctionArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home bg-sky-100">
      <HeroImage
        mobileLogoUrl='https://cdn.shopify.com/s/files/1/0634/1830/2531/files/cloud-design-development-black.png?v=1745567641'
        imageUrl="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/PXL_20250302_222020330_exported_1745558950982.jpg?v=1745559197"
        altText="Hero banner"
        logoUrl="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/cloud-design-development-white-sm.png?v=1745560584"
        heading="Cloud's Design & Development"
        description="Design with purpose. Build for scale."
        className="mb-8"
      />
      <AboutMe />
      <FeaturedCollections collections={data.collections} />
      <RecommendedProducts products={data.recommendedProducts} />
    </div>
  );
}

function FeaturedCollections({
  collections,
}: {
  collections: {
    nodes: FeaturedCollectionFragment[];
  };
}) {
  if (!collections?.nodes?.length) return null;

  return (
    <div className="featured-collections-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-8 w-full max-w-[1300px] mx-auto">
      {collections.nodes.map((collection) => (
        <div key={collection.id} className="featured-collection-card bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <Link to={`/collections/${collection.handle}`}>
            {collection.image && (
              <div className="collection-image-container aspect-square overflow-hidden">
                <Image
                  data={collection.image}
                  className="collection-image w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              </div>
            )}
            <h2 className="collection-title p-4 text-center text-sky-900 font-bold">
              {collection.title}
            </h2>
          </Link>
        </div>
      ))}
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <div className="recommended-products px-4 py-8 w-full max-w-[1300px] mx-auto">
      <h2 className="poppins-semibold text-3xl mb-8 text-sky-900">Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => {
            if (!response?.products?.nodes.length) {
              return <div>No recommended products found</div>;
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {response.products.nodes.map((product) => {
                  if (!product.images.nodes[0]) return null;
                  
                  return (
                    <Link
                      key={product.id}
                      className="group border-sky-900 border-2 shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                      to={`/products/${product.handle}`}
                    >
                      <div className="aspect-square bg-gray-50">
                        <Image
                          data={product.images.nodes[0]}
                          className="w-full h-full object-cover bg-sky-100"
                          sizes="(min-width: 768px) 25vw, 50vw"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-medium group-hover:text-sky-600 text-sky-900">
                          {product.title}
                        </h4>
                        <p className="text-sm text-sky-900">
                          <Money data={product.priceRange.minVariantPrice} />
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}
const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
