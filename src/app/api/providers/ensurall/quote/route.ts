import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { vehicleYear, vehicleMake, vehicleModel, vehicleMileage } = await req.json();
  const age = Math.max(0, 2025 - Number(vehicleYear));
  const luxury = /(bmw|mercedes|audi|tesla|porsche|lexus)/i.test(String(vehicleMake)) ? 1.25 : 1.0;
  const base = 650 * (1 + age * 0.05) * (vehicleMileage > 120000 ? 1.35 : 1.0) * luxury;

  const quotes = [
    { planName: "Select Powertrain", termMonths: 24, maxMileage: 200000, deductible: 250, coverage: "Engine, transmission, AWD/4x4", costToDealer: base * 0.95 },
    { planName: "Preferred", termMonths: 36, maxMileage: 230000, deductible: 200, coverage: "Powertrain + steering, brakes, cooling", costToDealer: base * 1.20 },
    { planName: "Elite Exclusionary", termMonths: 48, maxMileage: 250000, deductible: 100, coverage: "Comprehensive exclusionary coverage", costToDealer: base * 1.52 },
  ];
  return NextResponse.json({ providerId: "ensurall", providerName: "Ensūrall", quotes });
}
