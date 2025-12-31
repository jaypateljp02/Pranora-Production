import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/EventCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function Events() {
  const { data: events, isLoading, error, isError } = useEvents();
  const [filter, setFilter] = useState("All");

  const categories = ["All", ...new Set(events?.map(e => e.category) || [])];

  const filteredEvents = filter === "All"
    ? events
    : events?.filter(e => e.category === filter);

  if (isError) {
    return (
      <div className="min-h-screen pt-40 px-4 text-center">
        <div className="text-red-500 text-xl font-bold mb-4">Error loading events</div>
        <p className="text-muted-foreground">{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className="bg-primary py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Our Portfolio
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70 max-w-2xl mx-auto"
          >
            A curated selection of our finest work, showcasing memorable moments from weddings, corporate galas, and social celebrations.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${filter === category
                  ? "bg-primary text-white shadow-lg scale-105"
                  : "bg-white text-primary border border-primary/20 hover:bg-primary/5"
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-24">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredEvents?.map((event) => (
              <motion.div
                key={event.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <EventCard event={event} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!isLoading && filteredEvents?.length === 0 && (
          <div className="text-center py-24">
            <p className="text-xl text-muted-foreground">No events found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
