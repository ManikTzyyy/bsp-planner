import { supabase } from "@/lib/supabase";


export const createPlanItem = async (payload) => {
    const { data, error } = await supabase.from('plan_item').insert(payload).select().single()
    if (error) throw error
    return data
}