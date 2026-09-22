import { useState } from "react";
import { HiBars3, HiOutlineShoppingBag } from "react-icons/hi2";
import { navigationItems } from "../data/landingPageData";

export function LuxuryHeader({ onFindGift }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#3d261d]/10 bg-[#fffaf1]/95 backdrop-blur">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#top" className="group flex items-center gap-3" aria-label="Mahika home">
          <span className="grid size-10 place-items-center rounded-full border border-[#b98332]/60 bg-[#21182b] font-serif text-xl text-[#f7ce75] shadow-sm transition group-hover:rotate-12">✦</span>
          <span className="leading-none">
            <span className="block font-serif text-2xl font-bold tracking-tight text-[#2b1b19]">Mahika</span>
            <span className="mt-1 block text-[8px] font-bold uppercase tracking-[0.24em] text-[#9a6630]">Gifts with a little magic</span>
          </span>
        </a>
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {navigationItems.map((item) => <a key={item.label} href={item.href} className="text-sm font-semibold text-[#563b2d] transition hover:text-[#b76428]">{item.label}</a>)}
        </nav>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onFindGift} className="hidden rounded-full bg-[#e6ad3f] px-5 py-2.5 text-xs font-extrabold text-[#2b1b19] transition hover:bg-[#f5c85d] sm:block">Find a gift</button>
          <button type="button" className="grid size-10 place-items-center rounded-full border border-[#3d261d]/15 text-xl" aria-label="Shopping bag"><HiOutlineShoppingBag /></button>
          <button type="button" className="grid size-10 place-items-center rounded-full border border-[#3d261d]/15 text-xl lg:hidden" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(!open)}><HiBars3 /></button>
        </div>
      </div>
      {open && <nav className="border-t border-[#3d261d]/10 bg-[#fffaf1] px-5 py-5 lg:hidden" aria-label="Mobile navigation">{navigationItems.map((item) => <a key={item.label} href={item.href} onClick={() => setOpen(false)} className="block border-b border-[#3d261d]/10 py-3 text-sm font-semibold text-[#3d261d]">{item.label}</a>)}</nav>}
    </header>
  );
}
