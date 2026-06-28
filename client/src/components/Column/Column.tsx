import { useState } from "react";
import { useCreateCard } from "@/hooks/useCreateCard";
import Card from "../Card/Card";
import { Card as CardType, CardStatus } from "@/types/board";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

interface Props {
    columnTitle: string;
    status: CardStatus;
    cards: CardType[];
}

const colors = {
    TODO: "border-violet-200 bg-violet-50",
    IN_PROGRESS: "border-amber-200 bg-amber-50",
    DONE: "border-emerald-200 bg-emerald-50",
};

export default function Column({
    columnTitle,
    status,
    cards,
}: Props) {

    const [isAdding, setIsAdding] = useState(false);
    const [title, setTitle] = useState("");

    const createMutation = useCreateCard();

    const { setNodeRef } = useDroppable({
        id: status,
    });

    return (

        <div
            ref={setNodeRef}
            className={`rounded-2xl border p-4 ${colors[status]} text-black`}
        >

            <div className="mb-5 flex items-center justify-between">

                <h2 className="font-semibold text-lg">
                    {columnTitle}
                </h2>

                <span className="rounded-full bg-white px-2 py-1 text-xs shadow">
                    {cards.length}
                </span>

            </div>

            <SortableContext
                items={cards.map(card => card.id)}
                strategy={verticalListSortingStrategy}
            >

                <div className="space-y-3">

                    {cards.map(card => (

                        <Card
                            key={card.id}
                            card={card}
                        />

                    ))}

                </div>

            </SortableContext>

            {
                isAdding ? (

                    <div className="mt-4 rounded-xl bg-white p-3 shadow">

                        <input
                            value={title}
                            onChange={(e) =>
                                setTitle(e.target.value)
                            }
                            placeholder="Enter title..."
                            className="w-full rounded border p-2 text-sm outline-none"
                        />

                        <div className="mt-3 flex gap-2">

                            <button
                                onClick={async () => {

                                    if (!title.trim()) return;

                                    await createMutation.mutateAsync({
                                        title,
                                        status,
                                    });

                                    setTitle("");
                                    setIsAdding(false);

                                }}
                                className="rounded bg-blue-600 px-3 py-2 text-white"
                            >
                                Create
                            </button>

                            <button
                                onClick={() => {

                                    setTitle("");
                                    setIsAdding(false);

                                }}
                                className="rounded border px-3 py-2"
                            >
                                Cancel
                            </button>

                        </div>

                    </div>

                ) : (

                    <button
                        onClick={() => setIsAdding(true)}
                        className="mt-4 w-full rounded-xl border-2 border-dashed border-slate-300 py-3 transition hover:bg-white"
                    >
                        + Add Card
                    </button>

                )
            }

        </div>

    );
}