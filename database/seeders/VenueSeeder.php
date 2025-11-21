<?php

namespace Database\Seeders;

use App\Models\Venue;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VenueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $total = 10000;
        $chunk = 1000; 

        for ($i = 0; $i < $total; $i += $chunk) {
            $data = Venue::factory()->count($chunk)->make()->toArray();
            Venue::insert($data);
        }
    }
}
