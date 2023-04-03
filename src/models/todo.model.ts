import { Schema, model, Document } from 'mongoose';

export interface Todo extends Document {
  title: string;
  description: string;
  // priority: string;
  completed: boolean;
}

const todoSchema = new Schema<Todo>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  // priority: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

todoSchema.set('toJSON', {
  transform: (doc, ret, options) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const TodoModel = model<Todo>('Todo', todoSchema);

export default TodoModel;
