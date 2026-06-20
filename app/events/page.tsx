"use client";
import HeroText from "@/components/HeroText";
import Image from "next/image";
import Link from "next/link";
import { useEvents } from "@/hooks/useStrapi";
import { createLocalImageURL } from "@/utils/urlConstruct";

const MONTH_INDEX: Record<string, number> = {
  january: 0, february: 1, march: 2, april: 3, may: 4, june: 5,
  july: 6, august: 7, september: 8, october: 9, november: 10, december: 11,
};

function parseEventDate(dateString: string | null | undefined): Date {
  if (!dateString) return new Date(0);
  const parts = dateString.toLowerCase().split(" ");
  const month = MONTH_INDEX[parts[0]] ?? 0;
  const year = parseInt(parts[1] ?? "2000") || 2000;
  return new Date(year, month);
}

export default function EventsPage() {
  const { data: eventsData, error: eventsError } = useEvents();

  const events = (eventsData?.data ?? []).sort(
    (a, b) => parseEventDate(a.date).getTime() - parseEventDate(b.date).getTime(),
  );

  if (eventsError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Error loading events</h1>
          <p className="text-gray-600">Please try again later.</p>
          <p className="text-sm text-gray-500 mt-2">Make sure Strapi is running on port 1337</p>
        </div>
      </div>
    );
  }

  if (!eventsData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#0070ae]"></div>
      </div>
    );
  }

  return (
    <div>
      <section className="mg-header w-[85vw] mx-auto">
        <div className="header-text">
          <HeroText text="Events" textColor="#0070ae" />
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 my-8">
          {events.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-gray-600 text-lg">No events available yet.</p>
            </div>
          ) : (
            events.map((event) => {
              const imageUrl = event.featured_image
                ? createLocalImageURL(event.featured_image.url)
                : "/img/events/fractal.jpg";

              return (
                <Link key={event.id} href={`/events/${event.slug}`} className="group block">
                  <div className="flex flex-col h-full">
                    <div className="relative overflow-hidden mb-6">
                      <Image
                        src={imageUrl}
                        alt={event.title}
                        width={800}
                        height={533}
                        className="w-full aspect-[3/2] object-cover"
                      />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="text-2xl font-bold mb-4 text-black">{event.title}</h2>
                      <p className="text-gray-700 mb-2">{event.location}</p>
                      <p className="text-gray-700">{event.date}</p>
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </section>
      </section>
    </div>
  );
}
