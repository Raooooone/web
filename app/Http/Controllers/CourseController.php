<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\User;

class CourseController extends Controller {
    public function index() {
        $courses = Course::with('teacher')->withCount('students')->get();
        return response()->json($courses);
    }

    public function store(Request $r) {
        $r->validate(['title'=>'required']);
        $user = $r->user();
        if ($user->role !== 'teacher') return response()->json(['message'=>'Forbidden'],403);
        $course = Course::create([
            'title' => $r->title,
            'description' => $r->description,
            'teacher_id' => $user->id
        ]);
        return response()->json($course, 201);
    }

    public function show($id) {
        $course = Course::with(['teacher','students','quizzes.questions.options','quizzes.results'])->findOrFail($id);
        return response()->json($course);
    }

    public function update(Request $r, $id) {
        $course = Course::findOrFail($id);
        $user = $r->user();
        if ($course->teacher_id !== $user->id) return response()->json(['message'=>'Forbidden'],403);
        $course->update($r->only(['title','description']));
        return response()->json($course);
    }

    public function destroy(Request $r, $id) {
        $course = Course::findOrFail($id);
        $user = $r->user();
        if ($course->teacher_id !== $user->id) return response()->json(['message'=>'Forbidden'],403);
        $course->delete();
        return response()->json(['ok'=>true]);
    }

    public function join(Request $r, $id) {
        $course = Course::findOrFail($id);
        $user = $r->user();
        if ($user->role !== 'student') return response()->json(['message'=>'Only students can join'],403);
        $course->students()->syncWithoutDetaching([$user->id]);
        return response()->json(['ok'=>true]);
    }
}
