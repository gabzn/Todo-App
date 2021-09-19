import { useState } from 'react';

const StudentList = () => 
{
    const [students, setStudents] = useState(
        [
          {name: 'Webbie', major: 'Computer Science', year: 'Freshman', id: 1},
          {name: 'Nelson', major: 'Computer Science', year: 'Sophoremore', id: 2},
          {name: 'Amy', major: 'Computer Science', year: 'Junior', id: 3},
          {name: 'Bob', major: 'Computer Science', year: 'Senior', id: 4}
        ])

    const handleDelete = id => 
    {
      const newStudentList = students.filter(student => student.id !== id);
      setStudents(newStudentList);
    }

    return ( 
        <div className='studentList'>
            {students.map(student =>
            (
                <div className='Student' key={student.id}>
                    <p>Hi my name is {student.name}, and I major in {student.major}</p>
                    <button onClick={ () => handleDelete(student.id)}> Delete </button>
                </div>
            ))}
        </div>
     );
}
 
export default StudentList;