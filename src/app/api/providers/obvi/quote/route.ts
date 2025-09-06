import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { vehicleYear, vehicleMake, vehicleModel, vehicleMileage } = await req.json();
  // Simple pricing logic for MVP: base by age/mileage
  const age = Math.max(0, 2025 - Number(vehicleYear));
  const mileageFactor = vehicleMileage > 160000 ? 1.6 : vehicleMileage > 100000 ? 1.3 : 1.0;
  const base = 700 * (1 + age * 0.04) * mileageFactor;

  const quotes = [
    { planName: "Essential Powertrain", termMonths: 24, maxMileage: 200000, deductible: 200, coverage: "Engine, transmission, drivetrain", costToDealer: base },
    { planName: "Plus Components", termMonths: 36, maxMileage: 220000, deductible: 200, coverage: "Powertrain + electrical + A/C", costToDealer: base * 1.25 },
    { planName: "Exclusionary", termMonths: 48, maxMileage: 240000, deductible: 100, coverage: "Almost all mechanical & electrical (exclusions listed)", costToDealer: base * 1.55 },
  ];
  return NextResponse.json({ providerId: "obvi", providerName: "Obvi", quotes });
}
