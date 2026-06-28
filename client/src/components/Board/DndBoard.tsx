"use client";

import { useEffect, useState } from "react";
import { BoardData, CardStatus } from "@/types/board";
import {
    DndContext,
    DragEndEvent,
    PointerSensor,
    useSensor,
    useSensors,
    closestCorners,
} from "@dnd-kit/core";
import Board from "./Board";
import { useMoveCard } from "@/hooks/useMoveCard";

interface Props {
    board: BoardData;
}

export default function DndBoard({
    board,
}: Props) {

    const moveMutation = useMoveCard();
    const [boardState, setBoardState] = useState(board);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10,
            },
        })
    );

    const handleDragEnd = (
        event: DragEndEvent
    ) => {

        const { active, over } = event;

        if (!over) return;

        const draggedCard =
            active.data.current?.card;

        if (!draggedCard) return;

        const statuses = [
            "TODO",
            "IN_PROGRESS",
            "DONE",
        ];

        if (
            !statuses.includes(over.id as string)
        ) {
            return;
        }

        const targetStatus =
            over.id as CardStatus;

        const targetPosition =
            boardState[targetStatus].length;

        moveMutation.mutate({

            id: draggedCard.id,

            status: targetStatus,

            position: targetPosition,

            version: draggedCard.version,

        });

    };

    useEffect(() => {
        setBoardState(board);
    }, [board]);

    return (

        <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
        >
            <Board board={boardState} />
        </DndContext>

    );

}