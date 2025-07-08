"use client";
import HeroText from "@/components/HeroText";
import { useStrapiData } from "@/hooks/useStrapiData";
import { useMagazineData } from "@/components/context/magazineContext";
import { createLocalImageURL } from "@/utils/urlConstruct";
import Image from "next/image";
import Link from "next/link";
import CardIssues from "@/utils/CardIssues";
import { useState } from "react";
import Paginate from "@/components/Paginate";
export default function Magazine() {
  const { latestIssue, magazinesError } = useMagazineData();

  const {
    data: posts,
    error,
    fetchData,
  } = useStrapiData("/api/magazines?populate=cover_img&fields=*", true);

  console.log(posts);

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const lastIdx = currentPage * postPerPage;
  const firstIdx = lastIdx - postPerPage;
  let currentPost;

  if (posts && posts.data && latestIssue) {
    // Filter out the latest issue from the pagination
    const pastIssues = posts.data.filter(
      (magazine) => magazine.id !== latestIssue.id
    );
    currentPost = pastIssues.slice(firstIdx, lastIdx);
  } else if (posts && posts.data) {
    currentPost = posts.data.slice(firstIdx, lastIdx);
  }

  console.log(currentPost);

  const nextPage = (pageNumber) => {
    console.log("nextPage called with:", pageNumber, typeof pageNumber);
    if (typeof pageNumber === "number") {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setIsTransitioning(false);
      }, 300);
    } else {
      console.error("nextPage received non-number:", pageNumber);
    }
  };

  const prevpage = (pageNumber) => {
    console.log("prevpage called with:", pageNumber, typeof pageNumber);
    if (typeof pageNumber === "number") {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentPage(pageNumber);
        setIsTransitioning(false);
      }, 300);
    } else {
      console.error("prevpage received non-number:", pageNumber);
    }
  };

  if (magazinesError) {
    console.error("Could not load the magazine information.");
  }

  const img_url = createLocalImageURL(latestIssue?.cover_img[0]?.url);
  const latest_link_url = `http://localhost:3000/magazines/${latestIssue?.slug}`;
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
      <div className="past-issues w-[85vw] mx-auto flex flex-col md:flex-row md:justify-between mt-30 gap-10">
        <h1 className="text-4xl md:text-[8rem] text-[#0070ae] leading-tight">
          Past Issues
        </h1>
        <div>
          {posts && (
            <>
              <div
                className={`grid-section grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 transition-all duration-500 ${
                  isTransitioning
                    ? "opacity-0 transform translate-y-8 scale-95"
                    : "opacity-100 transform translate-y-0 scale-100"
                }`}
              >
                {posts &&
                  currentPost.map((magazine, index) => (
                    <div
                      key={magazine.id}
                      className={`magazine-item transition-all duration-700 ${
                        isTransitioning
                          ? "opacity-0 transform translate-y-12"
                          : "opacity-100 transform translate-y-0"
                      }`}
                      style={{
                        transitionDelay: isTransitioning
                          ? "0ms"
                          : `${index * 150}ms`,
                      }}
                    >
                      <CardIssues
                        src={createLocalImageURL(magazine.cover_img[0].url)}
                        alt={magazine.issue_title}
                        slug={magazine.slug}
                        issueTitle={magazine.issue_title}
                        issueNumber={magazine.issue_number}
                        pdfLink={magazine.pdf_link}
                        epubLink={magazine.epub_link}
                      />
                    </div>
                  ))}
              </div>
              {/**
               * Create a little pagination button, which does not necessarily reload the page.
               */}
              <Paginate
                totalPosts={
                  posts && latestIssue
                    ? posts.data.filter(
                        (magazine) => magazine.id !== latestIssue.id
                      ).length
                    : posts?.data?.length || 0
                }
                postPerPage={postPerPage}
                currentPage={currentPage}
                nextpage={nextPage}
                prevpage={prevpage}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
