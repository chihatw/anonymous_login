"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { removeTodoAction } from "../actions";

const RemoveButton = ({ todo }: { todo: Todo }) => {
  const session = useSession();

  if (session.data?.user.uid !== todo.uid) return null;

  return (
    <form action={removeTodoAction}>
      <Input type="hidden" name="id" defaultValue={todo.id} />
      <Button type="submit" size="icon" variant="ghost">
        <Trash2 size={20} />
      </Button>
    </form>
  );
};

export default RemoveButton;
