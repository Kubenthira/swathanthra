import { Category, Product } from './types';
import asianPaintsImg from './assets/images/asian_paints_1782123960714.jpg';
import chennapatnaToysImg from './assets/images/chennapatna_toys_1782123876291.jpg';
import cupSambraniImg from './assets/images/cup_sambrani_1782123860319.jpg';
import electrodesImg from './assets/images/hardware_electrodes_1782123925771.jpg';
import jaggeryBlocksImg from './assets/images/jaggery_blocks_1782123891500.jpg';
import poojaCamphorImg from './assets/images/pooja_camphor_1782123843532.jpg';
import tulsiSaplingImg from './assets/images/tulsi_sapling_1782123906360.jpg';
import woodPressedOilImg from './assets/images/wood_pressed_oil_1782123942157.jpg';

export const categories: Category[] = [
  { id: 'all', name: 'All Products' },
  { id: 'landscaping', name: 'Landscaping & Nursery' },
  { id: 'gifts', name: 'Gifts & Toys' },
  { id: 'food', name: 'Food & Oils' },
  { id: 'pooja', name: 'Pooja Essentials' },
  { id: 'industrial', name: 'Industrial & Paints' },
  { id: 'home', name: 'Home & Ceramics' },
];

export const products: Product[] = [
  {
    id: 'p1',
    categoryId: 'landscaping',
    name: 'Garden Landscaping Service',
    description: 'Complete outdoor styling, lawn setup, and maintenance services.',
    price: 4999,
    imageUrl: 'https://images.unsplash.com/photo-1588666309990-d68f08e3d4a6?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p2',
    categoryId: 'landscaping',
    name: 'Assorted Nursery Saplings',
    description: 'Healthy saplings for indoor and outdoor gardening.',
    price: 250,
    imageUrl: tulsiSaplingImg,
  },
  {
    id: 'p3',
    categoryId: 'gifts',
    name: 'Mysore Chennapatna Wooden Toys',
    description: 'Traditional, safe, and eco-friendly handcrafted wooden toys. Perfect for return gifts.',
    price: 450,
    imageUrl: chennapatnaToysImg,
  },
  {
    id: 'p4',
    categoryId: 'food',
    name: 'Wood Press Groundnut Oil',
    description: '100% natural, cold-pressed groundnut oil retaining all traditional nutrients.',
    price: 380,
    imageUrl: woodPressedOilImg,
  },
  {
    id: 'p5',
    categoryId: 'food',
    name: 'Multigrain Health Mix',
    description: 'Nutritious homemade style health mix for all ages.',
    price: 290,
    imageUrl: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p6',
    categoryId: 'food',
    name: 'Amul Ice Cream (Tub)',
    description: 'Premium creamy Amul ice cream in various flavors.',
    price: 350,
    imageUrl: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p7',
    categoryId: 'pooja',
    name: 'Pure Refined Camphor',
    description: 'High-quality smokeless camphor for daily aarti and pooja.',
    price: 120,
    imageUrl: poojaCamphorImg,
  },
  {
    id: 'p8',
    categoryId: 'pooja',
    name: 'Green Camphor (Pachai Karpuram)',
    description: 'Edible grade green camphor for prasadam and spiritual use.',
    price: 180,
    imageUrl: 'https://images.unsplash.com/photo-1615592389070-bcc97e050800?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p9',
    categoryId: 'pooja',
    name: 'Premium Cup Sambrani',
    description: 'Aromatic cup sambrani for a divine and peaceful atmosphere.',
    price: 150,
    imageUrl: cupSambraniImg,
  },
  {
    id: 'p10',
    categoryId: 'pooja',
    name: 'Organic Jaggery Blocks',
    description: 'Pure, chemical-free jaggery for pooja offerings and cooking.',
    price: 95,
    imageUrl: jaggeryBlocksImg,
  },
  {
    id: 'p11',
    categoryId: 'industrial',
    name: 'Asian Paints Royal Emulsion',
    description: 'Luxury interior and exterior paints for your infrastructure projects.',
    price: 3200,
    imageUrl: asianPaintsImg,
  },
  {
    id: 'p12',
    categoryId: 'industrial',
    name: 'D&H Secheron Special Electrodes',
    description: 'Industrial grade welding electrodes for professional hardware works.',
    price: 850,
    imageUrl: electrodesImg,
  },
  {
    id: 'p13',
    categoryId: 'home',
    name: 'Designer Glassware Set',
    description: 'Elegant 6-piece drinking glassware for homes and events.',
    price: 799,
    imageUrl: 'https://images.unsplash.com/photo-1571259160565-df04e8d3ee6e?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'p14',
    categoryId: 'home',
    name: 'Artisan Ceramic Bowls',
    description: 'Beautiful ceramic tableware perfect for dining decor.',
    price: 499,
    imageUrl: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600&auto=format&fit=crop&q=80',
  },
];
