import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Course} from '../model/course';
import {finalize, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Lesson} from '../model/lesson';
import { CourseService } from '../services/course.service';


@Component({
  selector: 'course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  course:Course;
  lessons:Lesson[];
  loading = false;
  lastPageLoad = 0; 

  displayedColumns = ['seqNo', 'description', 'duration'];

  constructor(private route: ActivatedRoute,
    private courseService:CourseService) {

  }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
    this.loading=true;
    console.log(this.course.id)
    this.courseService.findLessons(this.course.id)
    .pipe(finalize(()=>this.loading = false))
    .subscribe(lessons => this.lessons = lessons);
  }

  loadMore(){
    this.lastPageLoad++;
    this.loading = true;
    this.courseService.findLessons(this.course.id,'asc',this.lastPageLoad)
    .pipe(finalize(()=>this.loading = false))
    .subscribe(lessons=>this.lessons = this.lessons.concat(lessons))
  }

}
