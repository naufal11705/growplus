<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnakStoreRequest;
use App\Models\Anak;
use App\Repositories\Interfaces\AnakRepositoryInterface;
use Dom\ChildNode;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnakController extends Controller
{
    protected $anakRepository;

    public function __construct(AnakRepositoryInterface $anakRepository)
    {
        $this->anakRepository = $anakRepository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Anak', [
            'anak' => $this->anakRepository->getAllAnaks()
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/Functions/Anak/Tambah', [
            'orangtua' => $this->anakRepository->getAllAnaks()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AnakStoreRequest $request)
    {
        $validatedData = $request->validated();

        $this->anakRepository->createAnak($validatedData);

        return redirect()->route('orang_tua.index');
    }

    public function store_multiple(Request $request)
    {
        $validatedData = $request->validate([
            'children' => 'required|array',
            'children.*.namaLengkap' => 'required|string',
            'children.*.tanggalLahir' => 'required|date',
            'children.*.jenisKelamin' => 'required|string',
            'children.*.faseUsia' => 'required|string',
            'children.*.beratBadan' => 'required|numeric',
            'children.*.tinggiBadan' => 'required|numeric',
            'children.*.polaMakan' => 'required|string',
            'children.*.alergiMakanan' => 'nullable|string',
            'children.*.riwayatKesehatan' => 'nullable|string',
        ]);

        foreach ($validatedData['children'] as $child) {
            $this->anakRepository->createAnak($child);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Anak $anak)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Anak $anak)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Anak $anak)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $this->anakRepository->deleteAnak($id);
    }

    public function perhitunganStunting()
    {
        return Inertia::render('User/PerhitunganStunting');
    }
}
