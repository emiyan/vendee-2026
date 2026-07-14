import heroImage from "../../assets/images/hero-vendee.webp";

export default function Hero() {
  return (
    <section className="relative overflow-hidden rounded-[32px] shadow-sm">
      {/* Image */}
      <img
        src={heroImage}
        alt="Plage de Vendée"
        className="h-[300px] w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/45 to-sky-900/10" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Contenu */}
      <div className="absolute inset-0 flex items-end">
        <div className="w-full p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
            Guide Vacances
          </p>

          <h1 className="mt-2 text-5xl font-bold leading-none text-white">
            Vendée 2026
          </h1>

          <p className="mt-5 max-w-[260px] text-[17px] leading-7 text-white/90">
            Explorez les plus beaux lieux autour de votre location.
          </p>
        </div>
      </div>
    </section>
  );
}