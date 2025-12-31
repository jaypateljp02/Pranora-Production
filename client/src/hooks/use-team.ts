import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useTeam() {
  return useQuery({
    queryKey: [api.team.list.path],
    queryFn: async () => {
      const res = await fetch(api.team.list.path);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed to fetch team: ${res.status} ${res.statusText} - ${text.substring(0, 100)}`);
      }
      const data = JSON.parse(await res.text());
      return api.team.list.responses[200].parse(data);
    },
  });
}
