import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import jwt from "jsonwebtoken"

import { createUser } from "@/repositories/user.repository";

export async function POST(req) {
  try {
    const token = req.cookies.get("session")?.value

    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    if (!decoded.isAdmin) {
      return NextResponse.json({ success: false, message: "Forbidden bruh!" }, { status: 403 });
    }
    const body = await req.json();

    const hash = await bcrypt.hash(body.password, 10);

    const user = await createUser({
      username: body.username,
      password: hash,
      name: body.name,
      id_branch: body.id_branch ? Number(body.id_branch) : null,
      isAdmin: body.isAdmin,
      id_role: body.id_role
    });

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (err) {
    if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
      return NextResponse.json({ success: false, message: "Invalid or expired token" }, { status: 401 });
    }
    // console.error("Error create user:", err);
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
  }
}
