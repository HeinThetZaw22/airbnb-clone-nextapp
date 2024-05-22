"use client";
import { useEffect, useState } from "react";


const ClientOnly = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
//to solve hydration error
//when text context not match with server render html