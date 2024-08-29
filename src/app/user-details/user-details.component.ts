import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user: any;
  objectKeys = Object.keys;

  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUsers().subscribe(users => {
      this.user = users.find(u => u.id === id);
    });
  }
}
