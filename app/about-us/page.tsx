import Image from "next/image";

export default function About() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen px-8 py-12">
      <p className="font-normal text-black text-[1rem] mb-12 ml-[5vw]">About Us</p>
      <h1 className="max-w-[600px] text-[#0171ad] text-[3.7rem] mb-25 ml-[5vw]">
        From Magazine to Interactive Art: The Evolution of Napkins
      </h1>

      <div className="grid gap-[5vw] lg:grid-cols-2 mb-24 ml-[7.5vw] mr-[7.5vw]">
        <div className="w-[40vw]">
          <Image
            src="/img/About_Us_1.jpg"
            alt="Drawing of a paper calendar with many deadlines and notes"
            width={800}
            height={600}
            priority
          />
        </div>
        <div className="text-black flex flex-col justify-center">
          <p className="text-[1.2rem] font-normal">
            Our story dates back to April of 2022, where four students from Minerva University came
            together to develop and share the beautiful stories of their classmates all around the
            world.
          </p>
        </div>

        <div className="w-[40vw]">
          <Image
            src="/img/About_Us_2.jpg"
            alt="Drawing of the cover of the first Napkins issue"
            width={800}
            height={600}
            priority
          />
        </div>
        <div className="text-black flex flex-col justify-center">
          <p className="text-[1.2rem] font-normal mb-4">
            In August 2022, Napkins published its first issue and received overwhelmingly positive
            feedback, both from students and professionals from outside the Minerva community.
          </p>
          <p className="text-[1.2rem] font-normal">
            At Napkins Magazine, we proudly publish creative works from the talented individuals
            associated with Minerva University, including students, staff, and alumni. We publish
            three times a year, during the Fall, Spring, and Summer seasons. We hibernate in the
            winter. 🐻
          </p>
        </div>

        <div className="w-[40vw]">
          <Image
            src="/img/About_Us_3.jpg"
            alt="To power and propel the art of interdisciplinary imagination"
            width={800}
            height={600}
            priority
          />
        </div>
        <div className="text-black flex flex-col justify-center">
          <p className="text-[1.2rem] font-normal mb-4">
            With our cornerstone set, we also began to look beyond being a magazine and experimented
            with interactive art exhibitions to further our mission.
          </p>
          <p className="text-[1.2rem] font-normal mb-4">
            We realized what is unique about us is that we are a group of young adults from 10+
            countries who have the privilege of living in new countries every semester. We carry with
            us a wealth of perspectives and creative energy that can coalesce into something powerful
            and beautiful.
          </p>
          <p className="text-[1.2rem] font-normal">
            Our goal then is to experience the essence of each city and translate that into creative
            vision and endeavors in collaboration with local organizations and personnel from all
            walks of creative life.
          </p>
        </div>

        <div className="w-[40vw]">
          <Image
            src="/img/About_Us_4.jpg"
            alt="To power and propel the art of interdisciplinary imagination"
            width={800}
            height={600}
            priority
          />
        </div>
        <div className="text-black flex flex-col justify-center">
          <p className="text-[1.2rem] font-normal mb-4">
            So, we talk with people from art galleries and creative spaces in the cities we live in.
            We talk with artists, educators, professors, and lovers of the arts. We share with them
            Napkins and our dreams over cups of coffee and sometimes tea.
          </p>
          <p className="text-[1.2rem] font-normal">
            Our events focus on making arts accessible and enjoyable for all. We are driven by our
            mission to power and propel interdisciplinary imagination through the arts.
          </p>
          <p className="text-[1.2rem] font-normal">
            Join us on this exciting journey as we celebrate the diverse and innovative artistic
            expressions from different communities! Our Instagram is where you&apos;ll see action as
            it happens :)
          </p>
        </div>
      </div>

      <h1 className="max-w-[600px] text-[#0171ad] text-[3.7rem] mb-25 ml-[5vw]">Meet the Team</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 px-[5vw] mb-16">
        {[
          { src: "/img/ZhiZhi.jpg", name: "Zhi Zhi (she/her)", role: "Directorette" },
          { src: "/img/Daria.jpeg", name: "Daria (she/her)", role: "Editor-in-Chief" },
          { src: "/img/Almira.jpg", name: "Almira (she/her)", role: "Literary Editor" },
          { src: "/img/Ari.jpg", name: "Ari (they/them)", role: "Editor-in-Chief" },
          { src: "/img/Emma.jpg", name: "Emma (she/her)", role: "Literary Editor" },
          { src: "/img/Dasha.jpeg", name: "Dasha (she/her)", role: "Directorette" },
          { src: "/img/Mariam.jpeg", name: "Mariam (she/her)", role: "Art Editor" },
          { src: "/img/Elfriede.jpeg", name: "Elfriede (she/her)", role: "Literary Editor" },
          { src: "/img/Jaime.jpeg", name: "Jaime (he/him)", role: "Art Editor" },
          { src: "/img/Miray.jpeg", name: "Miray (she/her)", role: "Literary Editor" },
          { src: "/img/Fabian.jpeg", name: "Fabian (he/him)", role: "Literary Editor" },
          { src: "/img/Mara.jpeg", name: "Mara (she/her)", role: "Art Editor" },
          { src: "/img/Jan.jpeg", name: "Jan (he/him)", role: "Finance Person" },
          { src: "/img/Echo.jpeg", name: "Echo (she/her)", role: "Layout Artist" },
          { src: "/img/Yuya.jpeg", name: "Yuya (she/her)", role: "Web Designer" },
          { src: "/img/Paulina.jpeg", name: "Paulina (she/her)", role: "Videographer" },
          { src: "/img/Cassandra.jpeg", name: "Cassandra (she/her)", role: "Layout Artist" },
          { src: "/img/Raven.jpeg", name: "Raven (they/them)", role: "DEI Consultant" },
          { src: "/img/Maria.jpeg", name: "Maria (she/her)", role: "Web Developing Consultant" },
          {
            src: "/img/Shawn.jpeg",
            name: "Shawn (she/her)",
            role: "Event Collaboration & Outreach Manager",
          },
          { src: "/img/Daniya.jpeg", name: "Daniya (she/her)", role: "SMM" },
          { src: "/img/Andrea.jpeg", name: "Andrea (she/her)", role: "Web Developer" },
          { src: "/img/Fortune.jpeg", name: "Fortune (he/him)", role: "Web Developer" },
          { src: "/img/Pia.jpeg", name: "Pia (she/her)", role: "SMM" },
        ].map((member) => (
          <div key={member.name} className="flex flex-col items-center text-center">
            <Image
              src={member.src}
              alt={member.name}
              width={250}
              height={250}
              className="rounded-lg object-cover"
            />
            <p className="mt-4 font-medium text-black">{member.name}</p>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
