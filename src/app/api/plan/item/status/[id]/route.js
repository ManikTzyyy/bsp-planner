import { updateItem } from "@/repositories/plan_item.repository";
import { NextResponse } from "next/server";
import { requireApiSession } from "@/lib/api-auth";

export const PUT = async (req) => {
    try {
        const { user, error: authError } = requireApiSession(req)
        if (authError) return authError

        const body = await req.json()
        const { id, ...data } = body

        if(user.role?.role != "area"){
             return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }


        if (!id) {
            return NextResponse.json({ success: false, message: "Item ID is required" }, { status: 400 });
        }

        const changeStatus = await updateItem(id, data)
        return NextResponse.json({
            success: true,
            message: "item status changed successfuly",
            item: changeStatus
        })


    } catch (error) {
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}