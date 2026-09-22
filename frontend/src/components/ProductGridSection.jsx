import { ProductCard } from "./ProductCard";
import { SectionHeading } from "./SectionHeading";

export function ProductGridSection({ eyebrow, title, copy, products, onView, onOrder }) {
  return (
    <section>
      <SectionHeading eyebrow={eyebrow} title={title} copy={copy} />
      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 g-4 mb-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onView={onView} onOrder={onOrder} />
        ))}
      </div>
    </section>
  );
}
