import { use } from 'chai';
import React from 'react';

export const UserPanel = ({user}) => <div>
    <div>
        <h3> <i className="glyphicon glyphicon-user"></i> Welcome, {user.name} ({user.email})</h3>
    </div>
</div>;
