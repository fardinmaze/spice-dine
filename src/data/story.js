// ALL STORY CONTENT IS PLACEHOLDER – replace with the owners' own words and real photos.
const photo = (alt, label) => ({ src: null, alt, label })

// About page story blocks (image side alternates)
export const storyBlocks = [
  {
    title: 'A family kitchen',
    body: 'Spice Dine started with a family who missed the food of home. We cook the dishes we grew up eating in Dhaka, the way our parents made them.',
    image: photo('The owners in the Spice Dine kitchen', 'Family photo'),
    placeholder: true,
  },
  {
    title: 'Cooked the slow way',
    body: 'Tehari simmers for hours, kala bhuna is fried down until it turns dark and rich, and haleem is stirred until the lentils and meat become one.',
    image: photo('Beef kala bhuna being stirred in a large pan', 'Kitchen photo'),
    placeholder: true,
  },
  {
    title: 'Spices we trust',
    body: 'We toast and grind our own spice blends in small batches, so every plate tastes the way it should, from mild rezala to fiery chotpoti.',
    image: photo('Bowls of whole spices', 'Spice photo'),
    placeholder: true,
  },
]

// About page "What we care about" cards
export const values = [
  { icon: 'shield', title: 'Halal, always', body: 'Every dish on our menu is halal, from the curries to the snack packs.', placeholder: true },
  { icon: 'flame', title: 'Cooked fresh daily', body: 'Curries, rice and street food are made in our kitchen every day.', placeholder: true },
  { icon: 'book', title: 'Recipes from home', body: 'Family recipes from Dhaka, cooked the way they are at home.', placeholder: true },
]

// About page kitchen gallery
export const kitchenGallery = [
  { caption: 'Morning prep', image: photo('Vegetables being chopped for the day', 'Prep photo'), placeholder: true },
  { caption: 'Parathas on the tawa', image: photo('Parathas cooking on a flat griddle', 'Kitchen photo'), placeholder: true },
  { caption: 'Fuchka, ready to fill', image: photo('Trays of fuchka shells', 'Street food photo'), placeholder: true },
  { caption: 'Borhani, poured cold', image: photo('Borhani being poured into glasses', 'Drinks photo'), placeholder: true },
  { caption: 'Plated and ready to go', image: photo('Dishes plated at the pass', 'Plating photo'), placeholder: true },
]
