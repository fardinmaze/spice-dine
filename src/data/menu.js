// ALL ITEMS ARE PLACEHOLDERS – replace with the client's menu before launch.
// price: 0 renders as "$—.—".
// tags: 'spicy' | 'vegetarian' | 'nuts' | 'popular' | 'on-demand'
// 'on-demand' = made to order, one day ahead. Which dishes need it is a PLACEHOLDER – confirm with the client.

// Photos in public/images/dishes/ are temporary (from the client's "Items Image" folder); src: null renders a placeholder.
const img = (caption, alt, src = null) => ({ src: src && `/images/dishes/${src}.webp`, alt, caption })

export const menu = [
  {
    id: 'rice-tehari',
    title: 'Rice & Tehari',
    images: [
      img('Beef tehari with kebabs, borhani and gulab jamun', 'A plate of beef tehari with chicken skewers, grilled chicken, a glass of borhani and a bowl of gulab jamun', 'tehari-feast'),
      img('Chicken fry with fried rice', 'Fried chicken drumstick with vegetable fried rice and sweet and sour sauce', 'fried-chicken-rice-plate'),
    ],
    items: [
      { name: 'Goat Tehari', price: 0, desc: 'Fragrant rice cooked with goat, mustard oil and green chilli.', tags: ['popular'], placeholder: true },
      { name: 'Beef Tehari', price: 0, desc: 'Short-grain rice slow-cooked with beef, whole spices and ghee.', tags: [], placeholder: true },
      { name: 'Polau & Chicken Roast', price: 0, desc: 'Buttery polau with a rich, sweet-savoury chicken roast.', tags: ['popular'], placeholder: true },
      { name: 'Kacchi Biryani', price: 0, desc: 'Marinated goat and potato layered with rice and sealed to cook.', tags: ['on-demand'], placeholder: true },
      { name: 'Chicken Fry & Fried Rice', price: 0, desc: 'Crumbed fried chicken with vegetable fried rice.', tags: [], placeholder: true },
      { name: 'Vegetable Khichuri', price: 0, desc: 'Rice and lentils cooked soft with seasonal vegetables.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'curries-bhuna',
    title: 'Curries & Bhuna',
    images: [
      img('Shorshe ilish with rice and lassi', 'Hilsa steaks in mustard curry with a bowl of rice and a banana lassi', 'hilsa-mustard-curry'),
      img('Chicken curry with potato', 'Chicken curry in a bowl with rice'),
    ],
    items: [
      { name: 'Beef Kala Bhuna', price: 0, desc: 'Beef slow-fried with onion and roasted spices until almost black.', tags: ['spicy', 'popular'], placeholder: true },
      { name: 'Goat Curry', price: 0, desc: 'Bone-in goat in a thin, peppery gravy with potato.', tags: ['spicy'], placeholder: true },
      { name: 'Chicken Curry', price: 0, desc: 'Home-style chicken curry with potato, ginger and garlic.', tags: [], placeholder: true },
      { name: 'Shorshe Ilish', price: 0, desc: 'Hilsa steaks cooked in mustard paste, green chilli and mustard oil.', tags: ['spicy', 'on-demand'], placeholder: true },
      { name: 'Chicken Rezala', price: 0, desc: 'Mild, creamy curry with yoghurt, cashew and cardamom.', tags: ['nuts'], placeholder: true },
      { name: 'Dal Bhuna', price: 0, desc: 'Red lentils fried down with garlic, cumin and dried chilli.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'street-food',
    title: 'Street Food & Snacks',
    images: [
      img('Fuchka, filled to order', 'Fuchka shells with tamarind water'),
      img('Chotpoti with egg and tamarind', 'A bowl of chotpoti topped with egg'),
    ],
    items: [
      { name: 'Fuchka', price: 0, desc: 'Crisp shells filled with spiced potato and chickpea, with tamarind water.', tags: ['vegetarian', 'spicy', 'popular'], placeholder: true },
      { name: 'Chotpoti', price: 0, desc: 'Warm yellow peas with potato, egg, onion and tamarind.', tags: ['spicy'], placeholder: true },
      { name: 'Haleem', price: 0, desc: 'Slow-cooked beef, lentils and wheat, topped with fried onion.', tags: ['popular', 'on-demand'], placeholder: true },
      { name: 'Mughlai Paratha', price: 0, desc: 'Flaky paratha stuffed with spiced mince and egg.', tags: [], placeholder: true },
      { name: 'Singara', price: 0, desc: 'Pastry parcels of spiced potato and peanut.', tags: ['vegetarian', 'nuts'], placeholder: true },
      { name: 'Beguni', price: 0, desc: 'Eggplant slices fried in a chickpea batter.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'kebabs-grill',
    title: 'Kebabs & Grill',
    images: [
      img('Seekh kebab on rice, with a beef burger', 'Grilled seekh kebabs over rice with salad beside a sesame-bun beef burger', 'burger-and-kebab-rice'),
      img('Chicken kebab wrap with chips', 'A grilled chicken wrap cut in half with chips and a cola', 'chicken-wrap-fries'),
    ],
    items: [
      { name: 'Chicken Jali Kebab', price: 0, desc: 'Minced chicken patties in a lacy egg coat.', tags: ['popular'], placeholder: true },
      { name: 'Beef Shami Kebab', price: 0, desc: 'Beef and chana dal patties, spiced and pan-fried.', tags: [], placeholder: true },
      { name: 'Seekh Kebab', price: 0, desc: 'Minced lamb with herbs, grilled on skewers.', tags: ['spicy'], placeholder: true },
      { name: 'Chicken Tikka', price: 0, desc: 'Yoghurt-marinated chicken, chargrilled.', tags: ['spicy'], placeholder: true },
    ],
  },
  {
    id: 'wraps-burgers',
    title: 'Wraps, Burgers & Snack Packs',
    images: [
      img('Chicken wrap meal, to go', 'A chicken wrap with garlic sauce, a cone of chips and an iced cola', 'wrap-combo'),
      img('Fish and chips with lemon', 'Battered fish fillets and chips with lemon wedges', 'fish-and-chips'),
    ],
    items: [
      { name: 'Halal Snack Pack', price: 0, desc: 'Chips, kebab meat, cheese and three sauces.', tags: ['popular'], placeholder: true },
      { name: 'Chicken Kebab Wrap', price: 0, desc: 'Grilled chicken, salad and garlic sauce in a paratha.', tags: [], placeholder: true },
      { name: 'Beef Kebab Wrap', price: 0, desc: 'Spiced beef, onion, chilli sauce and salad.', tags: ['spicy'], placeholder: true },
      { name: 'Loaded Beef Burger', price: 0, desc: 'Beef patty, cheese, egg and house sauce.', tags: [], placeholder: true },
      { name: 'Fish & Chips', price: 0, desc: 'Battered fish fillets, chips and a wedge of lemon.', tags: [], placeholder: true },
      { name: 'Chicken Burger', price: 0, desc: 'Crumbed chicken, lettuce and mint mayo.', tags: [], placeholder: true },
    ],
  },
  {
    id: 'breads-sides',
    title: 'Breads & Sides',
    images: [
      img('Paratha, layered and flaky', 'A stack of paratha'),
      img('Raita and salad', 'Small bowls of raita and cucumber salad'),
    ],
    items: [
      { name: 'Paratha', price: 0, desc: 'Flaky, layered flatbread cooked on the tawa.', tags: ['vegetarian'], placeholder: true },
      { name: 'Naan', price: 0, desc: 'Soft leavened bread from the oven.', tags: ['vegetarian'], placeholder: true },
      { name: 'Garlic Naan', price: 0, desc: 'Naan brushed with garlic butter.', tags: ['vegetarian'], placeholder: true },
      { name: 'Raita', price: 0, desc: 'Yoghurt with cucumber and roasted cumin.', tags: ['vegetarian'], placeholder: true },
      { name: 'Chips', price: 0, desc: 'Hot chips with chicken salt.', tags: ['vegetarian'], placeholder: true },
    ],
  },
  {
    id: 'drinks-desserts',
    title: 'Drinks & Desserts',
    images: [
      img('Lassi, mango lassi and milk tea', 'A tray of sweet lassi, mango lassi, pistachio lassi and a cup of milk tea', 'lassi-and-chai'),
      img('Firni set in clay pots', 'Firni in small clay bowls'),
    ],
    items: [
      { name: 'Borhani', price: 0, desc: 'Spiced yoghurt drink with mint and black salt.', tags: ['vegetarian', 'popular'], placeholder: true },
      { name: 'Mango Lassi', price: 0, desc: 'Mango blended with yoghurt and a little cardamom.', tags: ['vegetarian'], placeholder: true },
      { name: 'Sweet Lassi', price: 0, desc: 'Chilled sweet yoghurt drink.', tags: ['vegetarian'], placeholder: true },
      { name: 'Milk Tea', price: 0, desc: 'Strong black tea boiled with milk and sugar.', tags: ['vegetarian'], placeholder: true },
      { name: 'Firni', price: 0, desc: 'Ground-rice pudding with cardamom and pistachio.', tags: ['vegetarian', 'nuts'], placeholder: true },
      { name: 'Mishti Doi', price: 0, desc: 'Sweet set yoghurt with caramelised milk.', tags: ['vegetarian'], placeholder: true },
    ],
  },
]

// Stable ids for the cart: '<category>/<dish-slug>'
const slug = (text) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
for (const category of menu) {
  for (const dish of category.items) dish.id = `${category.id}/${slug(dish.name)}`
}

export const dishesById = new Map(menu.flatMap((c) => c.items.map((dish) => [dish.id, dish])))

export const isOnDemand = (dish) => dish.tags.includes('on-demand')

// Marquee band
export const marqueeDishes = [
  { text: 'Tehari' },
  { text: 'Kala bhuna' },
  { text: 'Fuchka' },
  { text: 'Haleem' },
  { text: 'Jali kebab' },
  { text: 'Snack packs' },
  { text: 'Borhani' },
  { text: 'Paratha' },
]

export const tagLabels = {
  spicy: 'Spicy',
  vegetarian: 'Vegetarian',
  nuts: 'Contains nuts',
  popular: 'Popular',
  'on-demand': 'On Demand',
}

export const formatPrice = (price) => (price ? `$${price.toFixed(2)}` : '$—.—')
