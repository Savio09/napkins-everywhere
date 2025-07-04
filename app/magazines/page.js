"use client";
import HeroText from "@/components/HeroText";
import { useStrapiData } from "@/hooks/useStrapiData";
import { useMagazineData } from "@/components/context/magazineContext";
import { createLocalImageURL } from "@/utils/urlConstruct";
import Image from "next/image";
import Link from "next/link";
import CardIssues from "@/utils/CardIssues";
export default function Magazine() {
  const { latestIssue, magazinesError } = useMagazineData();

  const { data, error, fetchData } = useStrapiData(
    "/api/magazines?populate=cover_img"
  );

  console.log(data);

  if (magazinesError) {
    console.error("Could not load the magazine information.");
  }

  const img_url = createLocalImageURL(latestIssue?.cover_img[0]?.url);
  const latest_link_url = `http://localhost/magazines/${latestIssue?.slug}`;
  return (
    <div>
      <section className="mg-header w-[85vw] mx-auto">
        <div className="header-text">
          <HeroText text="Magazine" textColor="#0070ae" />
        </div>
      </section>
      <section className="showcase-nw-mg w-[85vw] mx-auto flex-col md:flex md:flex-row">
        <div className="item-1">
          <p>Psst!</p>
          <p>Our newest issue is out now!</p>
        </div>
        <div className="item-2">
          <Link href={latest_link_url}>
            <Image
              src={img_url}
              width={1000}
              height={1000}
              alt="a wallpaper with some cartoons on it"
            />
          </Link>
        </div>
        <div className="item-3">more issues down below</div>
      </section>
      <div className="past-issues w-[85vw] mx-auto flex justify-between mt-10">
        <h1>Past Issues</h1>
        <div className="grid-section grid grid-cols-2 gap-20">
          {data &&
            data.data.map((magazine) => (
              <CardIssues
                key={magazine.id}
                src={createLocalImageURL(magazine.cover_img[0].url)}
                alt={magazine.issue_title}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
