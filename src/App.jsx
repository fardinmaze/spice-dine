import Header from './components/sections/Header'
import Hero from './components/sections/Hero'
import FeaturedMenu from './components/sections/FeaturedMenu'
import OurStory from './components/sections/OurStory'
import Gallery from './components/sections/Gallery'
import Reviews from './components/sections/Reviews'
import Location from './components/sections/Location'
import Contact from './components/sections/Contact'
import Footer from './components/sections/Footer'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeaturedMenu />
        <OurStory />
        <Gallery />
        <Reviews />
        <Location />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
