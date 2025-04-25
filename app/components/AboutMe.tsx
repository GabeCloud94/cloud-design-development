import type {ReactNode} from 'react';

export function AboutMe() {
  return (
    <section className="py-20 px-4 max-w-6xl mx-auto bg-neutral-50">
      {/* Section Header */}
      <div className="mb-6 md:mb-16 text-center">
        <h2 className="text-4xl text-neutral-800 mb-4 poppins-bold">
          Crafting Digital Excellence
        </h2>
        <div className="w-24 h-1 bg-neutral-400 mx-auto"></div>
      </div>

      {/* Bio Section */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-10 md:mb-20">
        <div className="space-y-6 px-6 md:px-0">
          <h3 className="text-3xl text-center md:text-left poppins-semibold text-neutral-700">
            From Passion to Profession
          </h3>
          <p className="text-lg text-neutral-600 inter-thin">
            <SparkleSVG className="inline mr-2" />
            Since 2022, I've had the privilege of transforming visions into 
            high-performing digital experiences for discerning clients. What 
            began as curiosity about how websites work has evolved into 
            crafting solutions that drive real business results.
          </p>
          <p className="text-lg text-neutral-600 inter-thin">
            <RocketSVG className="inline mr-2" />
            My work has supported 7-figure ecommerce stores, streamlined 
            enterprise workflows, and elevated brands that demand both 
            aesthetic polish and technical precision.
          </p>
        </div>
        <div className="flex justify-center">
          <CodeWindowSVG className="w-full max-w-md" />
        </div>
      </div>

      {/* Services Section */}
      <div className="bg-neutral-50 rounded-2xl p-8 md:p-12">
        <h3 className="text-3xl text-neutral-800 mb-8 text-center poppins-semibold">
          Hydrogen-Powered Solutions
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          <ServiceCard
            icon={<HydrogenSVG />}
            title="Storefront Revolution"
            description="Blazing-fast Shopify stores using Hydrogen's edge runtime. 0.5s load times become your new standard."
          />
          <ServiceCard
            icon={
              <CustomSVG />
            }
            title="Headless Freedom"
            description="Break free from template constraints with completely custom storefronts that still integrate seamlessly with Shopify's backend."
          />
          <ServiceCard
            icon={<PerformanceSVG />}
            title="Performance Optimization"
            description="From Lighthouse scores to conversion rates - every percentage point matters."
          />
        </div>
      </div>
    </section>
  );
}

// Reusable Service Card Component
function ServiceCard({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-neutral-300/30 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
        {icon}
      </div>
      <h4 className="text-xl font-semibold text-neutral-700 mb-2">{title}</h4>
      <p className="text-neutral-600">{description}</p>
    </div>
  );
}

// Example SVG Components (replace with your actual SVGs)
function SparkleSVG({className}: {className?: string}) {
  return (
    <svg className={`w-5 h-5 text-neutral-400 ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
    </svg>
  );
}

function RocketSVG({className}: {className?: string}) {
  return (
    <svg className={`w-5 h-5 text-neutral-500 ${className}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M11.933 13.069s7.059-5.094 6.276-10.924a.465.465 0 00-.112-.268.436.436 0 00-.263-.115C12.137.961 7.16 8.184 7.16 8.184c-4.318-.517-4.004.344-5.974 5.076-.377.902.234 1.213.904.959l2.148-.811 2.59 2.648-.793 2.199c-.248.686.055 1.311.938.926 4.624-2.016 5.466-1.694 4.96-6.112z"/>
    </svg>
  );
}

function CodeWindowSVG({className}: {className?: string}) {
  return (
    <svg className={className} fill="none" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="196" height="116" rx="4" stroke="#171717" strokeWidth="3"/>
      <circle cx="10" cy="10" r="3" fill="#f43f5e"/>
      <circle cx="20" cy="10" r="3" fill="#f59e0b"/>
      <circle cx="30" cy="10" r="3" fill="#10b981"/>
      <rect x="10" y="30" width="60" height="8" rx="2" fill="#404040"/>
      <rect x="10" y="45" width="120" height="6" rx="2" fill="#737373" fillOpacity="0.3"/>
      <rect x="10" y="55" width="150" height="6" rx="2" fill="#737373" fillOpacity="0.3"/>
      <rect x="10" y="65" width="100" height="6" rx="2" fill="#737373" fillOpacity="0.3"/>
      <rect x="10" y="85" width="60" height="8" rx="2" fill="#404040"/>
      <rect x="80" y="85" width="60" height="8" rx="2" fill="#62748e"/>
    </svg>
  );
}

function HydrogenSVG({className}: {className?: string}) {
  return (
    <svg className={className || "w-6 h-6 text-neutral-600"} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2"/>
    </svg>
  );
}
function CustomSVG({className}: {className?: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<circle cx="35" cy="14" r="2.5"></circle><path fill="none" stroke="#000" stroke-linecap="round" strokeLinejoin="round" strokeWidth="3" d="M27.7,38.4c1.5-1.6,2.7-3.5,3.3-5.7l-1.2-1C29,31,28.5,30,28.5,29s0.5-2,1.3-2.7l1.2-1	c-0.6-2.2-1.8-4.1-3.3-5.7l-1.4,0.5c-1,0.4-2.1,0.3-3-0.2s-1.5-1.4-1.7-2.5l-0.3-1.5c-1.1-0.3-2.2-0.4-3.3-0.4	c-1.1,0-2.2,0.2-3.3,0.4"></path><path fill="none" stroke="#000" stroke-linecap="round" strokeLinejoin="round" strokeWidth="3" d="M12.8,19.9c-0.9,0.5-2,0.6-3,0.2l-1.4-0.5c-1.5,1.6-2.7,3.5-3.3,5.7l1.2,1C7,27,7.5,28,7.5,29S7,31,6.2,31.7	l-1.2,1c0.6,2.2,1.8,4.1,3.3,5.7l1.4-0.5c1-0.4,2.1-0.3,3,0.2s1.5,1.4,1.7,2.5l0.2,1.5c1.1,0.3,2.2,0.4,3.3,0.4s2.2-0.2,3.3-0.4	l0.2-1.5c0.2-1,0.8-1.9,1.7-2.5"></path><circle cx="18" cy="29" r="4.5" fill="none" stroke="#000" strokeWidth="3"></circle><path fill="none" stroke="#000" stroke-linecap="round" strokeLinejoin="round" strokeWidth="3" d="M35,23.2c0.8,0,1.6-0.1,2.3-0.3l0.2-1.1c0.1-0.7,0.6-1.3,1.2-1.7c0.6-0.4,1.4-0.4,2.1-0.2l1,0.4	c1.1-1.1,1.9-2.4,2.3-4l-0.8-0.7c-0.6-0.5-0.9-1.2-0.9-1.9c0-0.7,0.3-1.4,0.9-1.9l0.8-0.7c-0.4-1.5-1.2-2.9-2.3-4l-1,0.4	C40,8,39.3,7.9,38.6,7.6c-0.6-0.4-1.1-1-1.2-1.7l-0.2-1.1c-0.7-0.2-1.5-0.3-2.3-0.3c-0.8,0-1.6,0.1-2.3,0.3l-0.2,1.1	c-0.1,0.7-0.6,1.3-1.2,1.7C30.7,7.9,30,8,29.3,7.7l-1-0.4c-1.1,1.1-1.9,2.4-2.3,4l0.8,0.7c0.6,0.5,0.9,1.2,0.9,1.9"></path>
</svg>
  );
}
function PerformanceSVG({className}: {className?: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
<polyline fill="none" stroke="#000" stroke-linecap="round" strokeLinejoin="round" stroke-miterlimit="10" strokeWidth="3" points="28.5,29.8 24,25.3 19.5,29.8"></polyline><line x1="24" x2="24" y1="40.3" y2="25.3" fill="none" stroke="#000" stroke-linecap="round" strokeLinejoin="round" stroke-miterlimit="10" strokeWidth="3"></line><path fill="none" stroke="#000" stroke-linecap="round" strokeLinejoin="round" stroke-miterlimit="10" strokeWidth="3" d="M32.4,13.8c-1.9-2.6-5-4.3-8.4-4.3c-5.8,0-10.5,4.7-10.5,10.5v0.5H12c-4.1,0-7.5,3.4-7.5,7.5s3.4,7.5,7.5,7.5	h2.1"></path><path fill="none" stroke="#000" stroke-linecap="round" strokeLinejoin="round" stroke-miterlimit="10" strokeWidth="3" d="M33.5,35.5H36c4.1,0,7.5-3.4,7.5-7.5s-3.4-7.5-7.5-7.5h-1.5"></path>
</svg>
  );
}