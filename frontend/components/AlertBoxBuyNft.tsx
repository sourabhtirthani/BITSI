'use client'
import { Terminal } from "lucide-react"
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useEffect, useState } from "react";


export function AlertBoxBuyNfy() {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
      
        const initialTimer = setTimeout(() => {
          setVisible(true);
        }, 500);
    
       
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, 5500);
    
       
        return () => {
          clearTimeout(initialTimer);
          clearTimeout(hideTimer);
        };
      }, []);

      if (!visible) {
        return null;
      }
  return (
    <Alert className="bg-red-700 font-mulish text-white p-4 rounded-xl shadow-md flex items-center" >
      <div className="flex-shrink-0">
        <Terminal className="h-6 w-6 text-white mr-3" />
      </div>
      <div>
        <AlertTitle className="font-bold text-lg">Navigation Instructions</AlertTitle>
        <AlertDescription>
          <p className="text-base">Please hold and swipe left or right to view all items, or click on the arrows to navigate.</p>
        </AlertDescription>
      </div>
    </Alert>
  )
}