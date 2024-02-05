"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Tutorial = Readonly<{
  courseCode: string;
  courseOffering: string;
}>;

export const columns: ColumnDef<Tutorial>[] = [];
