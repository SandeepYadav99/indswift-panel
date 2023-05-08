import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    '& .MuiSelect-root': {
      border: 'none',
      outline: 'none',
    },
  },
}));

function FormDropdown({ value, onChange }) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="dropdown-label">Select</InputLabel>
      <Select
        labelId="dropdown-label"
        id="dropdown"
        value={value}
        onChange={onChange}
      >
        <MenuItem value={'Yes'}>Yes</MenuItem>
        <MenuItem value={'No'}>No</MenuItem>
      </Select>
    </FormControl>
  );
}

export default FormDropdown;