// src/app/(dashboard)/user/UserPageClient.jsx
"use client";

import { useState } from "react";
import { toast } from "sonner";
import MyButton from "@/components/ui/MyButton";
import InputForm from "@/components/ui/InputForm";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export default function UserCreateClient({ dbRoles = [], dbBranches = [] }) {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    id_branch: "",
    id_role: "",
    isAdmin: false,
  });

  const save = async () => {
    
    if (!form.username || !form.password || !form.name || !form.id_role || !form.id_branch) {
      toast.error("Fill All field!!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        toast.success("Success to create user!");
        setForm({
          username: "",
          password: "",
          name: "",
          id_branch: "",
          id_role: "",
          isAdmin: false,
        });
      } else {
        toast.error(result.message || "failed to create user");
      }
    } catch (error) {
      toast.error("something is wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col gap-4 max-w-md">
     
      <InputForm 
        label="Username" 
        value={form.username} 
        onChange={(e) => setForm({ ...form, username: e.target.value })} 
        placeholder="Input username" 
        required 
      />
      <InputForm 
        label="Password" 
        type="password" 
        value={form.password} 
        onChange={(e) => setForm({ ...form, password: e.target.value })} 
        placeholder="Input password" 
        required 
      />
      <InputForm 
        label="Name" 
        value={form.name} 
        onChange={(e) => setForm({ ...form, name: e.target.value })} 
        placeholder="Input name" 
        required 
      />

    
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-stone-700">Role</label>
        <Combobox
          items={dbRoles.map((r) => r.role)}
          
          value={dbRoles.find((r) => r.id === form.id_role)?.role || ""}
         
          onValueChange={(val) => {
            const selected = dbRoles.find((r) => r.role === val);
            setForm({ ...form, id_role: selected ? selected.id : "" });
          }}
        >
          <ComboboxInput placeholder="Select a Role" className="bg-white" />
          <ComboboxContent>
            <ComboboxEmpty>No roles found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

  
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-stone-700">Branch</label>
        <Combobox
          items={dbBranches.map((b) => b.name)}
    
          value={dbBranches.find((b) => b.id === form.id_branch)?.name || ""}
      
          onValueChange={(val) => {
            const selected = dbBranches.find((b) => b.name === val);
            setForm({ ...form, id_branch: selected ? selected.id : "" });
          }}
        >
          <ComboboxInput placeholder="Select a branch" className="bg-white" />
          <ComboboxContent>
            <ComboboxEmpty>No branch found.</ComboboxEmpty>
            <ComboboxList>
              {(item) => (
                <ComboboxItem key={item} value={item}>
                  {item}
                </ComboboxItem>
              )}
            </ComboboxList>
          </ComboboxContent>
        </Combobox>
      </div>

      {/* Checkbox Admin */}
      <div className="flex gap-4 my-2">
        <label className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer select-none">
          <input 
            type="checkbox" 
            checked={form.isAdmin} 
            onChange={(e) => setForm({ ...form, isAdmin: e.target.checked })} 
          />
          Admin
        </label>
      </div>

      {/* Submit Button */}
      <MyButton 
        label={loading ? "Menyimpan..." : "Simpan User"} 
        onClick={save} 
        variant={loading ? "disable" : "primary"} 
      />
    </div>
  );
}