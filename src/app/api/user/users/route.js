// src/app/api/users/route.js
import { NextResponse } from "next/server";
import { getUsersPaginated } from "@/repositories/user.repository";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const search = searchParams.get("search") || "";
   
    const result = await getUsersPaginated({ page, limit, search });

    return NextResponse.json({ success: true, ...result });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}