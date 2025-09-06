import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { vehicleYear, vehicleMake, vehicleModel, vehicleMileage, postal } = await req.json();
  // Pretend GuardTree offers monthly subscription price; convert to term-equivalent for apples-to-apples
  const baseMonthly = 45 + Math.max(0, (2025 - Number(vehicleYear)) * 2) + (vehicleMileage > 120000 ? 15 : 0);
  const conv = (months: number) => baseMonthly * months * 0.6; // dealer cost conversion
  const quotes = [
    { planName: "GT Monthly Basic", termMonths: 24, maxMileage: 220000, deductible: 200, coverage: "Subscription-style coverage (ON only)", costToDealer: conv(24) },
    { planName: "GT Monthly Plus", termMonths: 36, maxMileage: 240000, deductible: 100, coverage: "Subscription + more components (ON only)", costToDealer: conv(36) },
  ];
  return NextResponse.json({ providerId: "guardtree", providerName: "GuardTree", quotes });
}
