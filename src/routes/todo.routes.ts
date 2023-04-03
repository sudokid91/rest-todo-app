import express, { Request, Response } from 'express';
import { Mongoose, Types } from 'mongoose';
import Todo from '../models/todo.model';

const router = express.Router();

router.get('/todos', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});

router.post('/todos', async (req: Request, res: Response) => {
  const { description, completed, title } = req.body;
  console.log(`created todo: `, req.body)

  const todo = new Todo({
    title,
    description,
    // priority,
    completed,
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.put('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { description, title, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id,
      {
        description,
        title,
        completed,
      },
      { new: true },
    );

    if (updatedTodo) {
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(400).json({ message: (err as Error).message });
  }
});

router.delete('/todos/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);

    if (deletedTodo) {
      res.json({ message: 'Todo deleted successfully' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
});


export default router;
