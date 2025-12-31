import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Star, Calendar, Users, Award } from "lucide-react";
import { useEvents } from "@/hooks/use-events";
import { EventCard } from "@/components/EventCard";

const FEATURES = [
  {
    icon: Star,
    title: "Exquisite Design",
    description: "Every detail is meticulously curated to create a visually stunning atmosphere that reflects your unique vision."
  },
  {
    icon: Calendar,
    title: "Flawless Execution",
    description: "Our experienced team ensures a seamless timeline so you can be a guest at your own event."
  },
  {
    icon: Users,
    title: "World-Class Service",
    description: "From the first consultation to the final toast, we provide white-glove service tailored to your needs."
  }
];

export default function Home() {
  const { data: events, isLoading } = useEvents();

  // Show only 3 featured events
  const featuredEvents = events?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          {/* Hero background */}
          <img 
            src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Elegant event setup" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 text-secondary text-lg md:text-xl font-medium tracking-[0.2em] uppercase"
          >
            Est. 2015
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          >
            Creating Moments <br />
            <span className="italic font-light text-secondary">That Last Forever</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 font-light"
          >
            Pranora Production is India's premier event management agency specializing in bespoke weddings, corporate galas, and luxury social gatherings.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link 
              href="/events" 
              className="px-8 py-4 bg-secondary text-primary font-bold rounded-full hover:bg-white transition-colors duration-300 shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
            >
              View Portfolio <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/contact" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center justify-center"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">Why Choose Pranora</h2>
            <div className="h-1 w-20 bg-secondary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {FEATURES.map((feature, index) => (
              <motion.div 
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-border/50 text-center group"
              >
                <div className="w-16 h-16 mx-auto bg-primary/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <feature.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-display text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-muted/30 -skew-x-12 transform origin-top translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-secondary font-bold tracking-widest uppercase text-sm">Our Work</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mt-2">Featured Events</h2>
            </div>
            <Link 
              href="/events" 
              className="hidden md:flex items-center text-primary font-semibold hover:text-secondary transition-colors mt-4 md:mt-0"
            >
              View Full Gallery <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}

          <div className="mt-12 text-center md:hidden">
            <Link 
              href="/events" 
              className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-full font-medium"
            >
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Trust Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Events Curated", value: "500+" },
              { label: "Happy Couples", value: "250+" },
              { label: "Corporate Clients", value: "100+" },
              { label: "Industry Awards", value: "15" }
            ].map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="font-display text-4xl md:text-6xl font-bold text-secondary mb-2">{stat.value}</div>
                <div className="text-sm md:text-base font-medium opacity-80 uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
