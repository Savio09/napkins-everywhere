"use client";
import HeroText from "@/components/HeroText";
import { useStrapiData } from "@/hooks/useStrapiData";
import { useMagazineData } from "@/components/context/magazineContext";
export default function Magazine() {
  const { latestIssue, allMagazines, magazinesError } = useMagazineData();
  console.log(latestIssue);
  return (
    <div>
      <section className="mg-header w-[85vw] mx-auto">
        <div className="header-text">
          <HeroText text="Magazine" textColor="#0070ae" />
        </div>
      </section>
      <section className="showcase-nw-mg">
        <div className="item-1">
          <p>Psst!</p>
          <p>Our newest issue is out now!</p>
        </div>
        <div className="item-2"></div>
        <div className="item-3">more issues down below</div>
      </section>
    </div>
  );
}
