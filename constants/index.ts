export const PUBLIC_NAVIGATION = {
  LOGIN: "/login",
};

export const PRIVATE_NAVIGATION = {
  HOME: { VIEW: "/" },
  PRODUCT: { VIEW: "/product", DETAIL: (name: string) => `/product/${name}` },
  CART: { VIEW: "/cart" },
  CHECKOUT: { VIEW: "/checkout" },
  PROFILE: { VIEW: "/profile" },
};

export const NO_IMAGE_URL = "/no-image-product.png";
