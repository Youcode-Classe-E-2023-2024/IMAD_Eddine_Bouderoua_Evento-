<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventstatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('eventstatus', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('eventid');
            $table->integer('monday')->default(0);
            $table->integer('tuesday')->default(0);
            $table->integer('wednesday')->default(0);
            $table->integer('thursday')->default(0);
            $table->integer('friday')->default(0);
            $table->integer('saturday')->default(0);
            $table->integer('sunday')->default(0);
            $table->timestamps();

            $table->foreign('eventid')->references('id')->on('events');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('eventstatus');
    }
}
