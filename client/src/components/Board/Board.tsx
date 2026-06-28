import Column from "../Column/Column";
import { BoardData } from "@/types/board";

interface Props {
    board: BoardData;
}

export default function Board({ board }: Props) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">

            <Column
                columnTitle="To Do"
                status="TODO"
                cards={board.TODO}
            />

            <Column
                columnTitle="In Progress"
                status="IN_PROGRESS"
                cards={board.IN_PROGRESS}
            />

            <Column
                columnTitle="Done"
                status="DONE"
                cards={board.DONE}
            />

        </div>
    );
}