"use client";
import { useRouter } from "next/navigation"
import Button from "./Button"
import Heading from "./Heading"

const EmptyState = ({
    title = "No exact matches",
    subtitle = "Try changing or removing some of your filters",
    showReset,
    error
}) => {
    const router = useRouter();
    const handleRefresh = () => {
        window.location.reload();
    }
    return (
        <div className=" h-[60vh] flex flex-col gap-2 items-center justify-center">
            <Heading title={title} subtitle={subtitle} center />
            <div className="w-48 mt-2">
                {showReset && (
                    <Button outline label="Remove all filters"
                        onClick={() => router.push("/")} />
                )}
            </div>
            {error && (
                <div className="mt-2">
                    <button
                        onClick={handleRefresh}
                        className="px-4 py-2 border-2 border-neutral-400 rounded-md"
                    >
                        Try again
                    </button>
                </div>
            )}
        </div>
    )
}

export default EmptyState