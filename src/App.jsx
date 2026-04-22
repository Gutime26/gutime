import { createBrowserRouter, RouterProvider, Outlet, ScrollRestoration } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import CookieBanner from './components/CookieBanner'
import Hero from './components/Hero'
import Strip from './components/Strip'
import About from './components/About'
import Values from './components/Values'
import Products from './components/Products'
import Promise from './components/Promise'
import Territory from './components/Territory'
import ChiSiamo from './pages/ChiSiamo'
import Prodotti from './pages/Prodotti'
import Contatti from './pages/Contatti'
import QualitaSostenibilita from './pages/QualitaSostenibilita'
import Certificazioni from './pages/Certificazioni'
import ImpegnoAmbientale from './pages/ImpegnoAmbientale'
import LeAziende from './pages/LeAziende'
import ProduzionePrimaria from './pages/ProduzionePrimaria'
import TrasformazioneCommercializzazione from './pages/TrasformazioneCommercializzazione'
import RicercaInnovazione from './pages/RicercaInnovazione'
import CookiePolicy from './pages/CookiePolicy'

function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Nav />
      <Outlet />
      <Footer />
      <CookieBanner />
    </>
  )
}

function Home() {
  return (
    <>
      <Hero />
      <Strip />
      <About />
      <Values />
      <Products />
      <Promise />
      <Territory />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'chi-siamo', element: <ChiSiamo /> },
      { path: 'prodotti', element: <Prodotti /> },
      { path: 'contatti', element: <Contatti /> },
      { path: 'qualita-sostenibilita', element: <QualitaSostenibilita /> },
      { path: 'qualita-sostenibilita/certificazioni', element: <Certificazioni /> },
      { path: 'qualita-sostenibilita/impegno-ambientale', element: <ImpegnoAmbientale /> },
      { path: 'le-aziende', element: <LeAziende /> },
      { path: 'le-aziende/produzione-primaria', element: <ProduzionePrimaria /> },
      { path: 'le-aziende/trasformazione-commercializzazione', element: <TrasformazioneCommercializzazione /> },
      { path: 'le-aziende/ricerca-innovazione', element: <RicercaInnovazione /> },
      { path: 'cookie-policy', element: <CookiePolicy /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
