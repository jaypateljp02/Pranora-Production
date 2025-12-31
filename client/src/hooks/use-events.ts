import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { type Event } from "@shared/schema";

export function useEvents() {
  return useQuery({
    queryKey: [api.events.list.path],
    queryFn: async () => {
      const res = await fetch(api.events.list.path);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch events: ${res.status} ${res.statusText} - ${text.substring(0, 100)}`);
      }
      const data = JSON.parse(await res.text()); // Robust parsing
      return api.events.list.responses[200].parse(data);
    },
  });
}

export function useEvent(id: number) {
  return useQuery({
    queryKey: [api.events.get.path, id],
    queryFn: async () => {
      // Manually construct URL since we don't have buildUrl exposed yet or use simple replacement
      const url = api.events.get.path.replace(':id', id.toString());
      const res = await fetch(url);
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch event");
      const data = await res.json();
      return api.events.get.responses[200].parse(data);
    },
  });
}
