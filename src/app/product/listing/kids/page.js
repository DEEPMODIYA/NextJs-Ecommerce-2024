import CommonListing from "@/components/CommonListing";
import { productByCategory } from "@/services/product";

export default async function kidsAllProducts() {

  const getAllProducts = await productByCategory("kids");
  //console.log(allAdminProducts,'print kr ne');
  return <CommonListing data={getAllProducts && getAllProducts.data}
  />
}