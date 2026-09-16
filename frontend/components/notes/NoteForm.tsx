"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  createNoteSchema,
  CreateNoteFormValues,
} from "@/lib/schema/notes.schema";
import { TagInput } from "@/components/notes/TagInput";
import { fetchData, create_note, update_note } from "@/api";
import { ApiResponse } from "@/lib/schema/notes.types";
import { toast } from "sonner";

interface NoteFormProps {
  mode: "create" | "edit";
  noteId?: string;
  defaultValues?: CreateNoteFormValues;
}

export function NoteForm({ mode, noteId, defaultValues }: NoteFormProps) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteFormValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: defaultValues ?? { title: "", description: "", tags: [] },
  });

  const onSubmit = async (data: CreateNoteFormValues) => {
    try {
      let res;
      if (mode === "create") {
        res = await fetchData<ApiResponse>(create_note, "POST", data);
      } else {
        res = await fetchData<ApiResponse>(`${update_note}`, "PUT", {id: noteId, ...data});
      }
      if (res.status === "success") {
        toast.success(res.message);
      }
      router.push("/");
    } catch (error) {
      console.error(`Failed to ${mode} note:`, error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-md mx-auto"
    >
      <div>
        <input
          {...register("title")}
          placeholder="Title"
          className="border rounded px-3 py-2 w-full"
        />
        {errors.title && (
          <p className="text-red-600 text-sm">{errors.title.message}</p>
        )}
      </div>

      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="border rounded px-3 py-2 w-full"
        />
        {errors.description && (
          <p className="text-red-600 text-sm">{errors.description.message}</p>
        )}
      </div>

      <Controller
        name="tags"
        control={control}
        render={({ field }) => (
          <TagInput
            value={field.value ?? []}
            onChange={field.onChange}
            error={errors.tags?.message}
          />
        )}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-accent text-white rounded px-4 py-2"
      >
        {isSubmitting
          ? mode === "create"
            ? "Saving..."
            : "Updating..."
          : mode === "create"
            ? "Save"
            : "Update"}
      </button>
    </form>
  );
}
