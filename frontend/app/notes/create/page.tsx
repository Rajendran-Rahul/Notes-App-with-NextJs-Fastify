"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateNoteFormValues, createNoteSchema } from "@/app/lib/notes.schema";
import { TagInput } from "@/app/components/TagInput";
import { fetchData, create_note } from "@/app/api";
import { toast } from "sonner";

const CreateNote = () => {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateNoteFormValues>({
    resolver: zodResolver(createNoteSchema),
    defaultValues: { title: "", description: "", tags: [] },
  });

  const onSubmit = async (data: CreateNoteFormValues) => {
    try {
      const res = await fetchData(create_note, "POST", data);
      if (res.status === "success") {
        reset();
        toast.success(res.message);
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      toast.error(error as string);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-4 max-w-3xl mx-auto"
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
        {isSubmitting ? "Creating..." : "Create note"}
      </button>
    </form>
  );
};
export default CreateNote;
