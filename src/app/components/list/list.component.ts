import { Component, OnInit } from '@angular/core';
import { IssueService } from '../../issue.service';
import { Router } from '@angular/router';
import { Issue } from 'src/app/issue';
import { MatDialog } from '@angular/material';
import { ConfirmEditComponent } from '../dialogs/confirm-edit/confirm-edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.fetchIssues();
  }
  fetchIssues() {
    this.issueService.getIssues().subscribe((data: Issue[]) => {
      this.issues = data;
      console.log('Data requested ... ');
      console.log(this.issues);
    });
  }

  editIssue(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmEditComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.issueService.deleteIssue(id).subscribe(() => {
          this.fetchIssues();
        });
      }
    })
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }

}
