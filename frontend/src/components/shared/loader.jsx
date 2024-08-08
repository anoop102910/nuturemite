import { CircularProgress } from "@mui/material";
import { LoaderCircle } from "lucide-react";
import React from "react";

function Loader({height}) {
  return (
    <div className={`w-full h-full bg-opacity-50 z-50 flex items-center justify-center min-h-[90vh] gap-5`}>
      <div className="flex items-center gap-4">
        <CircularProgress />
      </div>
    </div>
  );
}

export default Loader;
