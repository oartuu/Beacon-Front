"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CirclePlus, School } from "lucide-react";
import { use, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import * as XLSX from "xlsx";
interface PageProps {
  params: Promise<{
    classId: string;
  }>;
}

type List = {
  id: string;
  name: string;
  classId: string;
  isOpen: boolean;
  shareToken: string;
  secret: any;
  codeWindow: number;
  createdAt: string;
};

export default function page({ params }: PageProps) {
  const { classId } = use(params);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isListDialogOpen, setIsListDialogOpen] = useState(false);
  const [lists, setLists] = useState<List[]>([]);
  const [name, setName] = useState("");
  const [shareToken, setShareToken] = useState("");
  const shareLink = `https://beacon4u.vercel.app/list/send/${shareToken}`;
  useEffect(() => {
    const fetchLists = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://beacon-api-liart.vercel.app/class/lists",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            classId: classId,
          }),
        },
      );

      const jsonData = await res.json();
      setLists(jsonData);
    };
    fetchLists();
  }, []);


  const exportToExcel = async () => {

    const response = await fetch(`https://beacon-api-liart.vercel.app/list/${shareToken}`);
    const data = await response.json();

    // pega apenas os itens
    const rows = data.itens
      .sort((a: any, b: any) => a.name.localeCompare(b.name, "pt-BR", {
        sensitivity:"base"
      }))
      .map((item: any) => ({
        Nome: item.name,
        Matricula: item.registration_number,
        Data: new Date(item.createdAt).toLocaleString("pt-BR"),
      }));

    // cria planilha
    const worksheet = XLSX.utils.json_to_sheet(rows);

    // cria workbook
    const workbook = XLSX.utils.book_new();

    // adiciona worksheet
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lista");

    // download do arquivo
    XLSX.writeFile(workbook, `${data.name}.xlsx`);
  };


  const handleCreateList = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        "https://beacon-api-liart.vercel.app/list/create",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: name,
            classId: classId,
          }),
        },
      );

      if (!res) {
        console.log("erro criando lista");
        return;
      }
      setIsDialogOpen(false);
      window.location.reload();
    } catch (err) {}
  };

  const handleShareList = (shareToken:string)=>{
    setIsListDialogOpen(true)
    setShareToken(shareToken)
  }
  return (
    <div className="h-dvh flex flex-col bg-zinc-100 ">
      <header className="bg-zinc-800 w-full h-18 flex justify-center items-center shadow-md">
        <div>
          <input
            className="bg-zinc-50 text-zinc-950 w-xl p-2 rounded-sm shadow-"
            type="text"
            placeholder="pesquisar turma"
          />
        </div>
      </header>

      <main className="flex-1 flex flex-wrap items-start content-start  gap-2  p-4 overflow-auto">
        {lists.map((l) => (
          <Card key={l.id} onClick={()=> handleShareList(l.shareToken)} className="w-1/6  hover:cursor-pointer">
            <CardContent className="flex flex-col gap-4 items-center justify-center">
              <p>{l.name}</p>
              <School />
            </CardContent>
          </Card>
        ))}
        <Card
          onClick={() => setIsDialogOpen(true)}
          className="w-1/6 bg-transparent border-2 border-zinc-950 border-dashed hover:cursor-pointer"
        >
          <CardContent className="flex flex-col gap-4 items-center justify-center">
            <p>Nova Lista</p>
            <CirclePlus />
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Criar nova lista</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <input
                  className="shadow-lg pl-2 h-7.5"
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Insira o nome da lista"
                />
              </div>
              <Button
                onClick={handleCreateList}
                className="w-full mt-2 hover:cursor-pointer"
              >
                Criar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isListDialogOpen} onOpenChange={setIsListDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Compartilhar lista</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-2">
              
              <QRCode value={shareLink}/>

              <Button
                onClick={exportToExcel}
                className="w-full mt-2 hover:cursor-pointer"
              >
                Exportar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
