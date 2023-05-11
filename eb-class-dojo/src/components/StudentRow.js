import {Avatar} from 'baseui/avatar'
import { Grid, Cell } from 'baseui/layout-grid';

export default function StudentRow({student}) {
    return (
        <Grid>
            <Cell span={2}>
                <Avatar
                    src={student.avatar}
                    size="scale800"
                    name={student.name}
                />
            </Cell>
            <Cell span={4}>
                {student.name}
            </Cell>
            <Cell span={2}>
                {student.pointTotal}
            </Cell>
        </Grid>
    );
}