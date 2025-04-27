import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from '@remix-run/react';
import {
  type CartViewPayload,
  Image,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
      <>     
        <div className="top-bar bg-sky-800 text-center py-2 px-4">
          <p className="text-sm poppins-bold" >
            <NavLink to="/pages/contact" className="text-sky-50 hover:text-sky-200">
              Get a FREE Quote
            </NavLink>
          </p>
        </div>
      <header className="header px-4 py-8 bg-sky-50 border-b-2 border-sky-100 shadow-md">
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end>
          <strong className='poppins-semibold text-neutral-900'>{shop.name}</strong>
        </NavLink>
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
    </>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
          className='poppins-semibold text-neutral-900'
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item poppins-semibold text-neutral-900" 
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      
      <NavLink prefetch="intent" to="/account" style={activeLinkStyle} className={'poppins-bold'}>
        <Suspense fallback="Sign in">
          <Await resolve={isLoggedIn} errorElement="Sign in">
          <Image
  src="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/icons8-businessman-48.png?v=1745558283"
  alt="Account icon"
  width={36}
  height={36}
  loading="eager" // Optional: "lazy" (default) or "eager"
/>
          </Await>
        </Suspense>
      </NavLink>
      <SearchToggle />
      <CartToggle cart={cart} />
      <HeaderMenuMobileToggle />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset"
      onClick={() => open('mobile')}
    >
      <h3 className='poppins-semibold text-neutral-900 text-2xl'>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="36" height="36" viewBox="0 0 48 48">
<path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M36.1,7.5h2.4c1.1,0,2,0.9,2,2v3c0,1.1-0.9,2-2,2H18"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M13,14.5H9.5c-1.1,0-2-0.9-2-2v-3c0-1.1,0.9-2,2-2h21.3"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M13.3,27.5H9.5c-1.1,0-2-0.9-2-2v-3c0-1.1,0.9-2,2-2h20"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M35,20.5h3.5c1.1,0,2,0.9,2,2v3c0,1.1-0.9,2-2,2h-20"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M13.5,40.5h-4c-1.1,0-2-0.9-2-2v-3c0-1.1,0.9-2,2-2h19.6"></path><path fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M34.2,33.5h4.3c1.1,0,2,0.9,2,2v3c0,1.1-0.9,2-2,2h-20"></path>
</svg>
      </h3>
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button className="reset poppins-semibold text-neutral-900 hover:cursor-pointer" onClick={() => open('search')}>
      <Image
  src="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/icons8-search-48.png?v=1745558175"
  alt="Search icon"
  width={36}
  height={36}
  loading="eager" // Optional: "lazy" (default) or "eager"
/>
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <a
      href="/cart"
      className='poppins-semibold text-neutral-900 relative pr-4'
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <Image
  src="https://cdn.shopify.com/s/files/1/0634/1830/2531/files/icons8-paper-bag-48.png?v=1745557179"
  alt="Shopping bag icon"
  width={36}
  height={36}
  loading="eager" // Optional: "lazy" (default) or "eager"
/> {count === null ? <span className='absolute top-0 right-0 size-3.5 poppins-semibold text-neutral-900'>&nbsp;</span> : <span className='absolute top-0 right-0 size-3.5 poppins-semibold text-neutral-900'>{count}</span>}
    </a>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
