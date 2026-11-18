import test from 'node:test';
import assert from 'node:assert/strict';
import { PRODUCTS } from '../data/products';
import { REVIEWS } from '../data/reviews';
import { SHOWROOMS } from '../data/showrooms';
import { filterAndSortProducts, searchProducts } from './catalogFilter';

test('BRASH SYSTEM catalog contains required core products with unique local images', () => {
  assert.equal(PRODUCTS.length, 12);
  const names = PRODUCTS.map((p) => p.name);
  const ruNames = PRODUCTS.map((p) => p.ruName).join(' ');

  assert.ok(names.includes('BRASH PDRN Valkyrie'));
  assert.ok(names.includes('BRASH PDRN Mystic'));
  assert.ok(names.includes('BRASH PDRN Open Eyes'));
  assert.ok(names.includes('BRASH Milk Cream'));
  assert.ok(names.includes('BRASH System Booster'));
  assert.ok(ruNames.includes('Валькирия'));
  assert.ok(ruNames.includes('Мистик'));
  assert.ok(ruNames.includes('Опен Айс'));
  assert.ok(ruNames.includes('Милк Крем'));

  const uniqueImages = new Set(PRODUCTS.map((p) => p.image));
  assert.equal(uniqueImages.size, 12);
  assert.ok(PRODUCTS.every((p) => p.image.startsWith('/images/brash_')));
});

test('filterAndSortProducts filters by BRASH SYSTEM category and sorts by name without price fields', () => {
  const creams = filterAndSortProducts(PRODUCTS, {
    category: 'creams',
    skinType: 'all',
    sortBy: 'name-asc',
  });
  assert.equal(creams.length, 3);
  assert.ok(creams[0].name.localeCompare(creams[1].name) <= 0);
  assert.ok(creams[1].name.localeCompare(creams[2].name) <= 0);
  assert.ok(PRODUCTS.every((p) => !('price' in p)));
});

test('searchProducts finds BRASH SYSTEM products by Russian name', () => {
  const valkyrie = searchProducts(PRODUCTS, 'Валькирия');
  assert.equal(valkyrie.length, 1);
  assert.equal(valkyrie[0].id, 'brash-pdrn-valkyrie');

  const milk = searchProducts(PRODUCTS, 'Милк Крем');
  assert.equal(milk.length, 1);
  assert.equal(milk[0].id, 'brash-milk-cream');
});

test('SHOWROOMS contains only Bryansk Prospect Lenina 99 office with phones and REVIEWS is concise', () => {
  assert.equal(SHOWROOMS.length, 1);
  assert.equal(SHOWROOMS[0].city, 'Брянск');
  assert.equal(SHOWROOMS[0].address, 'проспект Ленина, д. 99');
  assert.ok(SHOWROOMS[0].name.includes('Точка красоты'));
  assert.equal(SHOWROOMS[0].phones.length, 2);
  assert.equal(SHOWROOMS[0].telegram, '');
  assert.equal(SHOWROOMS[0].whatsapp, '');
  assert.equal(REVIEWS.length, 2);
});

