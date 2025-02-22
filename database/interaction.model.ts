import { model, models, Schema, Types, Document } from "mongoose";

export interface IInteraction {
    user: Types.ObjectId,
    action: string,
    actionType: "answer" | "question",
    actionId: Types.ObjectId,
}

export interface IInteractionDoc extends IInteraction, Document {}

const InteractionSchema = new Schema<IInteraction>(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        action: { type: String, required: true},
        actionType: { type: String, enum: ["answer", "question"], required: true },
        actionId: { type: Schema.Types.ObjectId, required: true } 
    },
    { timestamps: true }
)

const Interaction = models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;