-- 1
select
  student.name,
  student.email
from
  student
  left join teacher on student.main_teacher_id = teacher.id
where
  teacher.name = '马龙'
  and student.city = '杭州';

-- 2
select
  student.name,
  student.id,
  course.name,
  selecourse.score,
from
  student
  left join selecourse on student.id = selecourse.student.id
  left join course on selecourse.course_id = course.id
where
  course.name in ('语文', '数学', '英语')
group by
  course.name;

-- 3
-- 4
select
  student.name,
  course.name,
  level
from
  student
  left join selecourse on student.id = selecourse.student.id
  left join course on selecourse.course_id = course.id 4.
select
  student.name,
from
  student
  left join selecourse on student.id = selecourse.student.id
  left join course on selecourse.course_id = course.id
where
  avg(selecourse.score) > 90;

-- 5
select
  student.name,
  course.name,
  level
from
  student
  left join selecourse on student.id = selecourse.student.id
  left join course on selecourse.course_id = course.id 4.
select
  student.name,
from
  student
  left join selecourse on student.id = selecourse.student.id
  left join course on selecourse.course_id = course.id
where
  avg(selecourse.score) > 90;