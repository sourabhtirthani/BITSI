"use client"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ToastWithTitle() {
  const { toast } = useToast()

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "No Item Selected",
          description: "Please select ",
        })
      }}
    >
      Show Toast
    </Button>
  )
}
