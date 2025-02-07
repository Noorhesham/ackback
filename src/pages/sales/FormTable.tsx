"use client";

import { useTransition } from "react";
import { Form } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import { Eye, Edit, FileText, Printer, LucideCopyPlus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/forms/FormInput";

// Define schema for validation using zod
const rowSchema = z.object({
  id: z.string(),
  date: z.string(),
  client: z.string().min(3, "Client name is required"),
  description: z.string(),
  amount: z.string().min(1, "Amount is required"),
  type: z.string(),
  addedBy: z.string(),
  modifiedBy: z.string(),
});

const schema = z.object({
  rows: z.array(rowSchema),
});

const FormTable = ({ data }: { data?: any[] }) => {
  const form = useForm<z.infer<typeof schema>>({
    defaultValues: {
      rows: data || [
        {
          id: "1",
          date: new Date().toISOString().split("T")[0],
          client: "",
          description: "",
          amount: "",
          type: "",
          addedBy: "System",
          modifiedBy: "System",
        },
      ],
    },
    resolver: zodResolver(schema),
  });

  const [isPending, startTransition] = useTransition();
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "rows",
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="flex flex-col w-full items-stretch gap-2" onSubmit={form.handleSubmit(onSubmit)}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">
             
              </TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Added By</TableHead>
              <TableHead>Modified By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields.map((field, index) => (
              <TableRow key={field.id}>
                <TableCell>
                
                </TableCell>
                <TableCell>
                  <FormInput name={`rows.${index}.id`} placeholder="ID" />
                </TableCell>
                <TableCell>
                  <FormInput date type="date" name={`rows.${index}.date`} />
                </TableCell>
                <TableCell>
                  <FormInput name={`rows.${index}.client`} placeholder="Client Name" />
                </TableCell>
                <TableCell>
                  <FormInput name={`rows.${index}.description`} placeholder="Description" />
                </TableCell>
                <TableCell>
                  <FormInput name={`rows.${index}.amount`} placeholder="Amount" />
                </TableCell>
                <TableCell>
                  <Select>
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="type1">Type 1</SelectItem>
                      <SelectItem value="type2">Type 2</SelectItem>
                      <SelectItem value="type3">Type 3</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <FormInput name={`rows.${index}.addedBy`} placeholder="Added By" disabled />
                </TableCell>
                <TableCell>
                  <FormInput name={`rows.${index}.modifiedBy`} placeholder="Modified By" disabled />
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Printer className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => fields.length > 1 && remove(index)}
                      disabled={fields.length === 1}
                    >
                      <Trash className="h-4 w-4 text-red-500" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        const rowToCopy = form.getValues(`rows.${index}`);
                        append({
                          ...rowToCopy,
                          id: String(fields.length + 1),
                        });
                      }}
                    >
                      <LucideCopyPlus className="h-4 w-4 text-green-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between mt-4">
          <Button
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              append({
                id: String(fields.length + 1),
                date: new Date().toISOString().split("T")[0],
                client: "",
                description: "",
                amount: "",
                type: "",
                addedBy: "System",
                modifiedBy: "System",
              });
            }}
          >
            Add New Row
          </Button>
          <Button type="submit" disabled={isPending}>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FormTable;
