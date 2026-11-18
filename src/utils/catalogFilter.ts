import type { Product } from '../data/products';

export type CatalogSortBy = 'popular' | 'rating' | 'name-asc';

export interface CatalogFilterOptions {
  category: string;
  skinType: string;
  sortBy: CatalogSortBy;
}

export function filterAndSortProducts(
  products: Product[],
  { category, skinType, sortBy }: CatalogFilterOptions
): Product[] {
  return products
    .filter((product) => {
      const matchCat = category === 'all' || product.category === category;
      const matchSkin =
        skinType === 'all' ||
        product.skinTypes.includes(skinType) ||
        product.skinTypes.includes('Для всех типов');
      return matchCat && matchSkin;
    })
    .sort((a, b) => {
      if (sortBy === 'name-asc') return a.name.localeCompare(b.name);
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount;
    });
}

export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.ruName.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.keyIngredients.some((ing) => ing.name.toLowerCase().includes(q))
  );
}
