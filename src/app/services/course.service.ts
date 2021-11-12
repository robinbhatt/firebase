import { Injectable, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from,Observable } from 'rxjs';
import { concatMap, map, tap } from 'rxjs/operators';
import { Course } from 'src/app/model/course';
import { convertSnaps } from './db-utils';
import firebase from 'firebase';
import  OrderByDirection = firebase.firestore.OrderByDirection;
import { Lesson } from '../model/lesson';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private db:AngularFirestore) { }

  findLessons(courseId:string, sortOrder:OrderByDirection='asc', pageNumber=0, pageSize=3 ):Observable<Lesson[]> {
   return this.db.collection(`courses/${courseId}/lessons` 
   ,ref=>ref.orderBy("seqNo")
    .limit(pageSize)
    .startAfter(pageNumber * pageSize)
    )
    .get().pipe( map( results=> convertSnaps<Lesson>(results) ))

  }

  createCourse(newCourse:Partial<Course>,courseId?:string) {
    return this.db.collection("courses", ref => ref.orderBy("seqNo","desc")
    .limit(1)).get().pipe(
      concatMap((result:any) =>{
        const courses = convertSnaps<Course>(result);
        const lastCourseSeqNo = courses[0]?.seqNo ?? 0;
        const course = {  ...newCourse, seqNo : lastCourseSeqNo + 1 };
        let save$ : Observable<any>;
        if(courseId){
          save$ = from(this.db.doc(`courses/${courseId}`).set(course))
        } else {
          save$ =  from(this.db.collection("courses").add(course))
        }
        return save$.pipe(map(res=>{ return { 
          id: courseId ?? res.id,
          ...course
        } }))
      })
    )
  }

  loadCoursesByCategory(category:string): Observable<Course[]> {
   return this.db.collection('courses',
    ref => ref.where('categories',"array-contains",category).orderBy('seqNo')
    ).get().pipe( 
      map(result => convertSnaps<Course>(result) )
    )
  }

  updateCourse(courseId:string,changes:Partial<Course>):Observable<any> {
    return from( this.db.doc(`courses/${courseId}`).update(changes) );
  }

    deleteCourse(courseId:string){
     return from(this.db.doc(`courses/${courseId}`).delete())  
    }

    // deleteCourseAndLessons(courseId:string):Observable<any>{
    //  return this.db.collection(`courses/${courseId}/lessons`).get()
    //   .pipe(
    //     concatMap((results)=>{
    //       const lessons:any = convertSnaps(results);
    //       const batch = this.db.firestore.batch();
    //       const courseRef = this.db.doc(`courses/${courseId}`).ref;
    //       batch.delete(courseRef);

    //       for (let lesson of lessons){
    //         const lessonRef =  this.db.doc(`courses/${courseId}/lessons/${lesson.id}`).ref;
    //         batch.delete(lessonRef);
    //       }
    //       return from(batch.commit())
    //     })
    //   )
    // }

    deleteCourseAndLessons(courseId:string):Observable<any>{
      return this.db.collection(`courses/${courseId}/lessons`).get()
       .pipe(
         concatMap((results)=>{
           const lessons:any = convertSnaps(results); console.log(lessons)
           this.db.firestore.batch().delete(this.db.doc(`courses/${courseId}`).ref);
          //  console.log('courseId.ref : ', this.db.doc(`courses/${courseId}`))

           for (let lesson of lessons){
            this.db.firestore.batch().delete(this.db.doc(`courses/${courseId}/lessons/${lesson.id}`).ref);
            // console.log(' lesson.id ref : ', this.db.doc(`courses/${courseId}/lessons/${lesson.id}`))
           }
           return from(this.db.firestore.batch().commit())
         })
       )
     }

     findCourseByUrl(courseUrl:string):Observable<Course | null > { 
      //  this.getTest(courseUrl)
      return this.db.collection('courses',
      ref=>ref.where("url","==",courseUrl)).get()
            .pipe(
        map(results=>{
          const course = convertSnaps<Course>(results);
          return course.length == 1 ? course[0] : null
        })
      )

    }

}
