<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnakStoreRequest;
use App\Http\Requests\AnakUpdateRequest;
use App\Models\Anak;
use App\Repositories\Interfaces\AnakRepositoryInterface;
use App\Repositories\Interfaces\OrangTuaRepositoryInterface;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnakController extends Controller
{
    protected $anakRepository;
    protected $orangTuaRepository;

    public function __construct(AnakRepositoryInterface $anakRepository, OrangTuaRepositoryInterface $orangTuaRepository)
    {
        $this->anakRepository = $anakRepository;
        $this->orangTuaRepository = $orangTuaRepository;
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
            'orangtua' => $this->orangTuaRepository->getAllOrangTua()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AnakStoreRequest $request)
    {
        try {
            $validatedData = $request->validated();

            $this->anakRepository->createAnak($validatedData);
    
            return redirect()->route('anak.index')->with('success', 'Data berhasil ditambahkan.');
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal ditambahkan.');
        }
    }

    public function store_multiple(Request $request)
    {
        $validatedData = $request->validate([
            'orangtua_id' => ['required', 'integer', 'exists:orang_tuas,orangtua_id'],
            'children' => ['required', 'array'],
            'children.*.nama' => ['required', 'string', 'max:255'],
            'children.*.nik' => ['required', 'string', 'min:16'],
            'children.*.no_jkn' => ['required', 'string', 'min:13'],
            'children.*.tempat_lahir' => ['required', 'string', 'max:255'],
            'children.*.tanggal_lahir' => ['required', 'date'],
            'children.*.golongan_darah' => ['required', 'string', 'max:3'],
            'children.*.berat_badan' => ['required', 'integer'],
            'children.*.tinggi_badan' => ['required', 'integer'],
        ]);
    
        foreach ($validatedData['children'] as $child) {
            $this->anakRepository->createAnak(array_merge($child, [
                'orangtua_id' => $validatedData['orangtua_id'],
            ]));
        }
    
        return redirect()->route('anak.index');
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
    public function edit($id)
    {
        return Inertia::render('Admin/Functions/Anak/Edit', [
            'orangtua' => $this->orangTuaRepository->getAllOrangTua(),
            'anak' => $this->anakRepository->getAnakById($id)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AnakUpdateRequest $request, $id)
    {
        try {
            $validatedData = $request->validated();

            $this->anakRepository->updateAnak($id, $validatedData);
    
            return redirect()->route('anak.index')->with('success', 'Data berhasil diperbarui.');;
        } catch (Exception $e) {
            return redirect()->back()->with('error', 'Data gagal diperbarui.');
        }
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
