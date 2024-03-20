CREATE DATABASE IF NOT EXISTS academic_insight;

CREATE TABLE teacher (
    teacher_id INT,
    teacher_name VARCHAR(50),
    password VARCHAR(75),
    email VARCHAR(30) unique,
    phone_no CHAR(10) unique,
    isAdmin BOOLEAN,
    PRIMARY KEY(teacher_id)
);

CREATE TABLE sem_section (
    semsec CHAR(2),
    sem INT,
    sec CHAR(2),
    PRIMARY KEY(semsec)
);

CREATE TABLE student (
	usn CHAR(10) PRIMARY KEY,
	student_Name VARCHAR(50),
	semsec CHAR(2),
	email VARCHAR(50) unique,
	phone_number CHAR(10) unique,
	parent_number CHAR(10)
);

CREATE TABLE course (
	course_id VARCHAR(10) PRIMARY KEY,
	course_name VARCHAR(50),
	scheme INT,
	sem INT
);

CREATE TABLE teacher_course (
	teacher_id INT,
	course_id VARCHAR(10),
	semsec CHAR(2),
	PRIMARY KEY(teacher_id,course_id,semsec),
	FOREIGN KEY(teacher_id) REFERENCES teacher(teacher_id) ON DELETE CASCADE,
	foreign key(course_id) references course(course_id) ON DELETE CASCADE,
	foreign key(semsec) references sem_section(semsec) on delete cascade
);

create table record (
	usn char(10),
	course_id varchar(10),
	semsec char(2),
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
	primary key(usn,course_id,semsec),
	foreign key(usn) references student(usn) on delete cascade,
	foreign key(course_id) references course(course_id) on delete cascade,
	foreign key(semsec) references sem_section(semsec) on delete cascade
);

CREATE VIEW Teacher_display AS (
	select t.teacher_id as Teacher_Id,t.teacher_name as Name,c.course_name as Subject,tc.semsec as Class
	from teacher t,course c,teacher_course tc
	where t.teacher_id=tc.teacher_id and c.course_id=tc.course_id
	order by teacher_name
);

CREATE VIEW Admin_display AS (
	select usn as USN,course_id as Sub_Code,course_name as Subject,semsec as Class,Ia1_score as IA1,Ia2_score as IA2,Ia3_score as IA3,Final_Marks,Attendance_percentage as Attendance
	from record r natural join course c
	order by usn
);

DELIMITER //
CREATE PROCEDURE DisplayStudentRecordsForTeacher(IN id INT, IN semsec CHAR(2), IN cid VARCHAR(10))
BEGIN
    SELECT s.usn, s.student_Name, c.course_name, r.*
    FROM record r
    JOIN student s ON r.usn = s.usn
    JOIN course c ON r.course_id = c.course_id
    JOIN teacher_course tc ON r.semsec = tc.semsec AND tc.course_id = c.course_id
    WHERE tc.teacher_id =id 
    AND r.semsec = semsec
    AND r.course_id = cid
    ORDER BY s.usn;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE GetClass(IN id INT)
BEGIN
    SELECT tc.course_id, c.course_name, tc.semsec
    FROM teacher_course tc
    JOIN course c ON tc.course_id = c.course_id
    WHERE tc.teacher_id = id;
	order by tc.semsec;
END//
DELIMITER ;

CREATE TRIGGER update_final_values
BEFORE INSERT ON record
FOR EACH ROW
    SET NEW.Final_IA = (NEW.Ia1_score + NEW.Ia2_score + NEW.Ia3_score) / 5,
	NEW.Final_Marks = NEW.Final_IA + NEW.Assignment_Marks + NEW.Lab_Or_Quiz,
    NEW.Attendance_percentage = (NEW.Classes_Attended / NEW.Classes_Held)*100;