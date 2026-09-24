// ALL ITEMS ARE PLACEHOLDERS – replace with the client's menu before launch.
// price: 0 renders as "$—.—". Bangla names must be checked by a native speaker.
// tags: 'spicy' | 'vegetarian' | 'nuts' | 'popular'

const img = (caption, alt) => ({ src: null, alt, caption })

export const menu = [
  {
    id: 'rice-tehari',
    title: 'Rice & Tehari',
    titleBn: 'ভাত ও তেহারি',
    images: [
      img('Goat tehari, straight from the pot', 'Goat tehari on a steel plate'),
      img('Polau with chicken roast', 'Polau rice with a chicken roast leg'),
    ],
    items: [
      { name: 'Goat Tehari', nameBn: 'খাসির তেহারি', price: 0, desc: 'Fragrant rice cooked with goat, mustard oil and green chilli.', tags: ['popular'], placeholder: true },
      { name: 'Beef Tehari', nameBn: 'গরুর তেহারি', price: 0, desc: 'Short-grain rice slow-cooked with beef, whole spices and ghee.', tags: [], placeholder: true },
      { name: 'Polau & Chicken Roast', nameBn: 'পোলাও ও মুরগির রোস্ট', price: 0, desc: 'Buttery polau with a rich, sweet-savoury chicken roast.', tags: ['popular'], placeholder: true },
      { name: 'Kacchi Biryani', nameBn: 'কাচ্চি বিরিয়ানি', price: 0, desc: 'Marinated goat and potato layered with rice and sealed to cook.', tags: [], placeholder: true },
      { name: 'Vegetable Khichuri', nameBn: 'সবজি খিচুড়ি', price: 0, desc: 'Rice and lentils cooked soft with seasonal vegetables.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'curries-bhuna',
    title: 'Curries & Bhuna',
    titleBn: 'তরকারি ও ভুনা',
    images: [
      img('Beef kala bhuna, cooked dark and dry', 'Beef kala bhuna in a black iron pot'),
      img('Chicken curry with potato', 'Chicken curry in a bowl with rice'),
    ],
    items: [
      { name: 'Beef Kala Bhuna', nameBn: 'গরুর কালা ভুনা', price: 0, desc: 'Beef slow-fried with onion and roasted spices until almost black.', tags: ['spicy', 'popular'], placeholder: true },
      { name: 'Goat Curry', nameBn: 'খাসির মাংসের ঝোল', price: 0, desc: 'Bone-in goat in a thin, peppery gravy with potato.', tags: ['spicy'], placeholder: true },
      { name: 'Chicken Curry', nameBn: 'মুরগির ঝোল', price: 0, desc: 'Home-style chicken curry with potato, ginger and garlic.', tags: [], placeholder: true },
      { name: 'Chicken Rezala', nameBn: 'মুরগির রেজালা', price: 0, desc: 'Mild, creamy curry with yoghurt, cashew and cardamom.', tags: ['nuts'], placeholder: true },
      { name: 'Dal Bhuna', nameBn: 'ডাল ভুনা', price: 0, desc: 'Red lentils fried down with garlic, cumin and dried chilli.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'street-food',
    title: 'Street Food & Snacks',
    titleBn: 'স্ট্রিট ফুড ও নাস্তা',
    images: [
      img('Fuchka, filled to order', 'Fuchka shells with tamarind water'),
      img('Chotpoti with egg and tamarind', 'A bowl of chotpoti topped with egg'),
    ],
    items: [
      { name: 'Fuchka', nameBn: 'ফুচকা', price: 0, desc: 'Crisp shells filled with spiced potato and chickpea, with tamarind water.', tags: ['vegetarian', 'spicy', 'popular'], placeholder: true },
      { name: 'Chotpoti', nameBn: 'চটপটি', price: 0, desc: 'Warm yellow peas with potato, egg, onion and tamarind.', tags: ['spicy'], placeholder: true },
      { name: 'Haleem', nameBn: 'হালিম', price: 0, desc: 'Slow-cooked beef, lentils and wheat, topped with fried onion.', tags: ['popular'], placeholder: true },
      { name: 'Mughlai Paratha', nameBn: 'মোগলাই পরোটা', price: 0, desc: 'Flaky paratha stuffed with spiced mince and egg.', tags: [], placeholder: true },
      { name: 'Singara', nameBn: 'সিঙ্গারা', price: 0, desc: 'Pastry parcels of spiced potato and peanut.', tags: ['vegetarian', 'nuts'], placeholder: true },
      { name: 'Beguni', nameBn: 'বেগুনি', price: 0, desc: 'Eggplant slices fried in a chickpea batter.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'kebabs-grill',
    title: 'Kebabs & Grill',
    titleBn: 'কাবাব ও গ্রিল',
    images: [
      img('Chicken jali kebab, pan-fried', 'Chicken jali kebabs with a lattice egg coating'),
      img('Seekh kebab off the grill', 'Seekh kebabs on skewers'),
    ],
    items: [
      { name: 'Chicken Jali Kebab', nameBn: 'মুরগির জালি কাবাব', price: 0, desc: 'Minced chicken patties in a lacy egg coat.', tags: ['popular'], placeholder: true },
      { name: 'Beef Shami Kebab', nameBn: 'গরুর শামি কাবাব', price: 0, desc: 'Beef and chana dal patties, spiced and pan-fried.', tags: [], placeholder: true },
      { name: 'Seekh Kebab', nameBn: 'শিক কাবাব', price: 0, desc: 'Minced lamb with herbs, grilled on skewers.', tags: ['spicy'], placeholder: true },
      { name: 'Chicken Tikka', nameBn: 'চিকেন টিক্কা', price: 0, desc: 'Yoghurt-marinated chicken, chargrilled.', tags: ['spicy'], placeholder: true },
    ],
  },
  {
    id: 'wraps-burgers',
    title: 'Wraps, Burgers & Snack Packs',
    titleBn: 'র‍্যাপ, বার্গার ও স্ন্যাক প্যাক',
    images: [
      img('Halal snack pack, loaded', 'Halal snack pack with chips, meat and sauces'),
      img('Kebab wrap to go', 'A chicken kebab wrap cut in half'),
    ],
    items: [
      { name: 'Halal Snack Pack', nameBn: 'হালাল স্ন্যাক প্যাক', price: 0, desc: 'Chips, kebab meat, cheese and three sauces.', tags: ['popular'], placeholder: true },
      { name: 'Chicken Kebab Wrap', nameBn: 'চিকেন কাবাব র‍্যাপ', price: 0, desc: 'Grilled chicken, salad and garlic sauce in a paratha.', tags: [], placeholder: true },
      { name: 'Beef Kebab Wrap', nameBn: 'বিফ কাবাব র‍্যাপ', price: 0, desc: 'Spiced beef, onion, chilli sauce and salad.', tags: ['spicy'], placeholder: true },
      { name: 'Loaded Beef Burger', nameBn: 'লোডেড বিফ বার্গার', price: 0, desc: 'Beef patty, cheese, egg and house sauce.', tags: [], placeholder: true },
      { name: 'Chicken Burger', nameBn: 'চিকেন বার্গার', price: 0, desc: 'Crumbed chicken, lettuce and mint mayo.', tags: [], placeholder: true },
    ],
  },
  {
    id: 'breads-sides',
    title: 'Breads & Sides',
    titleBn: 'রুটি ও সাইড',
    images: [
      img('Paratha, layered and flaky', 'A stack of paratha'),
      img('Raita and salad', 'Small bowls of raita and cucumber salad'),
    ],
    items: [
      { name: 'Paratha', nameBn: 'পরোটা', price: 0, desc: 'Flaky, layered flatbread cooked on the tawa.', tags: ['vegetarian'], placeholder: true },
      { name: 'Naan', nameBn: 'নান', price: 0, desc: 'Soft leavened bread from the oven.', tags: ['vegetarian'], placeholder: true },
      { name: 'Garlic Naan', nameBn: 'গার্লিক নান', price: 0, desc: 'Naan brushed with garlic butter.', tags: ['vegetarian'], placeholder: true },
      { name: 'Raita', nameBn: 'রায়তা', price: 0, desc: 'Yoghurt with cucumber and roasted cumin.', tags: ['vegetarian'], placeholder: true },
      { name: 'Chips', nameBn: 'চিপস', price: 0, desc: 'Hot chips with chicken salt.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'drinks-desserts',
    title: 'Drinks & Desserts',
    titleBn: 'পানীয় ও মিষ্টি',
    images: [
      img('Borhani, the wedding drink', 'Glasses of borhani'),
      img('Firni set in clay pots', 'Firni in small clay bowls'),
    ],
    items: [
      { name: 'Borhani', nameBn: 'বোরহানি', price: 0, desc: 'Spiced yoghurt drink with mint and black salt.', tags: ['vegetarian', 'popular'], placeholder: true },
      { name: 'Mango Lassi', nameBn: 'আমের লাচ্ছি', price: 0, desc: 'Mango blended with yoghurt and a little cardamom.', tags: ['vegetarian'], placeholder: true },
      { name: 'Sweet Lassi', nameBn: 'মিষ্টি লাচ্ছি', price: 0, desc: 'Chilled sweet yoghurt drink.', tags: ['vegetarian'], placeholder: true },
      { name: 'Firni', nameBn: 'ফিরনি', price: 0, desc: 'Ground-rice pudding with cardamom and pistachio.', tags: ['vegetarian', 'nuts'], placeholder: true },
      { name: 'Mishti Doi', nameBn: 'মিষ্টি দই', price: 0, desc: 'Sweet set yoghurt with caramelised milk.', tags: ['vegetarian'], placeholder: true },
    ],
  },
]

// Marquee band: dish names alternating English and Bangla
export const marqueeDishes = [
  { text: 'Tehari' },
  { text: 'কালা ভুনা', lang: 'bn' },
  { text: 'Fuchka' },
  { text: 'হালিম', lang: 'bn' },
  { text: 'Jali kebab' },
  { text: 'চটপটি', lang: 'bn' },
  { text: 'Borhani' },
  { text: 'পরোটা', lang: 'bn' },
]

export const tagLabels = {
  spicy: 'Spicy',
  vegetarian: 'Vegetarian',
  nuts: 'Contains nuts',
  popular: 'Popular',
}

export const formatPrice = (price) => (price ? `$${price.toFixed(2)}` : '$—.—')
