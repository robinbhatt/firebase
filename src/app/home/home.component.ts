import {Component, OnInit} from '@angular/core';
import {Course} from '../model/course';
import {from, interval, Observable, of} from 'rxjs';
import {catchError, concatMap, map, take} from 'rxjs/operators';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import { CourseService } from 'src/app/services/course.service';


@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    beginnersCourses$: Observable<Course[]>;

    advancedCourses$: Observable<Course[]>;

    constructor(
      private router: Router,
      private courseService:CourseService) {

    }

    ngOnInit() { 
      this.reLoadCourses();
    }

    reLoadCourses(){
      this.beginnersCourses$ = this.courseService.loadCoursesByCategory("BEGINNER")
      this.advancedCourses$ = this.courseService.loadCoursesByCategory("BEGINNER")
    }

}
