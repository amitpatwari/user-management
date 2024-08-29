import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any[] = [];
  headers: string[] = [];
  editMode: boolean = false;
  editedRow: any = null;
  page: number = 1;
  itemsPerPage: number = 10;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      if (this.users.length > 0) {
        this.headers = Object.keys(this.users[0]);
      }
    });
  }

  viewDetails(user: any, event: Event): void {
    event.stopPropagation();
    this.router.navigate(['/user-details', user.id]);
  }

  editRow(user: any): void {
    this.editMode = true;
    this.editedRow = { ...user };
  }

  saveRow(user: any): void {
    if (this.editedRow) {
      const index = this.users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        this.users[index] = { ...this.editedRow };
        this.cancelEdit();
      }
    }
  }

  cancelEdit(): void {
    this.editMode = false;
    this.editedRow = null;
  }
}
