import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Course} from "../model/course";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import {EditCourseDialogComponent} from "../edit-course-dialog/edit-course-dialog.component";
import {catchError, tap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Router} from '@angular/router';
import { CourseService } from '../services/course.service';

@Component({
    selector: 'courses-card-list',
    templateUrl: './courses-card-list.component.html',
    styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

    @Input()
    courses: Course[];

    @Output()
    courseEdited = new EventEmitter();

    @Output()
    courseDeleted = new EventEmitter<Course>();

    constructor(
      private dialog: MatDialog,
      private router: Router, private coursesService:CourseService) {
    }

    ngOnInit() {

    }

    editCourse(course:Course) {

        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.minWidth = "400px";

        dialogConfig.data = course;

        this.dialog.open(EditCourseDialogComponent, dialogConfig)
            .afterClosed()
            .subscribe(val => {
                if (val) {
                    this.courseEdited.emit();
                }
            });
    }

    onDeleteCourse(course:Course){ console.log('onDeleteCourse')
        this.coursesService.deleteCourseAndLessons(course.id)
        .pipe(
            tap(()=>{
                this.courseDeleted.emit(course);
            }),
            catchError((err)=>{
                console.log('Pipe catchError Block');
                console.log( 'Error from catchError' ,err);
                alert('Could not delete course');
                return throwError(err);

            })
        )
        .subscribe()
    }

}









