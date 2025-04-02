import React from 'react'
import type { ErrorMessage } from "@/types/types";

export default function ErrorComponent({ errorMessage }: { errorMessage: ErrorMessage | null }) {
    return (
        <div>
            {errorMessage && (
                <div className="text-center">
                    <span className={errorMessage.success ? "text-green-600" : "text-red-600"}>
                        {errorMessage.message}
                    </span>
                </div>
            )}
        </div>

    )
}
