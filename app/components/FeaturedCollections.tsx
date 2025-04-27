import { Link } from "@remix-run/react";
import { Image } from "@shopify/hydrogen";

interface FeaturedCollection {
  id: string;
  title: string;
  image: {
    url: string;
    altText: string;
    id: string;
    width: number;
    height: number;
  };
  handle: string;
}

interface FeaturedCollectionsProps {
  collections: {
    nodes: FeaturedCollection[];
  };
}

export default function FeaturedCollections({ collections }: FeaturedCollectionsProps) {
  console.log('Collections data:', collections); // Debugging the collections data

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
              {collection.title && collection.title}
            </h2>
          </Link>
        </div>
      ))}
    </div>
  );
}
