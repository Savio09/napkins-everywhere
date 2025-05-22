import Link from "next/link";

export default function ImageOverlay({
  isLatestIssueBgLoaded,
  coverImageUrl,
  latestIssueLink,
  latestIssueTitle,
  sectionTitle,
  linkText,
  children,
}) {
  return (
    <section
      className={`
          dy-latest-issue h-[90vh] bg-cover bg-center bg-no-repeat 
          relative flex  justify-center
          transition-opacity duration-1000 ease-in-out
          before:content-[''] before:absolute before:inset-0 before:bg-black before:z-0
          before:transition-opacity before:duration-700 before:ease-in-out
          ${
            isLatestIssueBgLoaded
              ? "opacity-100 before:opacity-90"
              : "opacity-0 before:opacity-0"
          }
        `}
      style={{
        backgroundImage:
          isLatestIssueBgLoaded && coverImageUrl
            ? `url('${coverImageUrl}')`
            : "none",
      }}
    >
      <div
        className={`
            issue-text w-[85vw] mx-auto mt-[200px] text-white 
            relative z-10 p-6 rounded-lg
            transition-opacity duration-1000 ease-in-out delay-300
            ${isLatestIssueBgLoaded ? "opacity-100" : "opacity-0"}
          `}
      >
        <h3 className="text-xl md:text-2xl font-semibold mb-2">
          {sectionTitle}
        </h3>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {latestIssueTitle || "Loading..."}
        </h1>
        <div className="cta">
          <Link
            href={latestIssueLink}
            className={
              linkText
                ? "bg-[#FF5900] text-white py-3 px-6 rounded-full text-lg font-semibold transition-colors duration-300 inline-block lowercase"
                : "mb-12"
            }
          >
            {linkText ? (
              `${linkText} →`
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
                style={{
                  marginBlock: "10px",
                }}
              >
                <path d="M360-200v-80h264L160-744l56-56 464 464v-264h80v400H360Z" />
              </svg>
            )}
            {children}
          </Link>
        </div>
      </div>
    </section>
  );
}
