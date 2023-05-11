import * as React from "react";
import {
  Card,
} from "baseui/card";
import StudentRow from "./StudentRow";

export default function ClassCard({students}) {
    return (
        <Card>
            {students.map(student => <StudentRow key={student.name} student={student}/>)}
        </Card>
    );
}