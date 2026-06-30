import { Providers } from '@/components/providers';
import Header from '@/components/header';
import Hero from '@/components/hero';
import Certifications from '@/components/certifications';
import TrustedBrands from '@/components/trusted-brands';
import About from '@/components/about';
import HowItWorks from '@/components/how-it-works';
import Features from '@/components/features';
import Gallery from '@/components/gallery';
import Testimonials from '@/components/testimonails';
import FAQ from '@/components/faq';
import CallToAction from '@/components/call-to-action';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import WhatsAppButton from '@/components/whatsapp-button';

export default function Page() {
	return (
		<Providers>
			<div className="min-h-screen">
				<Header />
				<Hero />
				<Certifications />
				<TrustedBrands />
				<About />
				<HowItWorks />
				<Features />
				<Gallery />
				<Testimonials />
				<FAQ />
				<CallToAction />
				<Contact />
				<Footer />
				<WhatsAppButton />
			</div>
		</Providers>
	);
}
