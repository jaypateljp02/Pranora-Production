import { useTeam } from "@/hooks/use-team";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export default function About() {
  const { data: team, isLoading } = useTeam();

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="bg-primary py-24 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
          >
            We Are Storytellers
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/80 leading-relaxed font-light"
          >
            Behind every successful event is a team of passionate creators, dedicated to turning your dreams into reality.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-secondary font-bold tracking-widest uppercase text-sm mb-2 block">Our Philosophy</span>
            <h2 className="font-display text-4xl font-bold text-primary mb-6">Perfection is in the Details</h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                Founded in 2015, Pranora Production began with a singular mission: to bring a fresh, artistic perspective to event planning in India. We believe that an event is more than just a gathering—it's an experience that evokes emotion and creates lasting memories.
              </p>
              <p>
                We approach every project with a bespoke mindset. No two events are alike because no two clients are alike. We take the time to understand your unique story, style, and vision, weaving these elements into every aspect of the design.
              </p>
            </div>
          </div>
          <div className="relative">
            {/* Event details image */}
            <img
              src="https://images.pexels.com/photos/50675/banquet-wedding-society-deco-50675.jpeg?auto=compress&cs=tinysrgb&w=1600"
              alt="Event details"
              className="rounded-2xl shadow-2xl"
            />
            <div className="absolute -z-10 top-8 left-8 w-full h-full bg-muted rounded-2xl" />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-primary">Meet The Team</h2>
            <div className="h-1 w-20 bg-secondary mx-auto mt-4 rounded-full" />
          </div>

          {isLoading ? (
            <div className="flex justify-center">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {team?.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-display text-2xl font-bold text-primary">{member.name}</h3>
                    <p className="text-secondary font-medium text-sm tracking-wider uppercase mb-4">{member.role}</p>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
