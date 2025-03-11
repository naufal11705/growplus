<?php

namespace App\Repositories\Interfaces;

use App\Models\Role;

interface RoleRepositoryInterface
{
    public function getAllRoles();
    public function getRoleById($id);
    public function createRole(array $data);
    public function updateRole($id, array $data);
    public function deleteRole($id);
}
