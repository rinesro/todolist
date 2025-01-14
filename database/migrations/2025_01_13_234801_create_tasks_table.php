<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('course_name'); // Nama mata kuliah
            $table->string('task_name');  // Nama tugas
            $table->text('description')->nullable(); // Deskripsi tugas
            $table->date('deadline'); // Tanggal deadline
            $table->enum('status', ['uncompleted', 'failed', 'completed'])->default('uncompleted'); // Status tugas
            $table->timestamps();
        });
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tasks');
    }
};
