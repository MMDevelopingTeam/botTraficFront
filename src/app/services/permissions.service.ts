import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  urlPermissions = `${environment.url}/permissions`;

  constructor(
    private http: HttpClient
  ) { }

  createPermission(Permission:any) {
    return this.http.post(this.urlPermissions, Permission);
  }
  gePermissions() {
    return this.http.get(this.urlPermissions);
  }
  getPermissionById(id:any) {
    return this.http.get(`${this.urlPermissions}/${id}`);
  }
  updatePermission(Permission:any, id:any) {
    return this.http.put(`${this.urlPermissions}/${id}`, Permission);
  }
  deletePermission(id:any) {
    return this.http.delete(`${this.urlPermissions}/${id}`);
  }
}
