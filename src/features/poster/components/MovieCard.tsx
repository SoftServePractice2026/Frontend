import clsx from "clsx";
import { useNavigate } from "react-router-dom";

export type MovieCardProps = {
    id: string;
    title: string;
    posterUrl: string;
    ageBadge?: string;
    rating?: number;
    meta?: string;
};

export const MovieCard = ({
                              id,
                              title,
                              posterUrl,
                              ageBadge,
                              rating,
                              meta,
                          }: MovieCardProps) => {
    const navigate = useNavigate();

    return (
        <div className="group cursor-pointer" onClick={() => navigate(`/movie/${id}`)}>
            <div
                className={clsx(
                    "relative overflow-hidden aspect-[2/3]",
                    "rounded-2xl border",
                    "bg-black/5 border-black/10",
                    "dark:bg-white/5 dark:border-white/10"
                )}>

                <img
                    src={posterUrl}
                    alt={title}
                    className={clsx(
                        "w-full h-full object-cover",
                        "transition-transform",
                        "group-hover:scale-[1.02]"
                    )}
                />

                {ageBadge && (
                    <div
                        className={clsx(
                            "absolute top-2 left-2",
                            "px-2 py-1 rounded-md",
                            "text-[10px] font-semibold",
                            "bg-red-600 text-white"
                        )}>
                        {ageBadge}
                    </div>
                )}


                {typeof rating === "number" && (
                    <div
                        className={clsx(
                            "absolute top-2 right-2",
                            "px-2 py-1 rounded-md",
                            "text-[10px] font-semibold",
                            "flex items-center gap-1",
                            "bg-black/60 text-white"
                        )}>
                        <span>★</span>
                        <span>{rating.toFixed(1)}</span>
                    </div>
                )}
            </div>


            <div className="mt-3">
                <div
                    className={clsx(
                        "font-montserrat font-semibold text-sm",
                        "text-black/90 dark:text-white"

                    )}>
                    {title}
                </div>

                {meta && (
                    <div
                        className={clsx(
                            "text-xs mt-1",
                            "text-black/60 dark:text-white/70"
                        )}>
                        {meta}
                    </div>
                )}
            </div>
        </div>
    );
};
