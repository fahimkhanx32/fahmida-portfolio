
import { ArrowRight, CalendarDays, PawPrint, ShieldCheck, Heart, Plus, Stethoscope } from 'lucide-react'
import { profile } from '../data/profile'
import { internship } from '../data/internship'

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative isolate min-h-[650px] overflow-hidden bg-[#09271b] bg-cover bg-center bg-no-repeat sm:min-h-[700px] lg:min-h-[720px]"
      style={{
  backgroundImage: "url('https://res.cloudinary.com/fhsrf5ps/image/upload/v1794340882/drfahmidawithpets.webp')",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
}}
    >
      <div className="relative mx-auto flex min-h-[650px] max-w-6xl items-center px-5 pb-20 pt-32 sm:min-h-[700px] sm:px-8 lg:min-h-[720px] lg:pt-44">

        {/* Left content */}
        <div className="relative z-10 w-full max-w-xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#c7d9b0]/60 px-4 py-1.5 text-sm text-[#d3e1c3]">
            <PawPrint size={17} />
            Trusted Pet Care
          </div>

          <h1
            id="hero-title"
            className="font-serif text-5xl leading-[1.08] tracking-tight text-[#f8f5ed] sm:text-6xl lg:text-[58px]"
          >
            Loving Care for
            <br />
            Your <span className="italic text-[#c5d9ad]">Beloved</span> Pets
          </h1>

          <p className="mt-7 max-w-[440px] text-base leading-relaxed text-[#d0d5c9] sm:text-lg">
            Routine check-ups, vaccinations, dental care, surgery,
            urgent vet support, puppy and kitten care, & senior
            pet wellness – all under one roof in Mohammadpur.
          </p>

          {/* CTA buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={profile.contact.appointmentUrl || '#contact'}
              className="inline-flex items-center gap-2 rounded-full bg-[#c5d9ad] px-6 py-3 text-sm font-semibold text-[#10291c] transition hover:bg-[#d8e7c8]"
            >
              <CalendarDays size={17} />
              Book an Appointment
              <ArrowRight size={16} />
            </a>

            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-full border border-[#c5d9ad]/70 px-6 py-3 text-sm text-[#e1e8d8] transition hover:bg-[#c5d9ad] hover:text-[#10291c]"
            >
              <Stethoscope size={17} />
              Explore Services
              <ArrowRight size={16} />
            </a>
          </div>

          {/* Statistics */}
          <div className="mt-10 grid max-w-[450px] grid-cols-4 divide-x divide-[#b5c9aa]/40">

            <div className="flex flex-col items-center px-2 text-center text-[#c5d9ad]">
              <PawPrint size={22} />
              <strong className="mt-2 text-lg text-white">50K+</strong>
              <span className="text-[10px] text-[#d0d5c9] sm:text-xs">
                Happy Pets
              </span>
            </div>

            <div className="flex flex-col items-center px-2 text-center text-[#c5d9ad]">
              <Plus size={22} strokeWidth={3} />
              <strong className="mt-2 text-lg text-white">15+</strong>
              <span className="text-[10px] text-[#d0d5c9] sm:text-xs">
                Vet Experts
              </span>
            </div>

            <div className="flex flex-col items-center px-2 text-center text-[#c5d9ad]">
              <ShieldCheck size={22} />
              <strong className="mt-2 text-lg text-white">24/7</strong>
              <span className="text-[10px] text-[#d0d5c9] sm:text-xs">
                Vet Emergency
              </span>
            </div>

            <div className="flex flex-col items-center px-2 text-center text-[#c5d9ad]">
              <Heart size={22} />
              <strong className="mt-2 text-lg text-white">98%</strong>
              <span className="text-[10px] text-[#d0d5c9] sm:text-xs">
                Happy Owners
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
