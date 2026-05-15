import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Share2 } from "lucide-react";
import Link from "next/link";


export default function page() {
  return (
    <div className="h-dvh flex flex-col bg-zinc-100 dark:bg-zinc-900 ">
      <header className="bg-zinc-800 w-full px-4 h-18 flex justify-between items-center shadow-md">
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/class"
                    className="text-zinc-300 hover:text-zinc-100"
                  >
                    Turmas
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/class"
                    className="text-zinc-300 hover:text-zinc-100"
                  >
                    "class_name"
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-zinc-100">
                  "list_name"
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div>
          <Button
            size={"lg"}
            className=" flex justify-between hover:cursor-pointer bg-zinc-100 text-zinc-900"
          >
            <Share2 />
            Compartilhar
          </Button>
        </div>
      </header>
      <main className="flex-1 px-4 ">
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>NOME:</TableHead>
              <TableHead>MATRÍCULA:</TableHead>
              <TableHead className="text-right">DATA:</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
                <TableCell>Arthur do Nascimento</TableCell>
                <TableCell>01605269</TableCell>
                <TableCell className="text-right">14/05/2026</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </main>
    </div>
  );
}
