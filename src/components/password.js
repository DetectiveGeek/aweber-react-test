import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

const PasswordEntry = () => {
    const [formState, setFormState] = useState({
        password: '',
        confirmPassword: '',
        error: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
            error: '' 
        }));
    };

    const validatePassword = () => {
        switch (true) {
            case formState.password !== formState.confirmPassword:
                return 'Passwords do not match.';
            case formState.password.length < 6:
                return 'Password must be at least 6 characters long.';
            case !/[A-Z]/.test(formState.password):
                return 'Password must contain at least one uppercase character.';
            case !/[a-z]/.test(formState.password):
                return 'Password must contain at least one lowercase character.';
            case !/\d/.test(formState.password):
                return 'Password must contain at least one number.';
            case !/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/.test(formState.password):
                return 'Password must contain at least one special character.';
            default:
                return '';
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationError = validatePassword();
        if (validationError) {
            setFormState(prevState => ({ ...prevState, error: validationError }));
        } else {
            alert('Password successfully set!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
                <TextField
                    label="Password"
                    type="password"
                    name="password"
                    value={formState.password}
                    onChange={handleInputChange}
                    variant="outlined"
                />
                <TextField
                    label="Confirm Password"
                    type="password"
                    name="confirmPassword"
                    value={formState.confirmPassword}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                />
                {formState.error && (
                    <FormHelperText error>{formState.error}</FormHelperText>
                )}
                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </FormControl>
        </form>
    );
};

export default PasswordEntry;