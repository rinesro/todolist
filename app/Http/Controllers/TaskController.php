<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index()
    {
        return Task::orderBy('course_name')
            ->orderBy('deadline')
            ->orderByRaw("FIELD(status, 'uncompleted', 'failed', 'completed')")
            ->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'course_name' => 'required|string|max:255',
            'task_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'required|date',
            'status' => 'required|in:uncompleted,failed,completed',
        ]);

        Task::create($validated);

        return response()->json(['message' => 'Task has been added successfully!'], 201);
    }

    public function update(Request $request, $id)
    {
        $task = Task::findOrFail($id);
        $validated = $request->validate([
            'course_name' => 'required|string|max:255',
            'task_name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'deadline' => 'required|date',
            'status' => 'required|in:uncompleted,failed,completed',
        ]);

        $task->update($validated);

        return response()->json(['message' => 'Task has been updated successfully!']);
    }

    public function destroy($id)
    {
        Task::destroy($id);
        return response()->json(['message' => 'Task has been deleted successfully!']);
    }

    public function show($id)
    {
        return Task::findOrFail($id);
    }
}
