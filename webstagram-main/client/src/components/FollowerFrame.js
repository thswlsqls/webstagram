import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

 
export default function FollowerFrame({follower}) {

    return (
            <TableRow>
                <TableCell> 
                  <IconButton>
                    <Avatar src=  {follower.profileImg} />
                  </IconButton>
                </TableCell>
                <TableCell> 
                  <Typography >
                    {follower.name}
                  </Typography> 
                </TableCell>
            </TableRow>      
    );
}