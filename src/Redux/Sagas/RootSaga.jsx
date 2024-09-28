import { all } from "redux-saga/effects";
import { maincategorySagas } from "./MaincategorySagas";
import { subcategorySagas } from "./SubcategorySagas";
import { brandSagas } from "./BrandSagas";
import { productSagas } from "./ProductSagas";
import { testimonialSagas } from "./TestimonialSagas";
import { cartSagas } from "./CartSagas"
import { newsletterSagas } from "./NewsletterSagas";
import { checkoutSagas } from "./CheckoutSagas";
import { contactusSagas } from "./ContactUsSagas";
import { wishlistSagas } from "./WishlistSagas";

export default function* RootSaga() {
    yield all([
        maincategorySagas(),
        subcategorySagas(),
        brandSagas(),
        productSagas(),
        testimonialSagas(),
        cartSagas(),
        newsletterSagas(),
        checkoutSagas(),
        contactusSagas(),
        wishlistSagas()
    ])
}