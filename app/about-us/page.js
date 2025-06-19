import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen px-8 py-12">
      <p className="font-normal text-black text-[1rem] mb-12 ml-[5vw]">About Us</p>
      <h1 className=" max-w-[600px] text-[#0171ad] text-[3.7rem] mb-25 ml-[5vw]">From Magazine to Interactive 
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
          Join us on this exciting journey as we celebrate the diverse and innovative artistic expressions from different communities! Our Instagram is where you’ll see action as it happens :)</p>
        </div>
      </div>

      {/* The people */}
      <h1 className=" max-w-[600px] text-[#0171ad] text-[3.7rem] mb-25 ml-[5vw]">Meet the Team</h1>

      {/* Learn more about #ff5900 */}
      <div className="flex items-start text-black text-bold">
        <p>More information on:</p>
        <div>
          <p>submitting to the magazine</p>
          <p>joining the team</p>
          <p>participating in interactive exhibitions</p>
        </div>
      </div>

    </div>
    
  );
}
