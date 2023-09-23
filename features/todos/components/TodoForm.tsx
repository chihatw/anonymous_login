"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { FormEvent, useEffect, useState } from "react";
import { addTodoAction } from "../actions";

const TodoForm = () => {
  const session = useSession();
  const [value, setValue] = useState({ title: "", uid: "" });

  useEffect(() => {
    if (session.data?.user.uid) {
      setValue((prev) => ({
        ...prev,
        uid: session.data.user.uid,
      }));
      return;
    }
    setValue((prev) => ({
      ...prev,
      uid: "",
    }));
  }, [session.data?.user.uid]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);
    await addTodoAction(data);
    setValue((prev) => ({ ...prev, title: "" }));
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit}>
      <Input
        name="title"
        className="h-12 bg-white"
        placeholder="title"
        value={value.title}
        onChange={(e) =>
          setValue((prev) => ({
            ...prev,
            title: e.target.value,
          }))
        }
      />
      <Input name="uid" defaultValue={value.uid} type="hidden" />
      <Button className="h-10 w-full" disabled={!value.title || !value.uid}>
        Create New Todo
      </Button>
    </form>
  );
};

export default TodoForm;
