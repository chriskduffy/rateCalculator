import { api, HydrateClient } from "@/trpc/server";
import PacificRateCalculator from "./RateCalculator";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main>
        <PacificRateCalculator />
      </main>
    </HydrateClient>
  );
}
