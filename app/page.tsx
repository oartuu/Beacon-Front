'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CirclePlus, School } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Class = {
  id: string
  name: string
  professorId: string
  createdAt: string
}

export default function Home() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [name, setName] = useState("")
  const [classes, setClasses] = useState<Class[]>([])
  const router = useRouter()
  
  useEffect(()=>{
    const fetchClasses = async () =>{
      const token = localStorage.getItem("token")
      const res = await fetch(
        "https://beacon-api-liart.vercel.app/class/",
        {
          method:"GET",

          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`,
          }
        }
      );
      const jsonData = await res.json()
      setClasses(jsonData)

      console.log(jsonData)

    }
    fetchClasses()
  },[])

  const handleCreateClass = async ()=> {

    try {
      const token = localStorage.getItem("token")
      const res = await fetch("https://beacon-api-liart.vercel.app/class/create", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name:name
        })
      });
      
      if(!res){
        console.log("erro criando turma")
        return
      }
      setIsDialogOpen(false)
      window.location.reload()
    } catch (err) {
      
    }

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
        {classes.map((c) => (
          <Card key={c.id} className="w-1/6  hover:cursor-pointer">
            <CardContent className="flex flex-col gap-4 items-center justify-center">
              <p>{c.name}</p>
              <School />
            </CardContent>
          </Card>
        ))}
        <Card
          onClick={() => setIsDialogOpen(true)}
          className="w-1/6 bg-transparent border-2 border-zinc-950 border-dashed hover:cursor-pointer"
        >
          <CardContent className="flex flex-col gap-4 items-center justify-center">
            <p>ADD TURMA</p>
            <CirclePlus />
          </CardContent>
        </Card>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar nova turma</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="name">Nome</label>
                <input
                  className="shadow-lg pl-2 h-7.5"
                  type="name"
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  placeholder="Insira o nome da turma"
                />
              </div>
              <Button onClick={handleCreateClass} className="w-full mt-2 hover:cursor-pointer">
                Criar
              </Button >
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
