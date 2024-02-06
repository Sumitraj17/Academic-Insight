USE academic_insight;

create table TEACHER(
    Teacher_id char(10) primary key,
    Teacher_Name varchar(50),
    Password varchar(72),
    Email varchar(50) unique,
    Phone_Number char(10) unique
);

create table STUDENT(
    Usn char(10) primary key,
    Student_Name varchar(50),
    Semester int,
    Email varchar(50) unique,
    Phone_Number char(10) unique,
    Parent_Number char(10)
);

create table COURSE(
    Course_id varchar(12) primary key,
    Course_Name varchar(50),
    Scheme int,
    Sem int
);

create table RECORD(
    Usn char(10),
    Course_id varchar(12),
    Ia1_score int,
    Ia2_score int,
    Ia3_score int,
    Final_Ia int,
    Assignment_Marks int,
    Lab_Or_Quiz int,
    Final_Marks int,
    Classes_Attended int,
    Classes_Held int,
    Attendance_percentage int,
    primary key(Usn,Course_id)
);

create table ENROLLED_BY(
    Usn char(10),
    Course_id varchar(12),
    primary key(Usn,Course_id)
);

create table Teacher_Course(
    Teacher_id varchar(12),
    Course_id varchar(12),
    primary key(Teacher_id,Course_id)
);

alter table Teacher_Course add foreign key(Teacher_id) references TEACHER(Teacher_id); 

alter table RECORD add foreign key(Usn) references STUDENT(Usn);

alter table Teacher_course add foreign key(course_id) references COURSE(course_id);

alter table RECORD add foreign key(Course_id) references COURSE(Course_id);

alter table ENROLLED_BY add foreign key(Usn) references STUDENT(Usn);

alter table ENROLLED_BY add foreign key(Course_id) references COURSE(Course_id);

alter table student add Password varchar(72);
