import { Card as CardType } from "@/types/board";
import { Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useDeleteCard } from "@/hooks/useDeleteCard";
import { useUpdateCard } from "@/hooks/useUpdateCard";


interface Props {
    card: CardType;
}

export default function Card({
    card,
}: Props) {

    const deleteMutation = useDeleteCard();
    const updateMutation = useUpdateCard();

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition
    } = useSortable({

        id: card.id,

        data: {
            card,
        },

    });
    const style = {

        transform: CSS.Transform.toString(transform),

        transition,

    };

    return (

        <div className="rounded-xl bg-white p-4 shadow-sm transition hover:shadow-md"
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}

        >

            <div className="flex items-start justify-between gap-3">

                <h3 className="font-medium break-words">
                    {card.title}
                </h3>
                <div className="flex justify-center items-center gap-2">
                    <button
                        onClick={() => {

                            const title = prompt(
                                "Update card title",
                                card.title
                            );

                            if (!title?.trim()) return;

                            updateMutation.mutate({

                                id: card.id,

                                title,

                                version: card.version,

                            });

                        }}
                    >
                        ✏️
                    </button>

                    <button
                        onClick={() => {

                            if (confirm("Delete this card?")) {

                                deleteMutation.mutate(card.id);

                            }

                        }}
                        className="text-slate-400 transition hover:text-red-500"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

            </div>

        </div>

    );

}