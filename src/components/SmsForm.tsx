import { useState } from 'react';
import { 
    Box, 
    TextField, 
    Button, 
    Paper, 
    Typography, 
    List, 
    ListItem, 
    ListItemText,
    Alert,
    CircularProgress,
    FormHelperText
} from '@mui/material';
import { splitMessage } from '../services/api';
import type { SmsRequest } from '../types/sms';

const MAX_SMS_LENGTH = 160;

export const SmsForm = () => {
    const [message, setMessage] = useState('');
    const [splitMessages, setSplitMessages] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const request: SmsRequest = { message };
            const result = await splitMessage(request);
            setSplitMessages(result);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    const estimatedParts = Math.ceil(message.length / (MAX_SMS_LENGTH - 20)); // 20 chars for suffix
    const characterCount = message.length;

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 2 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" component="h1" gutterBottom>
                    SMS Splitter
                </Typography>
                
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        margin="normal"
                        variant="outlined"
                        required
                        disabled={loading}
                        helperText={`${characterCount} characters (estimated ${estimatedParts} part${estimatedParts !== 1 ? 's' : ''})`}
                    />
                    
                    <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                        fullWidth
                        disabled={!message.trim() || loading}
                        sx={{ mt: 2 }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Split Message'}
                    </Button>
                </form>

                {error && (
                    <Alert severity="error" sx={{ mt: 2 }}>
                        {error}
                    </Alert>
                )}

                {splitMessages.length > 0 && (
                    <Box sx={{ mt: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Split Messages ({splitMessages.length} part{splitMessages.length !== 1 ? 's' : ''}):
                        </Typography>
                        <Box sx={{ maxHeight: 300, overflowY: 'auto' }}>
                            <List>
                                {splitMessages.map((msg, index) => (
                                    <ListItem 
                                        key={index}
                                        component={Paper}
                                        variant="outlined"
                                        sx={{ mb: 1 }}
                                    >
                                        <ListItemText 
                                            primary={msg}
                                            secondary={`Part ${index + 1} of ${splitMessages.length} (${msg.length} characters)`}
                                            sx={{ wordBreak: 'break-all' }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                        <Button
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            sx={{ mt: 2 }}
                            onClick={() => {
                                setSplitMessages([]);
                                setMessage(''); // Uncomment to also clear the input
                            }}
                        >
                            Clear Messages
                        </Button>
                    </Box>
                )}
            </Paper>
        </Box>
    );
}; 