<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ImunisasiNotification implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $imunisasi;
    /**
     * Create a new event instance.
     */
    public function __construct($imunisasi)
    {
        //
        $this->imunisasi = $imunisasi;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return new Channel('imunisasi.' . $this->imunisasi->puskesmas->kota);
    }

    public function broadcastWith()
    {
        return [
            'vaksin_id' => $this->imunisasi->vaksin_id,
            'nama' => $this->imunisasi->nama,
            'jenis' => $this->imunisasi->jenis,
            'tanggal' => $this->imunisasi->tanggal,
            'puskesmas' => $this->imunisasi->puskesmas->nama,
            'alamat' => $this->imunisasi->puskesmas->alamat
        ];
    }
}
