import ListingStoreClient from "@/components/layout/public/client-listing-layout/listing-store-layout/listing-store-layout";

export default function StorePage({ params }: { params: { slug: string } }) {
  const title = params.slug.replace("-", " ").toUpperCase();

  return <ListingStoreClient title={title} />;
}
