// components/Auth/StyledInput.js
import { InputBase, styled } from '@mui/material';

const StyledInput = styled(InputBase)(({ theme }) => ({
  width: '100%',
  padding: '10px 14px',
  border: '1px solid #ccc',
  borderRadius: 8,
  marginBottom: '16px',
  fontSize: '1rem',
  backgroundColor: '#fff',
}));

export default StyledInput;
