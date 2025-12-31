import { Link } from "wouter";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";
import type { Event } from "@shared/schema";

export function EventCard({ event }: { event: Event }) {
  return (
    <Link 
      href={`/events/${event.id}`}
      className="group block relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        {/* Descriptive alt text used for accessibility */}
        <img 
          src={event.imageUrl} 
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
        
        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur text-primary text-xs font-bold tracking-wider uppercase rounded-full shadow-sm">
            {event.category}
          </span>
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
          <div className="text-secondary text-sm font-medium mb-2 tracking-wider">
            {format(new Date(event.date), "MMMM d, yyyy")}
          </div>
          <h3 className="font-display text-2xl font-bold leading-tight mb-2 group-hover:text-secondary transition-colors">
            {event.title}
          </h3>
          <div className="flex items-center text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 transform translate-y-2 group-hover:translate-y-0">
            View Details <ArrowUpRight className="ml-2 w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
