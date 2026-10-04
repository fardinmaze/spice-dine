// The restaurant's real menu, names, descriptions and prices, taken from
// https://spicedine.yumbojumbo.com.au/menu on 2026-10-04 (prices exactly as shown there).
// Obvious typos in descriptions are fixed; dishes listed twice there appear once here.
// tags: 'spicy' | 'vegetarian' | 'nuts' | 'popular'. 'popular' = the ordering page's "Top Sellers".
// Dishes in the 'on-demand' category are made to order, one day ahead. Which dishes belong there is a PLACEHOLDER – confirm with the client.

// Photos in public/images/dishes/ (originals in source-images/Items Image); src: null renders a placeholder.
const img = (caption, alt, src = null) => ({ src: src && `/images/dishes/${src}.webp`, alt, caption })

// One dish: name, price (AUD), optional description and tags
const dish = (name, price, desc = '', tags = []) => ({ name, price, desc, tags })

export const menu = [
  {
    id: 'biryani-tehari',
    title: 'Biryani & Tehari',
    images: [
      img('Beef tehari with kebabs, borhani and gulab jamun', 'A plate of beef tehari with chicken skewers, grilled chicken, a glass of borhani and a bowl of gulab jamun', 'tehari-feast'),
      img('Murag polau', 'A plate of chicken polau'),
    ],
    items: [
      dish('Beef Tehari', 21.21, 'Aromatic rice with tender beef (with bone), a Bangladeshi specialty known for its rich, savoury flavours.'),
      dish('Goat Tehari', 20.11, 'Spicy aromatic rice mixed with tender goat meat.', ['spicy']),
      dish('Beef Biriyani', 21.21),
      dish('Murag Polau', 21.21),
    ],
  },
  {
    id: 'curries-bhuna',
    title: 'Curries & Bhuna',
    images: [
      img('Chicken curry with potato', 'Chicken drumsticks and potato in a rich curry, topped with coriander, in a white bowl', 'chicken-curry-potato'),
      img('Ilish fish curry with rice and lassi', 'Hilsa fish steaks in curry with a bowl of rice and a banana lassi', 'hilsa-mustard-curry'),
    ],
    items: [
      dish('Beef Curry (Kala Bhuna)', 18.96, 'Spicy beef curry with bone.', ['spicy']),
      dish('Chicken Curry', 17.86, 'Spicy chicken curry with bone.', ['spicy']),
      dish('Goat Rezala', 18.96),
      dish('Chicken Roast', 11.16, 'Spicy chicken Maryland with gravy.', ['spicy']),
      dish('Ilish Fish Curry', 16.76, 'A traditional Bangladeshi curry with ilish fish, rich spices and aromatic flavours.'),
      dish('Ruhu Fish Curry', 14.51),
      dish('Mixed Veg', 12.31),
      dish('Buter Dal', 14.51),
      dish('Buter Dal with Beef', 18.96),
      dish('Buter Dal with Goat', 18.96),
      dish('Buter Dal with Chicken', 18.96),
    ],
  },
  {
    id: 'combo-deals',
    title: 'Combo Deals',
    images: [
      img('Polau and roast, the Popular Deal', 'Polau rice with chicken roast'),
      img('Bangla Deal: rice, fish curry, dal and vorta', 'Steamed rice with fish curry, dal and aloo vorta'),
    ],
    items: [
      dish('Everyday Happy Deal', 17.86, '1 plain rice + 1 curry + dal or veg.', ['popular']),
      dish('Popular Deal', 16.76, 'Polau + roast.'),
      dish('Bangla Deal', 25.66, 'Steamed rice + fish curry + dal + 1 vorta (aloo or dal).'),
      dish('Bhorta & Shutki Deal', 24.56, '1 rice + 2 bhorta + 1 lotia shutki + dal or veg.'),
      dish('Most Lovable Deal', 33.46, 'Khichuri + duck curry + borhani.'),
    ],
  },
  {
    id: 'street-food',
    title: 'Street Food & Snacks',
    images: [
      img('Fuchka, filled to order', 'Filled fuchka shells around a glass of tamarind water, with bowls of chickpeas, tomato, coriander and spices', 'fuchka-platter'),
      img('Chotpoti with egg and tamarind', 'A large bowl of chotpoti with chickpeas, crushed egg and crisp pieces, with tamarind sauce on the side', 'chotpoti'),
    ],
    items: [
      dish('Fuchka', 12.31, 'Bangladeshi street food.', ['popular']),
      dish('Chotpoti', 12.31, 'Bangladeshi street food.'),
      dish('Chicken Jali Kebab', 5.61, 'Halal chicken mince kebabs, traditionally seasoned with spices, dipped in egg and fried.', ['popular']),
      dish('Jhal Muri', 5.61, 'A crunchy mix of puffed rice, spices and tangy flavours inspired by traditional Bangladeshi street snacks.', ['popular']),
      dish('Muglai Paratha', 17.86),
      dish('Dal Puri', 3.36, 'Crispy puri stuffed with seasoned lentils.'),
      dish('Aloo Puri', 3.36, 'Fluffy puris paired with spiced mashed potato.'),
      dish('Piyaju', 10.06, '6 lentil balls, a classic Bangladeshi street snack, perfect for a spicy, flavourful bite.', ['spicy']),
      dish('Chicken Roll', 6.11, 'Halal chicken wrapped in a soft roll, seasoned with authentic spices.'),
      dish('Kolija Singara', 5.61, 'Crispy samosa filled with tender goat liver.'),
      dish('Thai Soup BD Style', 13.41, 'A savoury Thai soup with chicken and prawn, with a Bangladeshi twist.'),
    ],
  },
  {
    id: 'vorta-shutki',
    title: 'Vorta & Shutki',
    images: [
      img('Aloo and begun vorta', 'Small bowls of mashed potato and mashed eggplant vorta'),
      img('Lotia shutki bhuna', 'Dried lotia fish cooked in a spicy bhuna'),
    ],
    items: [
      dish('Aloo Vorta', 5.61, 'Spicy mashed potato.', ['spicy']),
      dish('Begun Vorta', 6.11, 'Spicy mashed eggplant.', ['spicy']),
      dish('Dal Bhorta', 6.71, 'Mashed red lentils with a spicy kick.', ['spicy']),
      dish('Ruhu Fish Bhorta', 8.36, 'Spicy mashed ruhu fish.', ['spicy']),
      dish('Lotia Shutki Bhorta', 7.81),
      dish('Lotia Shutki Bhuna', 11.16),
      dish('Dry Lotia Bhuna', 11.16),
    ],
  },
  {
    id: 'kebabs-wraps',
    title: 'Kebabs & Wraps',
    images: [
      img('Chicken kebab wrap with chips', 'A grilled chicken wrap cut in half with chips and a cola', 'chicken-wrap-fries'),
      img('Kebab wrap combo, to go', 'A chicken wrap with garlic sauce, a cone of chips and an iced cola', 'wrap-combo'),
    ],
    items: [
      dish('Halal Snack Pack Large', 20.11, 'Choice of meat: chicken, beef or mixed.', ['popular']),
      dish('Halal Snack Pack Small', 14.51, 'Choice of meat: chicken, beef or mixed.'),
      dish('Kebab Rice Box', 20.11, 'Choice of meat: chicken, beef or mixed.'),
      dish('Kebab Plates', 16.76, 'Choice of meat: chicken, beef or mixed.'),
      dish('Kebab Wrap (Small)', 11.16, 'Choice of meat: chicken, beef or mixed.'),
      dish('Kebab Wrap Combo', 21.1, '1 large kebab wrap + small hot chips + can of drink (375ml).'),
      dish('Family Kebab Wrap Deal', 38.95, '2 kebab wraps + large chips + 1.25L drink.'),
      dish('Salad Wrap', 11.16),
      dish('Falafel Wrap Large', 16.76),
      dish('Fresh Salad Plates', 11.16),
    ],
  },
  {
    id: 'burgers-seafood',
    title: 'Burgers, Chips & Seafood',
    images: [
      img('Burger with a kebab rice box', 'A sesame-bun beef burger beside grilled seekh kebabs over rice with salad', 'burger-and-kebab-rice'),
      img('Fish and chips with lemon', 'Battered fish fillets and chips with lemon wedges', 'fish-and-chips'),
    ],
    items: [
      dish('Burger Combo', 17.86, '1 burger + small hot chips + can of drink (375ml).'),
      dish('Family Burger Combo', 32.36, '2 burgers + large hot chips + 1.25L soft drink.'),
      dish('Kids Meal', 12.31, 'Small hot chips + chicken nuggets + pop-top juice (250ml).'),
      dish('Fish N Chips', 15.61, '2 fish fillets + large chips.'),
      dish('Seafood Mixed Plate', 27.91, '2 fillets + 5 calamari rings + large chips.'),
      dish('Calamari Rings', 11.16, '5 crumbed calamari rings.'),
      dish('Hot Chips Large', 7.81),
      dish('Hot Chips Small', 5.01),
    ],
  },
  {
    id: 'bongo-fusion',
    title: 'Bongo Fusion',
    images: [
      img('Bongo fried chicken with fried rice', 'Fried chicken drumstick with vegetable fried rice and sweet and sour sauce', 'fried-chicken-rice-plate'),
      img('Wontons plate', 'A plate of five fried wontons'),
    ],
    items: [
      dish('Bongo Fried Rice', 14.51),
      dish('Bongo Fried Chicken', 4.46),
      dish('Bongo Chinese Vegetable', 14.5),
      dish('Bongo Thai Soup', 13.41),
      dish('Wontons Plate (5 Pcs)', 11.16),
      dish('Butter Chicken', 14.51),
    ],
  },
  {
    id: 'rice-breads',
    title: 'Rice & Breads',
    images: [
      img('Paratha with spiced potato', 'Hands tearing a flaky layered paratha, with a bowl of spiced potato', 'paratha-aloo'),
      img('Freshly cooked polau rice', 'A bowl of aromatic polau rice'),
    ],
    items: [
      dish('Plain Rice', 4.46, 'Freshly cooked basmati rice.'),
      dish('Polau Rice', 8.96, 'Freshly cooked special aromatic rice.'),
      dish('Khichuri', 11.16, 'Freshly cooked spicy aromatic rice.', ['spicy']),
      dish('Khuder Bhat', 9.46, 'Freshly cooked aromatic broken rice.'),
      dish('Hand Made Paratha', 5.1, 'Flaky, layered flatbread, pan-fried until golden.'),
      dish('Ready Made Paratha', 3.36, 'Flaky, layered flatbread, pan-fried until golden.'),
      dish('Naan Bread Plain Regular', 5.1, 'Soft, lightly leavened flatbread.'),
      dish('Mini Naan Bread', 3.36, 'Soft, lightly leavened flatbread.'),
    ],
  },
  {
    id: 'drinks-desserts',
    title: 'Drinks & Desserts',
    images: [
      img('Lassi, mango lassi and milk tea', 'A tray of sweet lassi, mango lassi, pistachio lassi and a cup of milk tea', 'lassi-and-chai'),
      img('Bangladeshi sweets', 'A plate of chom chom, kalo jam and rashgulla'),
    ],
    items: [
      dish('Borhani', 7.81, 'Spiced yoghurt drink with mint and spices, in a 600ml bottle.'),
      dish('Lassi', 7.81, 'Traditional Bangladeshi yoghurt drink, in a 500ml bottle.'),
      dish('Mango Lassi', 8.96),
      dish('Milk Cha', 5.01),
      dish('Gur Cha', 5.61),
      dish('Malai Cha', 6.11),
      dish('Soft Drink Can (375ml)', 3.36, 'Pepsi, Pepsi Max, Fanta, Diet Coke, Sprite, Mountain Dew or Solo.'),
      dish('Soft Drink Bottle (600ml)', 5.61, 'Pepsi, Pepsi Max, Coke, Coke Zero or Solo.'),
      dish('Soft Drink Bottle (1.25L)', 6.71, 'Pepsi, Pepsi Max, Coke, Solo or Fanta.'),
      dish('Gulab Jamun', 3.36),
      dish('Chom Chom', 3.36),
      dish('Kalo Jam', 3.36),
      dish('Rashgulla', 3.36),
      dish('Balushai', 4),
      dish('Malai Sondesh', 4),
    ],
  },
  {
    id: 'on-demand',
    title: 'On Demand',
    note: 'Slow-cooked to order. Order today, pick up or dine in tomorrow.',
    // PLACEHOLDER – which dishes need a day's notice is a guess; confirm with the client
    images: [
      img('Goat haleem, slow-cooked', 'A bowl of goat haleem topped with fried onion'),
      img('Duck curry', 'Duck pieces in a rich Bangladeshi curry'),
    ],
    items: [
      dish('Goat Haleem', 12.31, 'Bangladeshi street food, slow-cooked.', ['popular']),
      dish('Duck Curry', 21.21, 'Tender duck simmered in a rich Bangladeshi curry, bursting with authentic flavours.'),
    ],
  },
]

// Stable ids for the cart: '<category>/<dish-slug>'
const slug = (text) => text.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
for (const category of menu) {
  for (const item of category.items) item.id = `${category.id}/${slug(item.name)}`
}

export const dishesById = new Map(menu.flatMap((c) => c.items.map((item) => [item.id, item])))

export const ON_DEMAND_ID = 'on-demand'
const onDemandIds = new Set(menu.find((c) => c.id === ON_DEMAND_ID)?.items.map((d) => d.id))
export const isOnDemand = (item) => onDemandIds.has(item.id)

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
}

export const formatPrice = (price) => (price ? `$${price.toFixed(2)}` : '$—.—')
