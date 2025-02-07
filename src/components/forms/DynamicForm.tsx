// components/dynamic-form.tsx
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z, ZodTypeAny } from "zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormSelect from "../inputs/FormSelect";
import FormInput from "../inputs/FormInput";
import { IFormField } from "@/types";

interface DynamicFormProps {
  fields: IFormField[];
  onSubmit: (values: any) => Promise<void>;
  defaultValues?: Record<string, any>;
  submitButtonText?: string;
  className?: string;
  children?: React.ReactNode;
  fieldArrays?: any[];
}

export default function DynamicForm({
  fields,
  onSubmit,
  defaultValues = {},
  submitButtonText = "Submit",
  className = "",
  children,
  fieldArrays = [],
}: DynamicFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const formSchema = z
    .object(
      fields.reduce((acc, field) => {
        if (field.validation) {
          acc[field.name] = field.validation;
        }
        return acc;
      }, {} as Record<string, ZodTypeAny>)
    )
    .extend(
      fieldArrays.reduce((acc, fieldName) => {
        acc[fieldName] = z.any();
        return acc;
      }, {} as Record<string, ZodTypeAny>)
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  console.log(form.formState.errors);

  async function handleFormSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);
      setError(null);
      await onSubmit(values);
    } catch (err) {
      console.error("Form submission error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className={`space-y-6  w-full ${className}`}>
        {fields.map((field) => {
          switch (field.component) {
            case "select":
              return (
                <FormSelect
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  placeholder={field.placeholder}
                  description={field.description}
                  options={field.options || []}
                  className={field.className}
                  {...field.props}
                />
              );
            case "checkbox":
            case "switch":
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type="checkbox"
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );

            case "textarea":
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  area={true}
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );
            case "array":
              return null;
            default:
              return (
                <FormInput
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  type={field.type || "text"}
                  placeholder={field.placeholder}
                  description={field.description}
                  className={field.className}
                  {...field.props}
                />
              );
          }
        })}
        {children && children(form.control, form.getValues)}{" "}
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : submitButtonText}
        </Button>
      </form>
    </Form>
  );
}
