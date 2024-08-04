"use client";
import EmptyState from "./components/EmptyState";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
}

const ErrorState: React.FC<ErrorProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <EmptyState 
      title="Oops" 
      error={error} 
      subtitle="Something went wrong" 
      />
    </div>
  );
};

export default ErrorState;
