import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  eventType: z.string().min(1, "Please select an event type"),
  date: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = (data: ContactFormValues) => {
    // UI demo only - no backend for this yet
    console.log(data);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours to schedule your consultation.",
      duration: 5000,
    });
    form.reset();
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative bg-primary py-32 px-4 text-center overflow-hidden">
        {/* Background Image for Contact Hero */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.pexels.com/photos/1181438/pexels-photo-1181438.jpeg?auto=compress&cs=tinysrgb&w=1600" 
            alt="Professional consultation" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
        </div>
        
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Let's Plan Your Big Day
          </motion.h1>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            We'd love to hear about your vision. Fill out the form below or reach out directly to start the conversation.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Info Side */}
          <div>
            <h2 className="font-display text-3xl font-bold text-primary mb-8">Get In Touch</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Visit Us</h3>
                  <p className="text-gray-600 mt-1">Pranora Studios, Plot 45<br />Bandra, Mumbai, MH 400050, India</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Email Us</h3>
                  <p className="text-gray-600 mt-1">hello@pranoraevent.in</p>
                  <p className="text-gray-500 text-sm mt-1">We typically reply within 24 hours.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-secondary/10 rounded-full text-secondary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Call Us</h3>
                  <p className="text-gray-600 mt-1">+91 (22) 6123-4567</p>
                  <p className="text-gray-500 text-sm mt-1">Mon-Fri from 9am to 6pm IST.</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-8 bg-muted/30 rounded-2xl border border-border">
              <h3 className="font-display text-xl font-bold text-primary mb-2">FAQ</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Wondering about our pricing or availability? Check out our common questions before reaching out.
              </p>
              <a href="#" className="text-secondary font-semibold hover:underline">Read FAQs &rarr;</a>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-border/50">
            <h2 className="font-display text-2xl font-bold text-primary mb-6">Send a Message</h2>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Name</label>
                  <input
                    {...form.register("name")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    placeholder="Jane Doe"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-xs">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Email</label>
                  <input
                    {...form.register("email")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                    placeholder="jane@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-xs">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Event Type</label>
                  <select
                    {...form.register("eventType")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                  >
                    <option value="">Select type...</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Corporate">Corporate Gala</option>
                    <option value="Social">Social Celebration</option>
                    <option value="Other">Other</option>
                  </select>
                  {form.formState.errors.eventType && (
                    <p className="text-red-500 text-xs">{form.formState.errors.eventType.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Event Date (Optional)</label>
                  <input
                    type="date"
                    {...form.register("date")}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Message</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all outline-none resize-none"
                  placeholder="Tell us about your event..."
                />
                {form.formState.errors.message && (
                  <p className="text-red-500 text-xs">{form.formState.errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={form.formState.isSubmitting}
                className="w-full py-4 bg-primary text-white font-bold rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {form.formState.isSubmitting ? (
                  "Sending..."
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
