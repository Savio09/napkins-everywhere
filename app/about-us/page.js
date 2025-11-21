import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen px-8 py-12">
      <p className="font-normal text-black text-[1rem] mb-12 ml-[5vw]">About Us</p>
      <h1 className="max-w-[600px] text-[#0171ad] text-[3.7rem] mb-25 ml-[5vw]">From Magazine to Interactive 
        Art: The Evolution of Napkins</h1>

      <div className="grid gap-[5vw] lg:grid-cols-2 mb-24 ml-[7.5vw] mr-[7.5vw]">
        {/* First row */}
        <div className="w-[40vw]">
          <Image src="/img/About_Us_1.jpg" alt="Drawing of a paper calendar with many deadlines and notes" width={800}
            height={600} priority/>
        </div>
        <div className='text-black flex flex-col justify-center'>
          <p className="text-[1.2rem] font-normal">
          Our story dates back to April of 2022, where four students from Minerva University came together to develop and share the beautiful stories of their classmates all around the world.</p>
        </div>

        {/* Second row */}
        <div className="w-[40vw]">
          <Image src="/img/About_Us_2.jpg" alt="Drawing of the cover of the first Napkins issue" width={800}
            height={600} priority/>
        </div>
        <div className='text-black flex flex-col justify-center'>
          <p className="text-[1.2rem] font-normal mb-4">
          In August 2022, Napkins published its first issue and received overwhelmingly positive feedback, both from students and professionals from outside the Minerva community.</p>
          <p className="text-[1.2rem] font-normal">
          At Napkins Magazine, we proudly publish creative works from the talented individuals associated with Minerva University, including students, staff, and alumni. We publish three times a year, during the Fall, Spring, and Summer seasons. We hibernate in the winter. 🐻</p>
        </div>

        {/* Third row */}
        <div className="w-[40vw]">
          <Image src="/img/About_Us_3.jpg" alt="To power and propel the art of interdisciplinary imagination" width={800}
            height={600} priority/>
        </div>
        <div className='text-black flex flex-col justify-center'>
          <p className="text-[1.2rem] font-normal mb-4">
          With our cornerstone set, we also began to look beyond being a magazine and experimented with interactive art exhibitions to further our mission.</p>
          <p className="text-[1.2rem] font-normal mb-4">
          We realized what is unique about us is that we are a group of young adults from 10+ countries who have the privilege of living in new countries every semester. We carry with us a wealth of perspectives and creative energy that can coalesce into something powerful and beautiful.</p>
          <p className="text-[1.2rem] font-normal">
          Our goal then is to experience the essence of each city and translate that into creative vision and endeavors in collaboration with local organizations and personnel from all walks of creative life.</p>
        </div>

        {/* Fourth row */}
        <div className="w-[40vw]">
          <Image src="/img/About_Us_4.jpg" alt="To power and propel the art of interdisciplinary imagination" width={800}
            height={600} priority/>
        </div>
        <div className='text-black flex flex-col justify-center'>
          <p className="text-[1.2rem] font-normal mb-4">
          So, we talk with people from art galleries and creative spaces in the cities we live in. We talk with artists, educators, professors, and lovers of the arts. We share with them Napkins and our dreams over cups of coffee and sometimes tea. </p>
          <p className="text-[1.2rem] font-normal">
          Our events focus on making arts accessible and enjoyable for all. We are driven by our mission to power and propel interdisciplinary imagination through the arts.</p>
          <p className="text-[1.2rem] font-normal">
          Join us on this exciting journey as we celebrate the diverse and innovative artistic expressions from different communities! Our Instagram is where you'll see action as it happens :)</p>
        </div>
      </div>

      {/* meet the team */}
      <h1 className="max-w-[600px] text-[#0171ad] text-[3.7rem] mb-25 ml-[5vw]">Meet the Team</h1>
      
      {/* The people */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-10 px-[5vw] mb-16">
        {/* Row 1 */}
        <div className="flex flex-col items-center text-center">
          <Image src="/img/ZhiZhi.jpg" alt="Zhi Zhi (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Zhi Zhi (she/her)</p>
          <p className="text-gray-500">Directorette</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Daria.jpeg" alt="Daria (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Daria (she/her)</p>
          <p className="text-gray-500">Editor-in-Chief</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Almira.jpg" alt="Almira (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Almira (she/her)</p>
          <p className="text-gray-500">Literary Editor</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Ari.jpg" alt="Ari (they/them)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Ari (they/them)</p>
          <p className="text-gray-500">Editor-in-Chief</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Emma.jpg" alt="Emma (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Emma (she/her)</p>
          <p className="text-gray-500">Literary Editor</p>
        </div>

        {/* Row 2 */}
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Dasha.jpeg" alt="Dasha (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Dasha (she/her)</p>
          <p className="text-gray-500">Directorette</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Mariam.jpeg" alt="Mariam (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Mariam (she/her)</p>
          <p className="text-gray-500">Art Editor</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Elfriede.jpeg" alt="Elfriede (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Elfriede (she/her)</p>
          <p className="text-gray-500">Literary Editor</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Jaime.jpeg" alt="Jaime (he/him)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Jaime (he/him)</p>
          <p className="text-gray-500">Art Editor</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Miray.jpeg" alt="Miray (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Miray (she/her)</p>
          <p className="text-gray-500">Literary Editor</p>
        </div>

        {/* Row 3 */}
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Fabian.jpeg" alt="Fabian (he/him)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Fabian (he/him)</p>
          <p className="text-gray-500">Literary Editor</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Mara.jpeg" alt="Mara (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Mara (she/her)</p>
          <p className="text-gray-500">Art Editor</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Jan.jpeg" alt="Jan (he/him)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Jan (he/him)</p>
          <p className="text-gray-500">Finance Person</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Echo.jpeg" alt="Echo (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Echo (she/her)</p>
          <p className="text-gray-500">Layout Artist</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Yuya.jpeg" alt="Yuya (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Yuya (she/her)</p>
          <p className="text-gray-500">Web Designer</p>
        </div>

        {/* Row 4 */}
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Paulina.jpeg" alt="Paulina (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Paulina (she/her)</p>
          <p className="text-gray-500">Videographer</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Cassandra.jpeg" alt="Cassandra (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Cassandra (she/her)</p>
          <p className="text-gray-500">Layout Artist</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Raven.jpeg" alt="Raven (they/them)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Raven (they/them)</p>
          <p className="text-gray-500">DEI Consultant</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Maria.jpeg" alt="Maria (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Maria (she/her)</p>
          <p className="text-gray-500">Web Developing Consultant</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Shawn.jpeg" alt="Shawn (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Shawn (she/her)</p>
          <p className="text-gray-500">Event Collaboration & Outreach Manager</p>
        </div>

        {/* Row 5 */}
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Daniya.jpeg" alt="Daniya (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Daniya (she/her)</p>
          <p className="text-gray-500">SMM</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Andrea.jpeg" alt="Andrea (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Andrea (she/her)</p>
          <p className="text-gray-500">Web Developer</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Fortune.jpeg" alt="Fortune (he/him)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Fortune (he/him)</p>
          <p className="text-gray-500">Web Developer</p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Image src="/img/Pia.jpeg" alt="Pia (she/her)" width={250} height={250} className="rounded-lg object-cover"/>
          <p className="mt-4 font-medium text-black">Pia (she/her)</p>
          <p className="text-gray-500">SMM</p>
        </div>

      </div>
    </div>
  );
}