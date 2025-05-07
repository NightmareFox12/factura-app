import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function CloseSession() {
  const router = useRouter()

  useEffect(() => {
    router.navigate("/main")
  },[])
}