import * as React from 'react';
import {User} from '../../common/users';

export interface Props {
    users: User[];
    onChange?: (ev: number) => any;
    selectedId?: number;
    id?: string;
}

export default function UserSelect({users, onChange, selectedId, id}: Props) {
    const f = onChange ? (v: any) => onChange(parseInt(v.target.value)) : undefined;
    return (
        <select className="form-control" onChange={f} value={selectedId} id={id}>
            {users.map(u => <option key={u.id} value={u.id} >{u.name}</option>)}
        </select>
    )
}
