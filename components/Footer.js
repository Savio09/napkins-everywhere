import Link from "next/link";

export default function Footer() {
  return (
    <div className="footer flex flex-col lg:flex-row px-5 pt-5 sm:w-[95vw] sm:flex-col mx-auto justify-between h-[20vh]">
      <div className="cta-links">
        <ul className="flex gap-3 sm:gap-5 font-bold uppercase mb-8 text-[10px] sm:text-[1rem]">
          <li>
            <Link href="#" className="">
              submit to the magazine
            </Link>
          </li>
          <li>
            <Link href="#">join the team</Link>
          </li>
          <li>
            <Link href="#">participate in events</Link>
          </li>
        </ul>
        <p className="text-gray-600 font-bold">
          website curated by Htet Yuya and maintained by Zhi Zhi Chia and Daria
          Bassot
        </p>
      </div>
      <div className="email">
        <Link href="mailto:napkins@gmail.com">napkins@gmail.com</Link>
      </div>
    </div>
  );
}
