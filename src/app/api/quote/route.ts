import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

type ProviderResponse = {
  providerId: string;
  providerName: string;
  quotes: Array<{
    planName: string;
    termMonths: number;
    maxMileage: number;
    deductible: number;
    coverage: string;
    costToDealer: number;
  }>;
};

async function callProvider(provider: string, payload: any): Promise<ProviderResponse | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/providers/${provider}/quote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store"
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { vehicleYear, vehicleMake, vehicleModel, vehicleMileage, postal, providers, markup } = body || {};
  if (!vehicleYear || !vehicleMake || !vehicleModel || typeof vehicleMileage !== 'number' || !Array.isArray(providers)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Fan out to requested providers (mocked endpoints inside this app)
  const payload = { vehicleYear, vehicleMake, vehicleModel, vehicleMileage, postal };
  const results = await Promise.all(providers.map((p: string) => callProvider(p, payload)));
  const flatQuotes = (results.filter(Boolean) as ProviderResponse[]).flatMap((r) =>
    r.quotes.map(q => ({
      providerId: r.providerId,
      providerName: r.providerName,
      ...q,
    }))
  );

  // Apply dealer markup to each quote for retail price and profit
  const normalized = flatQuotes.map(q => {
    const retailPrice = q.costToDealer + (typeof markup === 'number' ? markup : 0);
    const profit = retailPrice - q.costToDealer;
    return { ...q, retailPrice, profit };
  }).sort((a,b) => a.retailPrice - b.retailPrice);

  return NextResponse.json({ quotes: normalized });
}
