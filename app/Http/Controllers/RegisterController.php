<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Register;
use App\Models\Grade;
use App\Models\Classes;
class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // return 
        return Inertia::render('Register/index', [
            'registers' => Register::all(),
            'grades' => Grade::all(),
            'classes' => Classes::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
         // validate and store the request 
            $request->validate([
                'comment' => 'required',
                'grade_id' => 'required',
                'classes_id' => 'required'

    ]);

    Register::create([
        'comment' => $request->comment,
        'grade_id' => $request->grade_id,
        'class_id' => $request->classes_id,
    ]);

    return redirect()->back()->with('success', 'Register created successfully');

}
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
