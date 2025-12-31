import { useRoute } from "wouter";
import { useEvent } from "@/hooks/use-events";
import { Link } from "wouter";
import { ArrowLeft, Calendar, MapPin, Tag, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function EventDetails() {
  const [match, params] = useRoute("/events/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: event, isLoading, error } = useEvent(id);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-primary animate-spin" />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen pt-20 flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-primary">Event not found</h2>
        <Link href="/events" className="text-secondary hover:underline">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/events" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Portfolio
        </Link>
      </div>

      {/* Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src={event.imageUrl} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full border-2 border-secondary rounded-2xl -z-10 hidden md:block" />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-secondary/20 text-primary-dark text-xs font-bold tracking-wider uppercase rounded-full mb-4">
                {event.category}
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-primary leading-tight mb-4">
                {event.title}
              </h1>
            </div>

            <div className="flex flex-col space-y-4 mb-8 text-sm md:text-base text-muted-foreground">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-secondary" />
                <span>{format(new Date(event.date), "EEEE, MMMM do, yyyy")}</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-secondary" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Tag className="w-5 h-5 text-secondary" />
                <span>{event.category}</span>
              </div>
            </div>

            <div className="prose prose-lg text-muted-foreground">
              <p className="whitespace-pre-wrap leading-relaxed">
                {event.description}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-display text-2xl font-bold text-primary mb-4">Interested in a similar event?</h3>
              <Link 
                href="/contact" 
                className="inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Book a Consultation
              </Link>
            </div>
          </motion.div>

        </div>
      </article>
    </div>
  );
}
