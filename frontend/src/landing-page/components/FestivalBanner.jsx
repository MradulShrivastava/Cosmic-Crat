import { festivalCampaign } from "../data/landingPageData";
import { FaArrowRight } from "react-icons/fa6";

export function FestivalBanner() {
  return <a href="#hampers" className="flex min-h-10 items-center justify-between bg-[#351b18] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white sm:px-8 sm:text-xs"><span className="hidden items-center gap-2 sm:flex"><span className="text-[#e9a832]">✦</span>{festivalCampaign.label}</span><span className="text-center">{festivalCampaign.message}</span><span className="hidden items-center gap-2 text-sm font-extrabold normal-case tracking-normal text-white sm:inline-flex">{festivalCampaign.action}<FaArrowRight className="text-base text-white" aria-hidden="true" /></span></a>;
}
