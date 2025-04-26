import {Image} from '@shopify/hydrogen';
import { NavLink } from '@remix-run/react';
interface HeroImageProps {
  imageUrl: string;
  mobileLogoUrl: string;
  altText: string;
  className?: string;
  heading?: string;
  description?: string;
  logoUrl?: string;
}

export function HeroImage({
  imageUrl,
  altText,
  className,
  heading = "Welcome to Our Store",
  description = "Discover premium quality products",
  logoUrl,
  mobileLogoUrl,
}: HeroImageProps) {
  return (
    <div className={`relative w-full h-auto max-w-[1300px] mx-auto ${className}`}>
      {/* Background Image */}
      <Image
        src={imageUrl}
        alt={altText}
        width={1300}
        height={800}
        sizes="(min-width: 1300px) 1300px, 100vw"
        className="w-full h-full object-cover"
        loading="eager"
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center">
        <div className="w-full max-w-[1300px] mx-auto pl-2 pr-34 md:px-34">
          <div className="max-w-lg md:px-8 px-2 py-4 md:py-12 bg-white/50 md:bg-white/30 md:backdrop-blur-xs rounded-lg shadow-xl">
            {logoUrl && (
              <div className='flex items-center justify-center mb-0'>
                <Image
                  src={logoUrl}
                  alt="Company logo"
                  width={461}
                  height={290}
                  className="object-contain h-[100px] w-full mb-4 hidden md:block"
                />
              </div>
            )}
            {mobileLogoUrl && (
              <div className='flex items-center justify-center mb-0'>
                <Image
                  src={mobileLogoUrl}
                  alt="Company logo"
                  width={461}
                  height={290}
                  className="object-contain h-[100px] w-full mb-4 md:hidden"
                />
              </div>
            )}
            
            {/* Gradient Heading */}
            <h1 className="md:text-4xl text-lg text-center poppins-bold mb-2 bg-gradient-to-r from-sky-600 to-sky-800 bg-clip-text text-transparent">
              {heading}
            </h1>
            
            <p className="md:text-lg text-sm text-sky-800 text-center poppins-semibold">
              {description}
            </p>
            
            <div className="flex justify-center mt-6">
              {/* Gradient Button */}
              <NavLink
                to="/pages/contact"
                className="bg-gradient-to-r from-sky-600 to-sky-800 hover:from-sky-700 hover:to-sky-900 text-white px-6 py-3 rounded-lg md:font-medium font-sm transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Me
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}