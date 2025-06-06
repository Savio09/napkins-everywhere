import Image from 'next/image';

export default function About() {
  return (
    <div className="bg-[#FFFFFF] min-h-screen px-8 py-12">
      <p className="font-normal text-black text-[1rem] mb-12 ml-[10vw]">About Us</p>
      <h1 className=" max-w-[600px] text-[#0171ad] text-[3.7rem] mb-25 ml-[10vw]">From Magazine to Interactive 
        Art: The Evolution of Napkins</h1>

      <div className="grid gap-10 lg:grid-cols-2 items-center mb-24 ml-[10vw] mr-[10vw]">
        {/* First row */}
        <div className="w-full lg:w-[40vw] relative aspect-[4/5]">
          <Image
            src="/img/About_Us_1.jpg"
            alt="drawing of a paper calendar with many deadlines and notes"
            fill
            style={{ objectFit: "contain" }}
            className="rounded-lg"
          />
        </div>

        {/* TEXT block */}
        <div className="text-black">
          <p className="text-[1.2rem] font-normal">
            Our story dates back to April of 2022, where four students from Minerva University came together...
          </p>
        </div>
      </div>



      <p className="font-bold text-[1.2rem] mb-15 max-w-[600px]">
      In August 2022, Napkins published its first issue and received overwhelmingly positive 
      feedback, both from students and professionals from outside the Minerva community.</p>
      
      <p className="font-bold text-[1.2rem] mb-15 max-w-[600px]">
      At Napkins Magazine, we proudly publish creative works from the talented individuals 
      associated with Minerva University, including students, staff, and alumni. We publish 
      three times a year, during the Fall, Spring, and Summer seasons. We hibernate in the winter. 🐻</p>

      <p className="font-bold text-[1.2rem] mb-15 max-w-[600px]">
      With our cornerstone set, we also began to look beyond being a magazine and experimented 
      with interactive art exhibitions to further our mission.
      
      We realized what is unique about us is that we are a group of young adults from 10+ countries who
      have the privilege of living in new countries every semester. We carry with us a wealth of 
      perspectives and creative energy that can coalesce into something powerful and beautiful. 🐻</p>
      
      <p className="font-bold text-[1.2rem] mb-15 max-w-[600px]">So, we talk with people from art galleries 
        and creative spaces in the cities we live in. We talk with artists, educators, professors, and 
        lovers of the arts. We share with them Napkins and our dreams over cups of coffee and sometimes tea.
        
        Our events focus on making arts accessible and enjoyable for all. We are driven by our mission to power 
        and propel interdisciplinary imagination through the arts.
        
        Join us on this exciting journey as we celebrate the diverse and innovative artistic expressions 
        from different communities! Our Instagram is where you’ll see action as it happens :)</p>
    
    </div>
    
  );
}
