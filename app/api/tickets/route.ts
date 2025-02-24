import tickets from "@/app/database";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(tickets);
}

export async function POST(request: Request) {
    const tickets = await request.json();

    tickets.push({ id: tickets.length + 1, ...tickets })

    return NextResponse.json(tickets);
}